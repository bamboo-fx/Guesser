import { Fact, Topic } from '../types/game';

const historyFacts: Fact[] = [
  { id: '1', statement: 'The Great Wall of China is visible from space with the naked eye.', isTrue: false, topic: 'history' },
  { id: '2', statement: 'Napoleon Bonaparte was actually average height for his time.', isTrue: true, topic: 'history' },
  { id: '3', statement: 'The Vikings wore horned helmets in battle.', isTrue: false, topic: 'history' },
  { id: '4', statement: 'Cleopatra lived closer in time to the Moon landing than to the construction of the Great Pyramid.', isTrue: true, topic: 'history' },
  { id: '5', statement: 'The Roman Empire fell in 476 AD.', isTrue: false, topic: 'history' }, // Western Empire fell, Eastern lasted longer
  { id: '6', statement: 'Ancient Egyptians used cats to hunt snakes and rodents.', isTrue: true, topic: 'history' },
  { id: '7', statement: 'The Trojan War actually happened exactly as described in Homer\'s Iliad.', isTrue: false, topic: 'history' },
  { id: '8', statement: 'Leonardo da Vinci painted the Mona Lisa on canvas.', isTrue: false, topic: 'history' }, // Painted on wood
  { id: '49', statement: 'World War I began in 1914.', isTrue: true, topic: 'history' },
  { id: '50', statement: 'The Berlin Wall fell in 1991.', isTrue: false, topic: 'history' }, // It fell in 1989
  { id: '51', statement: 'The Black Death killed about one-third of Europe\'s population.', isTrue: true, topic: 'history' },
  { id: '52', statement: 'The American Civil War ended in 1875.', isTrue: false, topic: 'history' }, // Ended in 1865
  { id: '53', statement: 'Julius Caesar was the first Roman Emperor.', isTrue: false, topic: 'history' }, // Augustus was first emperor
  { id: '54', statement: 'The Cold War had no direct battles between the US and USSR.', isTrue: true, topic: 'history' },
  { id: '55', statement: 'Christopher Columbus discovered America in 1492.', isTrue: false, topic: 'history' }, // Indigenous people were there
  { id: '56', statement: 'The Great Fire of London happened in 1666.', isTrue: true, topic: 'history' },
  { id: '57', statement: 'The Ming Dynasty built the majority of the Great Wall of China.', isTrue: true, topic: 'history' },
  { id: '58', statement: 'The French Revolution began in 1776.', isTrue: false, topic: 'history' }, // 1789
  { id: '59', statement: 'Stonehenge is older than the Pyramids of Giza.', isTrue: true, topic: 'history' },
  { id: '60', statement: 'The Ottoman Empire lasted until World War I.', isTrue: true, topic: 'history' },
  { id: '61', statement: 'Sparta and Athens were allies in the Peloponnesian War.', isTrue: false, topic: 'history' },
  { id: '62', statement: 'Machu Picchu was built by the Maya.', isTrue: false, topic: 'history' }, // Built by Incas
  { id: '63', statement: 'The Wright brothers’ first flight was in 1903.', isTrue: true, topic: 'history' },
  { id: '64', statement: 'Marie Antoinette said “Let them eat cake.”', isTrue: false, topic: 'history' },
  { id: '65', statement: 'The Rosetta Stone helped decode Egyptian hieroglyphs.', isTrue: true, topic: 'history' },
  { id: '66', statement: 'The Great Depression started in 1929.', isTrue: true, topic: 'history' },
  { id: '67', statement: 'The Boston Tea Party was in 1876.', isTrue: false, topic: 'history' }, // 1773
  { id: '68', statement: 'The Parthenon is in Rome.', isTrue: false, topic: 'history' }, // Athens
  { id: '69', statement: 'Alexander the Great conquered Egypt.', isTrue: true, topic: 'history' },
  { id: '70', statement: 'Joan of Arc was executed by being burned at the stake.', isTrue: true, topic: 'history' },
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
  { id: '71', statement: 'Water boils at 100°C at sea level.', isTrue: true, topic: 'science' },
  { id: '72', statement: 'DNA is shaped like a double helix.', isTrue: true, topic: 'science' },
  { id: '73', statement: 'Humans have more than five senses.', isTrue: true, topic: 'science' },
  { id: '74', statement: 'Sharks are mammals.', isTrue: false, topic: 'science' },
  { id: '75', statement: 'The Earth revolves around the Sun in 365 days.', isTrue: true, topic: 'science' },
  { id: '76', statement: 'Sound travels faster than light.', isTrue: false, topic: 'science' },
  { id: '77', statement: 'Pluto is still officially classified as a planet.', isTrue: false, topic: 'science' },
  { id: '78', statement: 'The human body has 206 bones.', isTrue: true, topic: 'science' },
  { id: '79', statement: 'The Milky Way is the largest galaxy in the universe.', isTrue: false, topic: 'science' },
  { id: '80', statement: 'Tornadoes form over warm ocean water.', isTrue: false, topic: 'science' },
  { id: '81', statement: 'Birds are descendants of dinosaurs.', isTrue: true, topic: 'science' },
  { id: '82', statement: 'Some metals are liquid at room temperature.', isTrue: true, topic: 'science' },
  { id: '83', statement: 'Mars has two moons.', isTrue: true, topic: 'science' },
  { id: '84', statement: 'The human heart has four chambers.', isTrue: true, topic: 'science' },
  { id: '85', statement: 'The ozone layer protects Earth from UV radiation.', isTrue: true, topic: 'science' },
  { id: '86', statement: 'Whales are the largest living animals.', isTrue: true, topic: 'science' },
  { id: '87', statement: 'The speed of light is slower in water than in air.', isTrue: true, topic: 'science' },
  { id: '88', statement: 'The largest organ in the human body is the liver.', isTrue: false, topic: 'science' },
  { id: '89', statement: 'Energy cannot be created or destroyed.', isTrue: true, topic: 'science' },
  { id: '90', statement: 'A leap year happens every 6 years.', isTrue: false, topic: 'science' },
  { id: '91', statement: 'Cells are the basic unit of life.', isTrue: true, topic: 'science' },
  { id: '92', statement: 'Electricity travels at the speed of light.', isTrue: false, topic: 'science' },
];

