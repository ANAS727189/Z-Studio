import dotenv from 'dotenv';
dotenv.config();
export const JUDGE0_BASE_URL = 'https://judge0-ce.p.rapidapi.com';

export const judge0Headers = {
  'x-rapidapi-key': process.env.RAPID_API_KEY,
  'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
  'Content-Type': 'application/json'
};
console.log('Judge0 Headers:', judge0Headers);
