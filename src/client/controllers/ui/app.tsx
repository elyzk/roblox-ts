import React, { StrictMode, useEffect, useState } from "@rbxts/react";
import { createPortal, createRoot } from "@rbxts/react-roblox";
import { Card } from "./components/card";
import { CardData } from "client/data/card";
import { CollectedCards } from "./components/currentcards";

const root = createRoot(new Instance("Folder"));
export default function App() {
	let cardNames: string[] = ["red", "orange", "yellow", "green", "blue", "purple"];
	let cards: CardData[] = cardNames.map((name) => new CardData(name));
	// let cards : CardData[] = [new CardData("cheese"), new CardData("crackers"), new CardData("muffin"), new CardData("crackers")];

	return (
		<frame
			Size={new UDim2(1, 0, 1, 0)}
			children={[
				<textlabel
					Position={new UDim2(0.5, 0, 0.5, 0)} // Relative to top left
					AnchorPoint={new Vector2(0.5, 0.5)} // Does nothing??
					Text={`Hello`}
					FontSize={Enum.FontSize.Size96}
					Font={Enum.Font.LuckiestGuy}
					TextColor3={new Color3(1, 1, 1)}
					children={[<uistroke Thickness={8} />]}
				/>,
				<CollectedCards cards={cards}	/>
			]}
		></frame>
	);
}

export function renderApp() {
	// Don't forget to manually make it visible!

	while (!game.IsLoaded()) wait(0.1);
	const playerGui = new Instance("ScreenGui", game.GetService("Players").LocalPlayer.WaitForChild("PlayerGui"));
	root.render(<StrictMode>{createPortal(<App />, playerGui)}</StrictMode>);
}