const technologyFacts: Fact[] = [
  { id: '93', statement: 'The first computer bug was an actual insect.', isTrue: true, topic: 'technology' },
  { id: '94', statement: 'Email was invented before the World Wide Web.', isTrue: true, topic: 'technology' },
  { id: '95', statement: 'Nokia was originally a paper mill company.', isTrue: true, topic: 'technology' },
  { id: '96', statement: 'The first iPhone was released in 2008.', isTrue: false, topic: 'technology' }, // 2007
  { id: '97', statement: 'Wi-Fi stands for "Wireless Fidelity".', isTrue: false, topic: 'technology' },
  { id: '98', statement: 'The computer mouse was invented in the 1960s.', isTrue: true, topic: 'technology' },
  { id: '99', statement: 'YouTube was originally designed as a dating site.', isTrue: true, topic: 'technology' },
  { id: '100', statement: 'The @ symbol was used before email was invented.', isTrue: true, topic: 'technology' },
  { id: '101', statement: 'Java was created before C programming language.', isTrue: false, topic: 'technology' },
  { id: '102', statement: 'Bluetooth was named after a Viking king.', isTrue: true, topic: 'technology' },
  { id: '103', statement: 'The first domain name ever registered was symbolics.com.', isTrue: true, topic: 'technology' },
  { id: '104', statement: 'Linux is based on UNIX.', isTrue: true, topic: 'technology' },
  { id: '105', statement: 'HTML is a programming language.', isTrue: false, topic: 'technology' },
  { id: '106', statement: 'Google was originally called Backrub.', isTrue: true, topic: 'technology' },
  { id: '107', statement: 'The first video uploaded on YouTube was called "Me at the zoo".', isTrue: true, topic: 'technology' },
  { id: '108', statement: 'The original PlayStation was a collaboration between Sony and Sega.', isTrue: false, topic: 'technology' },
  { id: '109', statement: 'The floppy disk was invented before the CD.', isTrue: true, topic: 'technology' },
  { id: '110', statement: 'HTTP stands for HyperText Transfer Protocol.', isTrue: true, topic: 'technology' },
  { id: '111', statement: 'Python is named after a snake.', isTrue: false, topic: 'technology' }, // Named after Monty Python
  { id: '112', statement: 'CAPTCHA stands for "Completely Automated Public Turing test to tell Computers and Humans Apart".', isTrue: true, topic: 'technology' },
  { id: '113', statement: 'IBM created the first smartphone.', isTrue: true, topic: 'technology' }, // Simon in 1994
  { id: '114', statement: 'The first digital computer was called ENIAC.', isTrue: true, topic: 'technology' },
  { id: '115', statement: 'QWERTY keyboard was designed to slow down typing.', isTrue: true, topic: 'technology' },
  { id: '116', statement: 'TikTok was launched before Instagram.', isTrue: false, topic: 'technology' },
  { id: '117', statement: 'Windows XP was released before Windows 98.', isTrue: false, topic: 'technology' },
  { id: '118', statement: 'The first SMS message said "Merry Christmas".', isTrue: true, topic: 'technology' },
  { id: '119', statement: 'USB stands for Universal Serial Bus.', isTrue: true, topic: 'technology' },
  { id: '120', statement: 'Cloud computing means storing data on a local hard drive.', isTrue: false, topic: 'technology' },
  { id: '121', statement: 'Captcha was invented by Google.', isTrue: false, topic: 'technology' },
  { id: '122', statement: 'Facebook was initially called "TheFacebook".', isTrue: true, topic: 'technology' },
];

