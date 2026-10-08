import test from 'node:test';
import assert from 'node:assert/strict';

import {
  calculateQuizScore,
  getQuizQuestion,
  getTopicQuiz,
  normalizeAnswer,
  topicQuizzes,
} from './study-core.js';

test('normalizeAnswer removes extra whitespace and case differences', () => {
  assert.equal(normalizeAnswer('  Scandinavia  '), 'scandinavia');
  assert.equal(normalizeAnswer('VIKING'), 'viking');
});

test('getQuizQuestion returns the requested question and its answer', () => {
  const question = getQuizQuestion(0);

  assert.equal(question.prompt, 'What was the main purpose of Viking longships?');
  assert.equal(question.answer, 'Travel and trade');
});

test('calculateQuizScore awards one point for each correct choice', () => {
  assert.equal(calculateQuizScore([0, 1, 2], [0, 1, 2]), 3);
  assert.equal(calculateQuizScore([0, 1, 1], [0, 1, 2]), 2);
  assert.equal(calculateQuizScore([], []), 0);
});

test('each topic has a three-question mini quiz', () => {
  assert.deepEqual(Object.keys(topicQuizzes), [
    'geography',
    'trade',
    'religion',
    'community',
    'evidence',
  ]);

  for (const questions of Object.values(topicQuizzes)) {
    assert.equal(questions.length, 3);
    assert.ok(questions.every((question) => question.prompt && question.answer && question.choices.length > 1));
  }
});

test('getTopicQuiz returns the selected topic round', () => {
  const quiz = getTopicQuiz('trade');
  assert.equal(quiz[0].prompt, 'What was one important Viking trade good?');
  assert.equal(quiz.length, 3);
});
