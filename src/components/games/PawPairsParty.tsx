// src/components/games/PawPairsPartyGame.tsx
import React, { useState, useEffect } from 'react';

const initialEmojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔'];

interface Card {
	emoji: string;
	index: number;
}

interface HighScore {
	name: string;
	score: number;
}

const Card: React.FC<{ emoji: string; isFlipped: boolean; onClick: () => void }> = ({ emoji, isFlipped, onClick }) => (
	<div
		className={`w-16 h-16 m-1 flex items-center justify-center text-2xl cursor-pointer transition-all duration-300 rounded-lg ${
			isFlipped ? 'bg-white shadow-md' : 'bg-indigo-500 hover:bg-indigo-600'
		}`}
		onClick={onClick}
	>
		{isFlipped ? emoji : '?'}
	</div>
);

export const PawPairsPartyGame: React.FC = () => {
	const [cards, setCards] = useState<Card[]>([]);
	const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
	const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
	const [moves, setMoves] = useState(0);
	const [level, setLevel] = useState(1);
	const [gameOver, setGameOver] = useState(false);
	const [highScores, setHighScores] = useState<HighScore[]>([]);

	useEffect(() => {
		startNewLevel();
		loadHighScores();
	}, []);

	useEffect(() => {
		if (flippedIndices.length === 2) {
			const [firstIndex, secondIndex] = flippedIndices;
			if (cards[firstIndex].emoji === cards[secondIndex].emoji) {
				setMatchedPairs([...matchedPairs, cards[firstIndex].emoji]);
			}
			setTimeout(() => setFlippedIndices([]), 1000);
			setMoves(moves => moves + 1);
		}
	}, [flippedIndices, cards, matchedPairs]);

	useEffect(() => {
		if (matchedPairs.length === cards.length / 2 && cards.length > 0) {
			setTimeout(() => {
				setLevel(level => level + 1);
				startNewLevel();
			}, 1000);
		}
	}, [matchedPairs, cards.length]);

	const startNewLevel = () => {
		const pairsCount = Math.min(4 + level, initialEmojis.length);
		const levelEmojis = initialEmojis.slice(0, pairsCount);
		const shuffledEmojis = [...levelEmojis, ...levelEmojis].sort(() => Math.random() - 0.5);
		setCards(shuffledEmojis.map((emoji, index) => ({ emoji, index })));
		setFlippedIndices([]);
		setMatchedPairs([]);
	};

	const handleCardClick = (index: number) => {
		if (flippedIndices.length < 2 && !flippedIndices.includes(index) && !matchedPairs.includes(cards[index].emoji)) {
			setFlippedIndices([...flippedIndices, index]);
		}
	};

	const endGame = () => {
		setGameOver(true);
		updateHighScores(level - 1);
	};

	const resetGame = () => {
		setLevel(1);
		setMoves(0);
		setGameOver(false);
		startNewLevel();
	};

	const loadHighScores = () => {
		const scores = JSON.parse(localStorage.getItem('pawPairsPartyHighScores') || '[]') as HighScore[];
		setHighScores(scores);
	};

	const updateHighScores = (score: number) => {
		const newHighScores = [...highScores, { name: 'Player', score }]
			.sort((a, b) => b.score - a.score)
			.slice(0, 5);
		setHighScores(newHighScores);
		localStorage.setItem('pawPairsPartyHighScores', JSON.stringify(newHighScores));
	};

	return (
		<div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
			{!gameOver ? (
				<>
					<div className="mb-4 text-lg font-semibold text-indigo-700">Level: {level} | Moves: {moves}</div>
					<div className="grid grid-cols-4 sm:grid-cols-6 gap-2 bg-indigo-100 p-4 rounded-lg">
						{cards.map((card, index) => (
							<Card
								key={index}
								emoji={card.emoji}
								isFlipped={flippedIndices.includes(index) || matchedPairs.includes(card.emoji)}
								onClick={() => handleCardClick(index)}
							/>
						))}
					</div>
					<button
						className="mt-6 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
						onClick={endGame}
					>
						End Game
					</button>
				</>
			) : (
				<div className="text-center">
					<h2 className="text-2xl font-bold text-indigo-700 mb-4">Game Over!</h2>
					<p className="text-xl">You reached Level: {level - 1}</p>
					<p className="text-xl mb-4">Total Moves: {moves}</p>
					<h3 className="text-xl font-bold mt-6 mb-2">High Scores</h3>
					<ul className="mb-4">
						{highScores.map((score, index) => (
							<li key={index} className="text-lg">{score.name}: Level {score.score}</li>
						))}
					</ul>
					<button
						className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors"
						onClick={resetGame}
					>
						Play Again
					</button>
				</div>
			)}
		</div>
	);
};