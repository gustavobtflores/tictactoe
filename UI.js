import { ChallengeController } from './ChallengeController.js';

const challengeController = new ChallengeController();
const botVsBotButton = document.getElementById('bot-vs-bot');
const humanVsBotButton = document.getElementById('human-vs-bot');

botVsBotButton.addEventListener('click', () => {
  challengeController.startNewGame(challengeController.PLAYER_TYPES.bot, challengeController.PLAYER_TYPES.bot);
});

humanVsBotButton.addEventListener('click', () => {
  challengeController.startNewGame(challengeController.PLAYER_TYPES.human, challengeController.PLAYER_TYPES.bot);
});

challengeController.startNewGame(challengeController.PLAYER_TYPES.human, challengeController.PLAYER_TYPES.bot);
