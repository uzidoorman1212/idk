export const quizQuestions = [
  {
    prompt: 'What was the main purpose of Viking longships?',
    answer: 'Travel and trade',
    choices: ['Travel and trade', 'Military conquest', 'Farm work', 'Religious ceremonies'],
  },
  {
    prompt: 'Where did the Vikings originate?',
    answer: 'Scandinavia',
    choices: ['Ancient Greece', 'Scandinavia', 'England', 'Byzantium'],
  },
  {
    prompt: 'What was a runestone used for?',
    answer: 'Commemorating people or events',
    choices: ['Making food', 'Commemorating people or events', 'Building roads', 'Training horses'],
  },
  {
    prompt: 'Which trade good was widely exchanged by the Vikings?',
    answer: 'Furs and slaves',
    choices: ['Cotton clothing', 'Furs and slaves', 'Modern weapons', 'Paper books'],
  },
  {
    prompt: 'Which religion influenced Viking belief and culture?',
    answer: 'Norse mythology',
    choices: ['Confucianism', 'Norse mythology', 'Islam', 'Judaism'],
  },
];

export const topicQuizzes = {
  geography: [
    { prompt: 'Which sea was a major route for Viking travel?', answer: 'North Sea', choices: ['North Sea', 'Indian Ocean', 'Pacific Ocean', 'Red Sea'] },
    { prompt: 'What does Scandinavia include?', answer: 'Northern Europe', choices: ['Northern Europe', 'Southern Europe', 'East Asia', 'South America'] },
    { prompt: 'Where did Vikings reach in North America?', answer: 'Newfoundland', choices: ['Newfoundland', 'Machu Picchu', 'Egypt', 'Australia'] },
  ],
  trade: [
    { prompt: 'What was one important Viking trade good?', answer: 'Furs', choices: ['Furs', 'Houseplants', 'Computers', 'Paint'] },
    { prompt: 'What did trade help Vikings exchange?', answer: 'Goods and ideas', choices: ['Goods and ideas', 'Only poetry', 'Only weather', 'Only legends'] },
    { prompt: 'Which place was linked to Viking trade?', answer: 'Byzantium', choices: ['Byzantium', 'Antarctica', 'Mars', 'Mexico'] },
  ],
  religion: [
    { prompt: 'Who was the Viking god of wisdom?', answer: 'Odin', choices: ['Odin', 'Thor', 'Freyja', 'Loki'] },
    { prompt: 'What might a runestone commemorate?', answer: 'A person or event', choices: ['A person or event', 'A field of corn', 'A new bridge', 'A weather forecast'] },
    { prompt: 'What was Norse mythology?', answer: 'The Vikings’ belief system', choices: ['The Vikings’ belief system', 'A Roman law code', 'A Chinese calendar', 'A modern sport'] },
  ],
  community: [
    { prompt: 'What was a Viking farm?', answer: 'A place for food production', choices: ['A place for food production', 'A military base', 'A shipyard only', 'A museum'] },
    { prompt: 'What skill could a craftspeople have?', answer: 'Making tools or clothing', choices: ['Making tools or clothing', 'Building rockets', 'Designing computers', 'Teaching spaceflight'] },
    { prompt: 'What could give a leader influence?', answer: 'Wealth and relationships', choices: ['Wealth and relationships', 'Being the tallest person', 'Owning the most horses', 'Living in a castle'] },
  ],
  evidence: [
    { prompt: 'What might archaeologists find?', answer: 'Tools and burial goods', choices: ['Tools and burial goods', 'Modern car keys', 'Social media posts', 'Movie tickets'] },
    { prompt: 'Why compare historical sources?', answer: 'To build a fuller picture', choices: ['To build a fuller picture', 'To make a longer story', 'To remove facts', 'To change dates'] },
    { prompt: 'What is one limitation of written records?', answer: 'They may be written later', choices: ['They may be written later', 'They are always true', 'They never need study', 'They are impossible to read'] },
  ],
};

export function getTopicQuiz(topic) {
  return topicQuizzes[topic] ?? [];
}

export function normalizeAnswer(value) {
  return value.trim().toLowerCase();
}

export function getQuizQuestion(index) {
  return quizQuestions[index] ?? null;
}

export function calculateQuizScore(answers, correctAnswers) {
  return answers.reduce((score, answer, index) => score + (answer === correctAnswers[index] ? 1 : 0), 0);
}