const popCultureFacts: Fact[] = [
  { id: '123', statement: 'The Beatles never had a number one hit in the US.', isTrue: false, topic: 'pop-culture' },
  { id: '124', statement: 'Elvis Presley never performed outside of North America.', isTrue: true, topic: 'pop-culture' },
  { id: '125', statement: 'The TV show "Friends" was originally going to be called "Six of One".', isTrue: true, topic: 'pop-culture' },
  { id: '126', statement: 'Marilyn Monroe was a natural blonde.', isTrue: false, topic: 'pop-culture' },
  { id: '127', statement: 'The movie "Titanic" was the highest-grossing film for 12 years.', isTrue: true, topic: 'pop-culture' },
  { id: '128', statement: 'Michael Jackson invented the moonwalk.', isTrue: false, topic: 'pop-culture' },
  { id: '129', statement: 'The original Star Wars movie was expected to flop.', isTrue: true, topic: 'pop-culture' },
  { id: '130', statement: 'Madonna has sold more records than any female artist in history.', isTrue: true, topic: 'pop-culture' },
  { id: '131', statement: 'The Oscars were first held in the 1920s.', isTrue: true, topic: 'pop-culture' },
  { id: '132', statement: 'The first Disney movie was Cinderella.', isTrue: false, topic: 'pop-culture' }, // Snow White
  { id: '133', statement: 'The Rolling Stones were formed before The Beatles.', isTrue: false, topic: 'pop-culture' },
  { id: '134', statement: 'The Marvel Cinematic Universe began with Iron Man.', isTrue: true, topic: 'pop-culture' },
  { id: '135', statement: 'The Harry Potter books were originally self-published.', isTrue: false, topic: 'pop-culture' },
  { id: '136', statement: 'Netflix started as a DVD rental service.', isTrue: true, topic: 'pop-culture' },
  { id: '137', statement: 'Game of Thrones ended in 2019.', isTrue: true, topic: 'pop-culture' },
  { id: '138', statement: 'Michael Jordan starred in Space Jam.', isTrue: true, topic: 'pop-culture' },
  { id: '139', statement: 'The Simpsons is the longest-running scripted TV show.', isTrue: true, topic: 'pop-culture' },
  { id: '140', statement: 'Breaking Bad was set in California.', isTrue: false, topic: 'pop-culture' }, // New Mexico
  { id: '141', statement: 'Drake started his career as an actor.', isTrue: true, topic: 'pop-culture' },
  { id: '142', statement: 'Lady Gaga’s real name is Stefani Germanotta.', isTrue: true, topic: 'pop-culture' },
  { id: '143', statement: 'The Matrix was released in 1999.', isTrue: true, topic: 'pop-culture' },
  { id: '144', statement: 'Avatar is still the highest-grossing movie of all time.', isTrue: true, topic: 'pop-culture' },
  { id: '145', statement: 'Friends was filmed in New York City.', isTrue: false, topic: 'pop-culture' }, // Filmed in LA
  { id: '146', statement: 'The Grammy Awards started in 1959.', isTrue: true, topic: 'pop-culture' },
  { id: '147', statement: 'Justin Bieber was discovered on TikTok.', isTrue: false, topic: 'pop-culture' }, // YouTube
  { id: '148', statement: 'Shrek won the first Academy Award for Best Animated Feature.', isTrue: true, topic: 'pop-culture' },
  { id: '149', statement: 'Taylor Swift has acted in feature films.', isTrue: true, topic: 'pop-culture' },
  { id: '150', statement: 'The Beatles’ Abbey Road was their first album.', isTrue: false, topic: 'pop-culture' },
  { id: '151', statement: 'The first iPod was released in 2001.', isTrue: true, topic: 'pop-culture' },
  { id: '152', statement: 'There are more Marvel movies than Star Wars movies.', isTrue: true, topic: 'pop-culture' },
];

