// src/app/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: ["600", "700"], subsets: ["latin"] });

export default function Home() {
  const games = [
    { id: 1, name: "AI Chess Master", path: "/games/chess", image: "/chess.jpg", description: "Challenge our AI in a game of strategy" },
    { id: 2, name: "Neural Puzzle", path: "/games/puzzle", image: "/puzzle.jpg", description: "Solve AI-generated puzzles that adapt to your skill" },
    { id: 3, name: "Quantum Trivia", path: "/games/trivia", image: "/trivia.jpg", description: "Test your knowledge against our ever-learning AI" },
    { id: 4, name: "Emoji Pairs Party", path: "/games/pairs-party", image: "/emoji-pairs.png", description: "Match emoji pairs in this fun memory game" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className={`${poppins.className} text-3xl font-bold mb-8 text-center text-gray-800`}>Discover AI-Powered Games</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {games.map((game) => (
          <Link key={game.id} href={game.path} className="block group">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:scale-105">
              <div className="relative h-48">
                <Image
                  src={game.image}
                  alt={game.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-opacity duration-300 group-hover:opacity-80"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{game.name}</h3>
                <p className="text-gray-600">{game.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}