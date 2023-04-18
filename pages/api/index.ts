import type { NextApiRequest, NextApiResponse } from 'next/types'


export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(_req.url);

  if (_req.method === "POST") {
    res.status(200).json("data: data");
  }
  
}