const psychologyFacts: Fact[] = [
  { id: '153', statement: 'You can only remember about 7 items in your short-term memory.', isTrue: true, topic: 'psychology' },
  { id: '154', statement: 'Subliminal messages can control your behavior.', isTrue: false, topic: 'psychology' },
  { id: '155', statement: 'People with photographic memory exist.', isTrue: false, topic: 'psychology' },
  { id: '156', statement: 'Your brain uses about 20% of your body\'s energy.', isTrue: true, topic: 'psychology' },
  { id: '157', statement: 'Men and women have completely different brain structures.', isTrue: false, topic: 'psychology' },
  { id: '158', statement: 'Laughter triggers the release of endorphins.', isTrue: true, topic: 'psychology' },
  { id: '159', statement: 'Left-brained people are more logical and right-brained people are more creative.', isTrue: false, topic: 'psychology' },
  { id: '160', statement: 'Music can improve your mood and reduce stress.', isTrue: true, topic: 'psychology' },
  { id: '161', statement: 'Multitasking is an effective way to increase productivity.', isTrue: false, topic: 'psychology' },
  { id: '162', statement: 'Dopamine is often called the "feel-good" neurotransmitter.', isTrue: true, topic: 'psychology' },
  { id: '163', statement: 'Depression is caused only by low serotonin levels.', isTrue: false, topic: 'psychology' },
  { id: '164', statement: 'Smiling can make you feel happier.', isTrue: true, topic: 'psychology' },
  { id: '165', statement: 'Introverts hate social interaction.', isTrue: false, topic: 'psychology' },
  { id: '166', statement: 'Sleep is important for memory consolidation.', isTrue: true, topic: 'psychology' },
  { id: '167', statement: 'Anxiety disorders are the most common mental illness in the U.S.', isTrue: true, topic: 'psychology' },
  { id: '168', statement: 'You only dream during REM sleep.', isTrue: false, topic: 'psychology' },
  { id: '169', statement: 'Phobias can be treated through exposure therapy.', isTrue: true, topic: 'psychology' },
  { id: '170', statement: 'People can accurately detect lies through body language alone.', isTrue: false, topic: 'psychology' },
  { id: '171', statement: 'Stress can weaken your immune system.', isTrue: true, topic: 'psychology' },
  { id: '172', statement: 'The placebo effect is a real psychological phenomenon.', isTrue: true, topic: 'psychology' },
  { id: '173', statement: 'Bipolar disorder means having multiple personalities.', isTrue: false, topic: 'psychology' },
  { id: '174', statement: 'The human brain stops developing in your teenage years.', isTrue: false, topic: 'psychology' }, // mid-20s
  { id: '175', statement: 'Emotional intelligence is as important as IQ.', isTrue: true, topic: 'psychology' },
  { id: '176', statement: 'Mirror neurons help us empathize with others.', isTrue: true, topic: 'psychology' },
  { id: '177', statement: 'Psychology is the study of the mind and behavior.', isTrue: true, topic: 'psychology' },
  { id: '178', statement: 'Schizophrenia means having multiple personalities.', isTrue: false, topic: 'psychology' },
  { id: '179', statement: 'Body language accounts for more than half of communication.', isTrue: true, topic: 'psychology' },
  { id: '180', statement: 'Mental health issues are rare worldwide.', isTrue: false, topic: 'psychology' },
];

