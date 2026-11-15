# Tic-Tac-Toe (React + Vite)

## Features
- Notebook-page design: hand-drawn board, X/O pen se likhe jaate hain (animation), jeetne wali line par highlighter
- 2 Players mode aur **vs Computer** mode (Easy / Medium / Hard — Hard me minimax AI, haraana mushkil hai)
- Jeetne wali line highlight hoti hai, **Draw** bhi detect hota hai
- Scoreboard (O, X, Draws) — har round me starter badalta hai
- Restart round / Reset scores buttons hamesha available
- Font (Kalam) bundled hai — offline bhi chalega
- Responsive (mobile pe bhi), keyboard se khel sakte ho (Tab + Enter)

## Run
```bash
npm install
npm run dev      # local dev server
npm run build    # production build -> dist/
npm run lint
```

`vite.config.js` me `base: "/Tick-Tack-Toe-GAME/"` GitHub Pages ke liye set hai.
