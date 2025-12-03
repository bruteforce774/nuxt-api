import db from '../database/db';

interface Joke {
  id: number;
  text: string;
  created_at: string;
}

export default defineEventHandler(() => {
  // Get all jokes from database
  const jokes = db.prepare('SELECT * FROM jokes ORDER BY created_at DESC').all() as Joke[];

  return {
    jokes: jokes.map(joke => joke.text)
  };
});
