# IQ Test — Big Brain Energy

Ten multiple-choice questions with shuffled choices, honest per-question feedback, and a joke final IQ score of 69 for every player. Retake starts from question one. This is an entertainment site, not a real IQ assessment.

Run `npm start` and open http://localhost:8073. Or open `dist/index.html` directly. No dependencies or build step required. Run `npm test` to check the question data, shuffling, answer locking, scoring, and reset.

## Deployment

Upload this folder's contents to a new GitHub repository, including `.github/workflows/deploy.yml`. Select GitHub Actions under Settings → Pages and run the deployment workflow. It tests and deploys `dist`.

Repository: https://github.com/ka-chowF1/IQ-Test

GitHub Pages URL (after enabling Pages): https://ka-chowf1.github.io/IQ-Test/

The dashboard widget is named IQ Test with 🧠 and the tagline “Ten questions. One very confident assessment.”

Responsive styles support small screens and reduced motion. Native buttons support keyboard input, feedback is announced by screen readers, and focus moves to the next question. Automated logic tests do not replace visual cross-browser checks.
