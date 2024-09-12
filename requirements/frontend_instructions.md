# Project Overview

The Card Matching Game is a web-based application that challenges users to find matching pairs of cards within a set of 20 cards. The game is designed to be engaging, responsive, and suitable for players of all ages. It provides a fun way to test and improve memory skills while offering a simple yet addictive gameplay experience.

# Feature Requirements

1. Game Board

Display a grid of 20 cards in a responsive layout
Ensure the game board adapts to different screen sizes (desktop, tablet, mobile)

2. Card Design

Create a set of 10 unique card designs, each with a matching pair
Implement a card "back" design to be shown when cards are face-down
Ensure cards are visually appealing and easily distinguishable

3. Game Mechanics

Allow users to flip cards by clicking or tapping on them
Limit card flips to two cards per turn
If two flipped cards match:

Keep them face-up
Award one point to the player

If two flipped cards do not match:

Automatically flip them face-down after a short delay (e.g., 1 second)

Continue gameplay until all matches are found

4. Scoring and Progress Tracking

Implement a turn counter to track the number of attempts

Increment the counter after every two card flips

Display the current turn count prominently on the screen
Show the number of matches found or remaining

5. Game Flow

Implement a "Start Game" button to begin a new game
Shuffle and randomly place cards at the start of each game
Display a victory message when all matches are found, showing the final turn count

6. User Interface

Design a clean, intuitive interface with clear instructions
Implement responsive design principles for cross-device compatibility
Use animations for card flips and matches to enhance user experience

7. Accessibility

Ensure the game is keyboard accessible
Implement proper ARIA labels for screen reader compatibility
Use sufficient color contrast for visibility

8. Performance

Optimize asset loading for quick initial render
Ensure smooth animations and transitions, even on lower-end devices

# Relevant Docs

EXAMPLE
Paste in docs on how to use APIs.

# Current File Structure

1. Take a screenshot of the file structure
2. Paste the screenshot into the chat and prompt it with "Help me generate the file structure in ASCII version"
3. Copy the result and place here

```
KIDS-MATCHING-GAME
├── .next
├── app
│   └── fonts
├── favicon.ico
├── globals.css
├── layout.tsx
├── page.tsx
├── lib
├── node_modules
├── requirements
│   └── frontend_inst...
├── .env.local
├── .eslintrc.json
├── .gitignore
├── components.json
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config...
├── tsconfig.json
└── yarn.lock
```

# Rules

- All new components should go in /components and be named like example-component.tx unless otherwise specified
- All new pages go in /app

# Mock up

- Add a screenshot of what the app should look like into the root directory.
