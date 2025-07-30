import { Fact, Topic } from '../types/game';

const historyFacts: Fact[] = [
  { id: '1', statement: 'The Great Wall of China is visible from space with the naked eye.', isTrue: false, topic: 'history' },
  { id: '2', statement: 'Napoleon Bonaparte was actually average height for his time.', isTrue: true, topic: 'history' },
  { id: '3', statement: 'The Vikings wore horned helmets in battle.', isTrue: false, topic: 'history' },
  { id: '4', statement: 'Cleopatra lived closer in time to the Moon landing than to the construction of the Great Pyramid.', isTrue: true, topic: 'history' },
  { id: '5', statement: 'The Roman Empire fell in 476 AD.', isTrue: false, topic: 'history' },
  { id: '6', statement: 'Ancient Egyptians used cats to hunt snakes and rodents.', isTrue: true, topic: 'history' },
  { id: '7', statement: 'The Trojan War actually happened exactly as described in Homer\'s Iliad.', isTrue: false, topic: 'history' },
  { id: '8', statement: 'Leonardo da Vinci painted the Mona Lisa on canvas.', isTrue: false, topic: 'history' },
];

const scienceFacts: Fact[] = [
  { id: '9', statement: 'Lightning never strikes the same place twice.', isTrue: false, topic: 'science' },
  { id: '10', statement: 'Humans only use 10% of their brains.', isTrue: false, topic: 'science' },
  { id: '11', statement: 'Goldfish have a memory span of only 3 seconds.', isTrue: false, topic: 'science' },
  { id: '12', statement: 'Bananas are berries, but strawberries are not.', isTrue: true, topic: 'science' },
  { id: '13', statement: 'A day on Venus is longer than its year.', isTrue: true, topic: 'science' },
  { id: '14', statement: 'Antibiotics are effective against viral infections.', isTrue: false, topic: 'science' },
  { id: '15', statement: 'Octopuses have three hearts.', isTrue: true, topic: 'science' },
  { id: '16', statement: 'The sun is a yellow star.', isTrue: false, topic: 'science' },
];

const technologyFacts: Fact[] = [
  { id: '17', statement: 'The first computer bug was an actual insect.', isTrue: true, topic: 'technology' },
  { id: '18', statement: 'Email was invented before the World Wide Web.', isTrue: true, topic: 'technology' },
  { id: '19', statement: 'Nokia was originally a paper mill company.', isTrue: true, topic: 'technology' },
  { id: '20', statement: 'The first iPhone was released in 2008.', isTrue: false, topic: 'technology' },
  { id: '21', statement: 'Wi-Fi stands for "Wireless Fidelity".', isTrue: false, topic: 'technology' },
  { id: '22', statement: 'The computer mouse was invented in the 1960s.', isTrue: true, topic: 'technology' },
  { id: '23', statement: 'YouTube was originally designed as a dating site.', isTrue: false, topic: 'technology' },
  { id: '24', statement: 'The @ symbol was used before email was invented.', isTrue: true, topic: 'technology' },
];

const popCultureFacts: Fact[] = [
  { id: '25', statement: 'The Beatles never had a number one hit in the US.', isTrue: false, topic: 'pop-culture' },
  { id: '26', statement: 'Elvis Presley never performed outside of North America.', isTrue: true, topic: 'pop-culture' },
  { id: '27', statement: 'The TV show "Friends" was originally going to be called "Six of One".', isTrue: true, topic: 'pop-culture' },
  { id: '28', statement: 'Marilyn Monroe was a natural blonde.', isTrue: false, topic: 'pop-culture' },
  { id: '29', statement: 'The movie "Titanic" was the highest-grossing film for 12 years.', isTrue: true, topic: 'pop-culture' },
  { id: '30', statement: 'Michael Jackson invented the moonwalk.', isTrue: false, topic: 'pop-culture' },
  { id: '31', statement: 'The original Star Wars movie was expected to flop.', isTrue: true, topic: 'pop-culture' },
  { id: '32', statement: 'Madonna has sold more records than any female artist in history.', isTrue: true, topic: 'pop-culture' },
];

const psychologyFacts: Fact[] = [
  { id: '33', statement: 'You can only remember about 7 items in your short-term memory.', isTrue: true, topic: 'psychology' },
  { id: '34', statement: 'Subliminal messages can control your behavior.', isTrue: false, topic: 'psychology' },
  { id: '35', statement: 'People with photographic memory exist.', isTrue: false, topic: 'psychology' },
  { id: '36', statement: 'Your brain uses about 20% of your body\'s energy.', isTrue: true, topic: 'psychology' },
  { id: '37', statement: 'Men and women have completely different brain structures.', isTrue: false, topic: 'psychology' },
  { id: '38', statement: 'Laughter triggers the release of endorphins.', isTrue: true, topic: 'psychology' },
  { id: '39', statement: 'Left-brained people are more logical and right-brained people are more creative.', isTrue: false, topic: 'psychology' },
  { id: '40', statement: 'Music can improve your mood and reduce stress.', isTrue: true, topic: 'psychology' },
];

const geographyFacts: Fact[] = [
  { id: '41', statement: 'Australia is wider than the moon.', isTrue: true, topic: 'geography' },
  { id: '42', statement: 'Africa is bigger than China, India, and the USA combined.', isTrue: true, topic: 'geography' },
  { id: '43', statement: 'Russia spans 11 time zones.', isTrue: true, topic: 'geography' },
  { id: '44', statement: 'The Amazon River is longer than the Nile River.', isTrue: false, topic: 'geography' },
  { id: '45', statement: 'Canada has more lakes than the rest of the world combined.', isTrue: true, topic: 'geography' },
  { id: '46', statement: 'Mount Everest is the tallest mountain from base to peak.', isTrue: false, topic: 'geography' },
  { id: '47', statement: 'Antarctica is a desert.', isTrue: true, topic: 'geography' },
  { id: '48', statement: 'The Dead Sea is the lowest point on Earth\'s surface.', isTrue: true, topic: 'geography' },
];

const allFacts = {
  history: historyFacts,
  science: scienceFacts,
  technology: technologyFacts,
  'pop-culture': popCultureFacts,
  psychology: psychologyFacts,
  geography: geographyFacts,
};

export function getFactsForTopic(topic: Topic): Fact[] {
  return allFacts[topic] || [];
}

export function getAllFacts(): Fact[] {
  return Object.values(allFacts).flat();
}