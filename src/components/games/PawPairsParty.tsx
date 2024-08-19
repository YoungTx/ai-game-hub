import React, { useState, useEffect } from 'react';
import styles from './PawPairsParty.module.css';

const easyEmojis = [
  '🍎', '🍌', '🍒', '🍓', '🍊', '🍋', '🍉', '🍇', '🍍', '🥝',
  '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯',
  '🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '✈️',
  '⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🎱', '🏓',
  '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔'
];

const mediumEmojis = [
  '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
  '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
  '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩',
  '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
  '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬'
];

const hardEmojis = [
  '🌱', '🌿', '☘️', '🍀', '🍃', '🍂', '🍁', '🍄', '🌾', '💐',
  '🌷', '🌹', '🥀', '🌺', '🌸', '🌼', '🌻', '🌞', '🌝', '🌛',
  '🌜', '🌚', '🌕', '🌖', '🌗', '🌘', '🌑', '🌒', '🌓', '🌔',
  '💫', '⭐', '🌟', '✨', '⚡', '☄️', '💥', '🔥', '🌪️', '🌈',
  '☀️', '🌤️', '⛅', '🌥️', '☁️', '🌦️', '🌧️', '⛈️', '🌩️', '🌨️'
];

const getEmojisForLevel = (level: number): string[] => {
  if (level <= 3) return easyEmojis;
  if (level <= 6) return mediumEmojis;
  return hardEmojis;
};

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
		className={`${styles.card} ${isFlipped ? styles.cardFlipped : styles.cardUnflipped}`}
		onClick={onClick}
	>
		{isFlipped ? emoji : '?'}
	</div>
);

const calculateGridSize = (level: number): number => {
  if (level <= 3) return 4;  // 4x4 for levels 1-3
  if (level <= 6) return 6;  // 6x6 for levels 4-6
  if (level <= 9) return 8;  // 8x8 for levels 7-9
  return 10;  // 10x10 for level 10 and above
};

export const PawPairsPartyGame: React.FC = () => {
	const [cards, setCards] = useState<Card[]>([]);
	const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
	const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
	const [moves, setMoves] = useState(0);
	const [level, setLevel] = useState(1);
	const [gameOver, setGameOver] = useState(false);
	const [highScores, setHighScores] = useState<HighScore[]>([]);
	const [levelComplete, setLevelComplete] = useState(false);
	const [disableClicks, setDisableClicks] = useState(false);

	useEffect(() => {
		startNewLevel();
		loadHighScores();
	}, []);

	useEffect(() => {
		if (flippedIndices.length === 2) {
			setDisableClicks(true);
			const [firstIndex, secondIndex] = flippedIndices;
			if (cards[firstIndex].emoji === cards[secondIndex].emoji) {
				setMatchedPairs(prev => [...prev, cards[firstIndex].emoji]);
				setFlippedIndices([]);
				setDisableClicks(false);
			} else {
				setTimeout(() => {
					setFlippedIndices([]);
					setDisableClicks(false);
				}, 400);
			}
			setMoves(moves => moves + 1);
		}
	}, [flippedIndices, cards]);

	useEffect(() => {
		if (matchedPairs.length === cards.length / 2 && cards.length > 0) {
			setLevelComplete(true);
		}
	}, [matchedPairs, cards.length]);

	const startNewLevel = () => {
		const gridSize = calculateGridSize(level);
		const cardCount = gridSize * gridSize;
		const pairsCount = cardCount / 2;
		const levelEmojis = getEmojisForLevel(level);
		const shuffledEmojis = [...levelEmojis.slice(0, pairsCount), ...levelEmojis.slice(0, pairsCount)]
			.sort(() => Math.random() - 0.5);
		setCards(shuffledEmojis.map((emoji, index) => ({ emoji, index })));
		setFlippedIndices([]);
		setMatchedPairs([]);
		setLevelComplete(false);
	};

	const handleCardClick = (index: number) => {
		if (disableClicks || flippedIndices.length === 2 || flippedIndices.includes(index) || matchedPairs.includes(cards[index].emoji)) {
			return;
		}
		setFlippedIndices(prev => [...prev, index]);
	};

	const goToNextLevel = () => {
		setLevel(level => level + 1);
		startNewLevel();
	};

	const endGame = () => {
		setGameOver(true);
		updateHighScores(level);
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
		const playerName = prompt("请输入你的名字：") || "匿名玩家";
		const newHighScores = [...highScores, { name: playerName, score }]
			.sort((a, b) => b.score - a.score)
			.slice(0, 5);
		setHighScores(newHighScores);
		localStorage.setItem('pawPairsPartyHighScores', JSON.stringify(newHighScores));
	};

	const gridSize = calculateGridSize(level);
	const gridClass = styles[`gridCols${gridSize}`];

	return (
		<div className="flex flex-col items-center justify-center bg-indigo-100 rounded-lg shadow-lg p-4 w-full h-full">
			{!gameOver ? (
				<>
					<div className="mb-4 text-lg font-semibold text-indigo-700">Level: {level} | Moves: {moves}</div>
					<div className={`${styles.grid} ${gridClass}`}>
						{cards.map((card, index) => (
							<Card
								key={index}
								emoji={card.emoji}
								isFlipped={flippedIndices.includes(index) || matchedPairs.includes(card.emoji)}
								onClick={() => handleCardClick(index)}
							/>
						))}
					</div>
					{levelComplete ? (
						<button
							className="mt-4 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
							onClick={goToNextLevel}
						>
							Next Level
						</button>
					) : (
						<button
							className="mt-4 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
							onClick={endGame}
						>
							End Game
						</button>
					)}
				</>
			) : (
				<div className="text-center">
					<h2 className="text-2xl font-bold text-indigo-700 mb-4">Game Over!</h2>
					<p className="text-xl">You reached Level: {level}</p>
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