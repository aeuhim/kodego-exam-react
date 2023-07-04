# Tic Tac Toe

This is a simple implementation of the Tic-Tac-Toe game using TypeScript, Node.js for the backend, and React.js for the UI.

## Project Structure

The project has the following structure:

- /app
  - favicon.ico: Icon file for the application
  - globals.css: Global CSS styles applied to the entire application
  - layout.tsx: Layout component used to define the overall structure of the pages
  - page.module.css: CSS styles specific to the page component
  - page.tsx: Page component representing the main content of the application
- /pages
  - /api
    - evaluate.ts: API endpoint for evaluating game moves
- .eslintrc.json: ESLint configuration file for code linting
- .gitignore: File specifying which files and directories should be ignored by Git
- LICENSE: License file for the project
- next.config.js: Configuration file for Next.js
- package-lock.json: Automatically generated file for package version locking
- package.json: Project dependencies and scripts
- README.md: Documentation explaining the project details
- tsconfig.json: TypeScript configuration file

## Development Environment Setup

To get started, open the terminal and follow the steps below:

1. Clone the repository
    ```bash
    git clone https://github.com/aeuhim/kodego-exam-react.git
    ```

2. Change directory to `kodego-exam-react`
    ```bash
    cd kodego-exam-react
    ```

3. Install dependencies
    ```bash
    npm install
    ```

5. Run development server
    ```bash
    npm run dev
    ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result

## Compromises And Future Improvements

Due to time constraints, the following compromises were made:

- Error handling and validation are minimal. Additional error cases, such as invalid moves or unexpected server responses, should be handled more robustly.

- The game does not include an online multiplayer mode. Implementing online multiplayer functionality would enhance the gaming experience.

In future iterations or with more time, the following improvements could be made:

- Implement an AI opponent with different difficulty levels to provide a single-player mode.

- Add a scoreboard to keep track of wins, losses, and draws between players.

## Unhandled Error Cases

The current implementation handles most common error cases, such as invalid moves or duplicate selections. However, there are a few unhandled error cases that could impact the solution:

1. **Network Errors:** If there are network issues between the frontend and backend, such as server unavailability or connectivity problems, the game may not function properly or fail to update the board state.

2. **Backend Validation Errors:** Although some basic validation is performed on the backend, there may still be edge cases or unexpected scenarios that could lead to an invalid game state or incorrect responses.

