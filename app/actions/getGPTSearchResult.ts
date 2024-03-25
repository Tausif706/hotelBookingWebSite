// import { PrismaClient, Listing } from '@prisma/client';
import prisma from "@/app/libs/prismadb";

export interface IsearchingParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  description?: string;
  category?: string;
}

interface ListingWithMatchCount{
  id: string,
  matchCount: number;
}

export default async function searchListings(searchTerms: string[]) {
  const uniqueListings = new Set<string>();
  
  await Promise.all(
    searchTerms.map(async term => {
      const termLower = term.toLowerCase().trim();
      const listingsForTerm = await prisma.listing.findMany({
        where: {
          OR: [
            { description: { contains: termLower, mode: 'insensitive' } },
            { locationValue: { contains: termLower, mode: 'insensitive' } },
            { title: { contains: termLower, mode: 'insensitive' } },
            { category: { contains: termLower, mode: 'insensitive' } }
          ]
        }
      });

      // Calculate the number of matching criteria for each listing
      const listingsWithMatchCount: ListingWithMatchCount[] = listingsForTerm.map(listing => {
        const matchCount = (
          +(listing.description.toLowerCase().includes(termLower)) +
          +(listing.locationValue.toLowerCase().includes(termLower)) +
          +(listing.title.toLowerCase().includes(termLower)) +
          +(listing.category.toLowerCase().includes(termLower))
        );
        return { ...listing, matchCount };
      });

      // Sort listingsForTerm based on match count (descending)
      listingsWithMatchCount.sort((a, b) => b.matchCount - a.matchCount);

      // Add unique listings to the Set
      listingsWithMatchCount.forEach(listing => {
        uniqueListings.add(listing.id);
      });
    })
  );

  // Convert Set to array of unique listings
  const uniqueListingsArray = Array.from(uniqueListings);

  // Retrieve full details of unique listings from the database
  const fullListingsDetails = await prisma.listing.findMany({
    where: {
      id: { in: uniqueListingsArray }
    }
  });

  return fullListingsDetails;
}

