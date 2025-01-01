import React, { StrictMode, useEffect, useState } from "@rbxts/react";
import { createPortal, createRoot } from "@rbxts/react-roblox";
import { Card } from "./components/card";
import { CardData } from "client/data/card";
import { CollectedCards } from "./components/currentcards";
import { ReflexProvider, useSelector } from "@rbxts/react-reflex";
import { store } from "client/store";
import { selectPlayerCards } from "shared/store/persistent-selectors";
import { Logger } from "@rbxts/log";

const root = createRoot(new Instance("Folder"));
export default function App() {
	const cardSelector = useSelector(selectPlayerCards);
	store.subscribe(cardSelector, cards => {
		print(cards);
	});

	const ids: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const cards: CardData[] = ids.map((id) => new CardData(`Card ${id}`));

	return <frame Size={new UDim2(1, 0, 1, 0)} Transparency={1} children={[<CollectedCards cards={cards} />]}></frame>;
}

export function renderApp() {
	// Don't forget to manually make it visible!

	while (!game.IsLoaded()) wait(0.1);
	const playerGui = new Instance("ScreenGui", game.GetService("Players").LocalPlayer.WaitForChild("PlayerGui"));
	root.render(<StrictMode>{createPortal(
	<ReflexProvider producer={store}>
		<App />
	</ReflexProvider>,
	playerGui)}</StrictMode>);
}