const geographyFacts: Fact[] = [
  { id: '181', statement: 'Australia is wider than the moon.', isTrue: true, topic: 'geography' },
  { id: '182', statement: 'Africa is bigger than China, India, and the USA combined.', isTrue: true, topic: 'geography' },
  { id: '183', statement: 'Russia spans 11 time zones.', isTrue: true, topic: 'geography' },
  { id: '184', statement: 'The Amazon River is longer than the Nile River.', isTrue: false, topic: 'geography' },
  { id: '185', statement: 'Canada has more lakes than the rest of the world combined.', isTrue: true, topic: 'geography' },
  { id: '186', statement: 'Mount Everest is the tallest mountain from base to peak.', isTrue: false, topic: 'geography' },
  { id: '187', statement: 'Antarctica is a desert.', isTrue: true, topic: 'geography' },
  { id: '188', statement: 'The Dead Sea is the lowest point on Earth\'s surface.', isTrue: true, topic: 'geography' },
  { id: '189', statement: 'Greenland is the largest island in the world.', isTrue: true, topic: 'geography' },
  { id: '190', statement: 'The equator passes through more ocean than land.', isTrue: true, topic: 'geography' },
  { id: '191', statement: 'Iceland has no active volcanoes.', isTrue: false, topic: 'geography' },
  { id: '192', statement: 'The Sahara is the largest desert on Earth.', isTrue: false, topic: 'geography' }, // Antarctica is
  { id: '193', statement: 'Japan consists of more than 6,000 islands.', isTrue: true, topic: 'geography' },
  { id: '194', statement: 'The Amazon rainforest produces 20% of the world’s oxygen.', isTrue: false, topic: 'geography' }, // Common myth
  { id: '195', statement: 'The Pacific Ocean is the deepest ocean on Earth.', isTrue: true, topic: 'geography' },
  { id: '196', statement: 'Mount Kilimanjaro is in Kenya.', isTrue: false, topic: 'geography' }, // Tanzania
  { id: '197', statement: 'There are 7 continents on Earth.', isTrue: true, topic: 'geography' },
  { id: '198', statement: 'The Mississippi River is the longest river in the world.', isTrue: false, topic: 'geography' },
  { id: '199', statement: 'The Great Barrier Reef is visible from space.', isTrue: true, topic: 'geography' },
  { id: '200', statement: 'Lake Baikal is the deepest freshwater lake in the world.', isTrue: true, topic: 'geography' },
  { id: '201', statement: 'Monaco is the smallest country in the world.', isTrue: false, topic: 'geography' }, // Vatican City
  { id: '202', statement: 'The Andes is the longest continental mountain range.', isTrue: true, topic: 'geography' },
  { id: '203', statement: 'Siberia is mostly covered in ice year-round.', isTrue: false, topic: 'geography' },
  { id: '204', statement: 'The capital of Australia is Sydney.', isTrue: false, topic: 'geography' }, // Canberra
  { id: '205', statement: 'The Mariana Trench is deeper than Mount Everest is tall.', isTrue: true, topic: 'geography' },
  { id: '206', statement: 'Africa is the only continent in all four hemispheres.', isTrue: true, topic: 'geography' },
  { id: '207', statement: 'Mount Fuji is the tallest mountain in Asia.', isTrue: false, topic: 'geography' }, // Everest
  { id: '208', statement: 'Norway has more fjords than any other country.', isTrue: true, topic: 'geography' },
  { id: '209', statement: 'The Sahara Desert is expanding.', isTrue: true, topic: 'geography' },
  { id: '210', statement: 'Alaska is the smallest U.S. state.', isTrue: false, topic: 'geography' }, // Rhode Island
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
