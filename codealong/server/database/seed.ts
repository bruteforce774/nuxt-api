import db from './db';

// Seed initial jokes
export function seedJokes() {
  // Check if we already have jokes
  const count = db.prepare('SELECT COUNT(*) as count FROM jokes').get() as { count: number };

  if (count.count > 0) {
    console.log('Database already seeded');
    return;
  }

  const jokes = [
    "Hvorfor kan ikke syklister stå opp? Fordi de er to-hjulte!",
    "Hva sier en datamus når den er lei seg? Jeg føler meg så klikket...",
    "Hvorfor gikk JavaScript til psykologen? Fordi den hadde for mange callbacks!",
    "Hva sa HTML til CSS? Du styler meg!",
    "Hvorfor er programmører alltid kalde? De jobber med Windows!"
  ];

  const insert = db.prepare('INSERT INTO jokes (text) VALUES (?)');

  for (const joke of jokes) {
    insert.run(joke);
  }

  console.log(`Seeded ${jokes.length} jokes into database`);
}

// Run seed immediately
seedJokes();
