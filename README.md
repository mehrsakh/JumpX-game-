This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Jump Game (Next.js)

A simple but dynamic browser-based jump game built with Next.js (App Router) and requestAnimationFrame.

The player must jump over incoming obstacles while the game gradually increases in difficulty.

## Features

 Smooth physics using requestAnimationFrame, Two moving obstacles, Progressive difficulty (speed increases over time),Score system,High Score tracking, Pause / Resume functionality, Game Over screen,Restart option, Clean and minimal UI

## How to Play

Click Start,Press the JUMP button,Avoid hitting the red obstacles,The game speeds up every 5 points,Try to beat your High Score

You can:

Click Pause to stop the game,Click Resume to continue,Click Restart after Game Over

## Tech Stack

Next.js 16
React (Client Component)
requestAnimationFrame for game loop
React useRef for high-performance state handling
Inline CSS styling


## How It Works

The game loop runs using requestAnimationFrame,Physics is calculated using delta time (dt),Obstacles move left continuously,Collision detection checks overlap between player and obstacles

Game state is controlled with:
idle,running,paused,gameover

Refs are used for performance-critical values:
Player position,Velocity,Obstacle positions,,Score,Speed,React state is used only for UI updates.

## Future 
Add keyboard controls (Enter / Space),Add sound effects (jump / collision),Add background animations , Add mobile tap support,Add persistent high score using localStorage , Add difficulty levels , Add animations and particle effects
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
