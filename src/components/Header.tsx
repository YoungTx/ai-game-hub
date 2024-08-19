// src/components/Header.tsx
import Link from 'next/link';
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: ["400", "600", "700"], subsets: ["latin"] });

const PixelIcon = ({ className }: { className?: string }) => (
	<svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
		<rect x="4" y="4" width="4" height="4" />
		<rect x="8" y="8" width="4" height="4" />
		<rect x="12" y="12" width="4" height="4" />
		<rect x="16" y="16" width="4" height="4" />
	</svg>
);

export default function Header() {
	return (
		<header className="bg-white shadow-sm relative z-10">
			<div className="container mx-auto px-4 py-4 flex justify-between items-center">
				<Link href="/" className="flex items-center space-x-2">
					<PixelIcon className="w-8 h-8 text-indigo-600" />
					<h1 className={`${poppins.className} text-xl font-bold text-gray-800`}>AI Play Hub</h1>
				</Link>
				<nav>
					<ul className="flex space-x-6">
						<li><Link href="/" className="text-gray-600 hover:text-indigo-600 transition-colors">Home</Link></li>
						<li><Link href="/games" className="text-gray-600 hover:text-indigo-600 transition-colors">All Games</Link></li>
						<li><Link href="/categories" className="text-gray-600 hover:text-indigo-600 transition-colors">Categories</Link></li>
						<li><Link href="/about" className="text-gray-600 hover:text-indigo-600 transition-colors">About</Link></li>
					</ul>
				</nav>
			</div>
		</header>
	);
}