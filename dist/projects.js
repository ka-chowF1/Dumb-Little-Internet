// Add another object here to add a website. Tagline and isNew are optional.
const projects = [
  {
    name: '67 Calculator',
    emoji: '🧮',
    tagline: 'All roads lead to 67. Unless the math actually does.',
    url: 'https://ka-chowf1.github.io/67-calculator/',
    isNew: true,
  },
  {
    name: 'Excuse Generator',
    emoji: '🕵️',
    tagline: 'A perfectly good excuse. Believability sold separately.',
    url: 'https://ka-chowf1.github.io/Excuse-Generator/',
    isNew: true,
  },
  {
    name: 'Rock Paper Scissors',
    emoji: '🔫',
    tagline: 'Three choices. One finger gun. Skill issue.',
    url: 'https://ka-chowf1.github.io/Rock-Paper-Scissors/',
    isNew: true,
  },
  {
    name: 'Wordle for Dummies',
    emoji: '🟩',
    tagline: 'Five letters. Six chances. Surely you’ve got this.',
    url: 'https://ka-chowf1.github.io/Wordle-For-Dummies/',
    isNew: true,
  },
  {
    name: 'Fortune Cookie Generator',
    emoji: '🥠',
    tagline: 'A little wisdom. A little disrespect.',
    url: 'https://ka-chowf1.github.io/Fortune-Cookie/',
    isNew: true,
  },
  {
    name: 'IQ Test',
    emoji: '🧠',
    tagline: 'Ten questions. One very confident assessment.',
    url: 'https://ka-chowf1.github.io/IQ-Test/',
    isNew: true,
  },
  {
    name: 'Horoscope Generator',
    emoji: '🔮',
    tagline: 'Written in the stars. Probably a typo.',
    url: 'https://ka-chowf1.github.io/Horoscope-Generator/',
    isNew: true,
  },
  {
    name: 'The Sorting Hat',
    emoji: '🎩',
    tagline: 'Five questions. Four houses. One very opinionated hat.',
    url: 'https://ka-chowf1.github.io/Sorting-Hat/',
    isNew: true,
  },
];


// Generated games: batch a34155ed-debd-431e-8370-c3ec908f1317
[
  {
    "name": "Pigeon Parcel Parade",
    "emoji": "🎮",
    "tagline": "Help a very serious pigeon deliver four extremely silly parcels.",
    "url": "https://ka-chowf1.github.io/Dumb-Little-Internet-Games/games/pigeon-parcel-parade-a34155ed-debd-431e-8370-c3ec908f1317/",
    "isNew": true
  },
  {
    "name": "Goblin Picnic Committee",
    "emoji": "🎮",
    "tagline": "Pick snacks for a goblin with very specific lunch opinions.",
    "url": "https://ka-chowf1.github.io/Dumb-Little-Internet-Games/games/goblin-picnic-committee-a34155ed-debd-431e-8370-c3ec908f1317/",
    "isNew": true
  }
].forEach(game => {
  if (!projects.some(existing => existing.url === game.url)) {
    projects.push(game);
  }
});
