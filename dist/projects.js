// Add another object here to add a website. Tagline and isNew are optional.
const projects = [
  {
    name: '67 Calculator',
    emoji: '🧮',
    tagline: 'All roads lead to 67. Unless the math actually does.',
    url: 'https://ka-chowf1.github.io/67-calculator/',
    isNew: false,
  },
  {
    name: 'Excuse Generator',
    emoji: '🕵️',
    tagline: 'A perfectly good excuse. Believability sold separately.',
    url: 'https://ka-chowf1.github.io/Excuse-Generator/',
    isNew: false,
  },
  {
    name: 'Rock Paper Scissors',
    emoji: '🔫',
    tagline: 'Three choices. One finger gun. Skill issue.',
    url: 'https://ka-chowf1.github.io/Rock-Paper-Scissors/',
    isNew: false,
  },
  {
    name: 'Wordle for Dummies',
    emoji: '🟩',
    tagline: 'Five letters. Six chances. Surely you’ve got this.',
    url: 'https://ka-chowf1.github.io/Wordle-For-Dummies/',
    isNew: false,
  },
  {
    name: 'Fortune Cookie Generator',
    emoji: '🥠',
    tagline: 'A little wisdom. A little disrespect.',
    url: 'https://ka-chowf1.github.io/Fortune-Cookie/',
    isNew: false,
  },
  {
    name: 'IQ Test',
    emoji: '🧠',
    tagline: 'Ten questions. One very confident assessment.',
    url: 'https://ka-chowf1.github.io/IQ-Test/',
    isNew: false,
  },
  {
    name: 'Horoscope Generator',
    emoji: '🔮',
    tagline: 'Written in the stars. Probably a typo.',
    url: 'https://ka-chowf1.github.io/Horoscope-Generator/',
    isNew: false,
  },
  {
    name: 'The Sorting Hat',
    emoji: '🎩',
    tagline: 'Five questions. Four houses. One very opinionated hat.',
    url: 'https://ka-chowf1.github.io/Sorting-Hat/',
    isNew: false,
  },
];


// Generated games: batch c58dc78e-d9b4-4f77-907f-82434021514f
[
  {
    "name": "To-Do Tabloid",
    "emoji": "📰",
    "tagline": "Your ordinary tasks. Tomorrow’s front-page scandal.",
    "url": "https://ka-chowf1.github.io/Dumb-Little-Internet-Games/games/to-do-tabloid-c58dc78e-d9b4-4f77-907f-82434021514f/",
    "isNew": true
  }
].forEach(game => {
  if (!projects.some(existing => existing.url === game.url)) {
    projects.push(game);
  }
});


// Generated games: batch 48f91bb5-f4d7-4bb8-860b-60db5f82617d
[
  {
    "name": "Dog Time Converter",
    "emoji": "🐕",
    "tagline": "Your five-minute errand was a whole saga to the dog.",
    "url": "https://ka-chowf1.github.io/Dumb-Little-Internet-Games/games/dog-time-converter-48f91bb5-f4d7-4bb8-860b-60db5f82617d/",
    "isNew": true
  },
  {
    "name": "Laundry Label Decoder",
    "emoji": "🧺",
    "tagline": "Those tiny symbols have a lot to say about your sweater.",
    "url": "https://ka-chowf1.github.io/Dumb-Little-Internet-Games/games/laundry-label-decoder-48f91bb5-f4d7-4bb8-860b-60db5f82617d/",
    "isNew": true
  }
].forEach(game => {
  if (!projects.some(existing => existing.url === game.url)) {
    projects.push(game);
  }
});
