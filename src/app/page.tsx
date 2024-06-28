// src/app/page.tsx
import Link from 'next/link';
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: ["600", "700"], subsets: ["latin"] });

export default function Home() {
  const games = [
    { id: 1, name: "AI Chess Master", path: "/games/chess", image: "/chess.jpg", description: "Challenge our AI in a game of strategy" },
    { id: 2, name: "Neural Puzzle", path: "/games/puzzle", image: "/puzzle.jpg", description: "Solve AI-generated puzzles that adapt to your skill" },
    { id: 3, name: "Quantum Trivia", path: "/games/trivia", image: "/trivia.jpg", description: "Test your knowledge against our ever-learning AI" },
    { id: 4, name: "Paw Pairs Party", path: "/games/paw-pairs-party", image: "/paw-pairs.jpg", description: "Match animal pairs in this fun memory game" },
  ];

  return (
    <div>
      <h2 className={`${poppins.className} text-3xl font-bold mb-8 text-center text-gray-800`}>Discover AI-Powered Games</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {games.map((game) => (
          <Link key={game.id} href={game.path} className="game-card">
            <div className="game-card-image" style={{backgroundImage: `url(${game.image})`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
            <div className="game-card-content">
              <h3 className="game-card-title">{game.name}</h3>
              <p className="game-card-description">{game.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}