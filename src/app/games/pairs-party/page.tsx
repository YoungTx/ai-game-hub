// src/app/games/paw-pairs-party/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { PairsPartyGame } from "@/components/games/PairsParty";

export default function PairsPartyPage() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-4">
			<h1 className="text-4xl font-bold text-indigo-700 mb-8">Emoji Pairs Party</h1>
			<PairsPartyGame />
		</div>
	);
}