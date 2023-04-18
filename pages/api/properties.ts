import type { NextApiRequest, NextApiResponse } from 'next/types'
import fsPromises from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'property.json');

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<any[]>
) {
  // Get data from your database
  if (_req.method === 'GET') {
    // Read the existing data from the JSON file
    const jsonData = await fsPromises.readFile(dataFilePath);
    const objectData = JSON.parse(jsonData.toString('utf-8'));
    res.status(200).json(objectData);
  }
}