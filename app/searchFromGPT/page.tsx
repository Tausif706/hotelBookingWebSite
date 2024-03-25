'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { SafeListing } from '../types';
import ListingCard from '../components/listings/ListingCard';
import FloatingIcon from '../components/FloatingSearch';
import Container from "@/app/components/Container";
import ClientOnly from "@/app/components/ClientOnly";
import getCurrentUser from '../actions/getCurrentUser';

interface SearchResult {
  id:string             
  title: string
  description: string
  imageSrc: string
  category:  string
  roomCount: number
  bathroomCount: number
  guestCount: number
  locationValue: string
  price: number
  userId: string
  createdAt: string
}

const SearchResultsPage = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  // const currentUser = await getCurrentUser();
  useEffect(() => {
    const searchTermsString = searchParams?.get('searchTerms');
    if (searchTermsString) {
      const searchTerms = searchTermsString// Parse the string to array
      if (searchTerms.length > 0) {
        const fetchData = async () => {
          setIsLoading(true);
          try {
            // Send data to backend API
            const response = await axios.post('https://hotelbookingapi-3.onrender.com/list', { user_requirements: searchTermsString });
            const [searchTerms, dictTerms] = separateTerms(response.data);
            console.log(searchTerms);
            console.log(dictTerms);
            // Navigate to search results page with search terms as query parameter
            axios.post('/api/searchGPT', { searchTerms })
              .then((response) => {
                console.log('Search results:', response.data);
                setSearchResults(response.data); // Update search results state
              })
              .catch((error) => {
                console.error('Error searching listings:', error);
              });
          } catch (error) {
            console.error('Error sending data:', error);
          } finally {
            setIsLoading(false);
          }
        };
        fetchData();
      }
    }
  }, [searchParams]);

  // Function to separate terms
  interface Dictionary {
    [key: string]: any;
  }
  
  function separateTerms(arr: (string | Dictionary | any[])[]): [string[], Dictionary[]] {
    const listTerms: string[] = [];
    const dictTerms: Dictionary[] = [];
  
    arr.forEach(item => {
      if (Array.isArray(item)) {
        // Recursively process subarrays
        const [list, dict] = separateTerms(item);
        listTerms.push(...list);
        dictTerms.push(...dict);
      } else if (typeof item === 'object' && item !== null) {
        // Separate dictionary terms
        dictTerms.push(item as Dictionary);
      } else {
        // Add non-dictionary terms to the list
        listTerms.push(item as string);
      }
    });
  
    return [listTerms, dictTerms];
  }

  return (
<ClientOnly>
      <Container>
        <div 
          className="
            pt-24
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
        >
          {searchResults.map((result: SafeListing) => ( // Specify result type as SafeListing
            <ListingCard  key={result.id} data={result} /> // Pass result as data to ListingCard
          ))}
      {(searchResults.length === 0 && !isLoading) && <p>No search results found.</p>}
      </div>
      </Container>
      <FloatingIcon />
    </ClientOnly>
  );
};

export default SearchResultsPage;
