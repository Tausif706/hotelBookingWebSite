// import searchListings from '@/app/actions/getGPTSearchResult';
// import { NextRequest, NextResponse } from "next/server";
//  // Replace with the correct path to getSearchResult.ts

import searchListings from "@/app/actions/getGPTSearchResult";
import { NextResponse } from "next/server";

export async function POST(
  request: Request
  ) {
    const body = await request.json();
    const { searchTerms } = body;
  // console.log("the terms searched is ",inputValue)
  try {
    const listings = await searchListings(searchTerms);
    return NextResponse.json(listings);
  } catch (error) {
    console.error('Error searching listings:', error);
          return NextResponse.error()
        }
        return NextResponse.json(body)
      }

      
// export async function GET(req: NextRequest) {
//       try {
//         // Handle GET request logic here
//         return NextResponse.json({ message: 'GET request received' });
//       } catch (error) {
//         console.error('Error handling GET request:', error);
//         return NextResponse.status(500).json({ error: 'Failed to handle request' });
//     }
//   }

// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//     const { searchTerms } = req.body;
//     try {
//       const listings = await searchListings(searchTerms);
//       res.status(200).json(listings);
//     } catch (error) {
//       console.error('Error searching listings:', error);
//       res.status(500).json({ error: 'Failed to search listings' });
//     }
// }