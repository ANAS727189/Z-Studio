import dotenv from 'dotenv';
dotenv.config();
export const JUDGE0_BASE_URL = process.env.JUDGE0_BASE_URI;

export const judge0Headers = {
  'x-rapidapi-key': process.env.RAPID_API_KEY,
  'x-rapidapi-host': process.env.RAPID_API_URI,
  'Content-Type': 'application/json'
};
// console.log('Judge0 Headers:', judge0Headers);
