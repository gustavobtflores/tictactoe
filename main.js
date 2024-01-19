import { ChallengeController } from './ChallengeController.js';

const challengeController = new ChallengeController();
const botVsBotButton = document.getElementById('ai-vs-ai');
const xVsAi = document.getElementById('x-vs-ai');
const oVsAi = document.getElementById('o-vs-ai');

botVsBotButton.addEventListener('click', () => {
  challengeController.startNewGame(challengeController.PLAYER_TYPES.bot, challengeController.PLAYER_TYPES.bot);
});

xVsAi.addEventListener('click', () => {
  challengeController.startNewGame(challengeController.PLAYER_TYPES.human, challengeController.PLAYER_TYPES.bot);
});

oVsAi.addEventListener('click', () => {
  challengeController.startNewGame(challengeController.PLAYER_TYPES.bot, challengeController.PLAYER_TYPES.human);
});
