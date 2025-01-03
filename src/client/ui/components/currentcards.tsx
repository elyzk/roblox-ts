import { useSelector, useSelectorCreator } from "@rbxts/react-reflex";
import { Card } from "./card";
import React, { useState } from "@rbxts/react";
import { selectPlayerCards, selectPlayerSaveById, selectPlayerSaves } from "shared/store/save/save-selectors";
import { Players } from "@rbxts/services";
import { useStore } from "../hooks/use-store";
import Log from "@rbxts/log";

// Graphical representation of a list of cards

export function CollectedCards() {
	const [selected, setSelected] = useState(-1);

	let collectedCards = useSelectorCreator(selectPlayerCards, `${Players.LocalPlayer.UserId}`)
	// let collectedCards = useSelector(selectPlayerCards(`${Players.LocalPlayer.UserId}`));
	if (collectedCards === undefined) {
		Log.Warn('Selector is undefined');
		collectedCards = [];
	}

	let testSelector = useSelector(selectPlayerSaves);
	Log.Info("Collected cards re-rendered");
	// const collectedCards = useSelector(selectPlayerCards("151381226")) || [];

	const cards = collectedCards.map((card, i) => {
		const yOffset = 0.85;
		const xOffset = (1 / (collectedCards.size() + 1)) * (i + 1);
		const onSelected: (a: boolean) => void = (selection) => {
			if (!selection) {
				if (selected !== i) return; // We clicked on an unselected card
				setSelected(-1); // We are deselecting the current card
			} else {
				setSelected(i);
			}
			print(`Card ${i + 1} was updated`);
		};
		return (
			<Card
				name={card}
				position={new UDim2(xOffset, 0, yOffset, 0)}
				onSelected={onSelected}
				selected={selected}
			/>
		);
	});

	return (
		<frame
			Size={new UDim2(1, 0, 1, 0)}
			Transparency={1}
			children={[
				<textlabel
					Position={new UDim2(0.5, 0, 0.1, 0)} // Relative to top left
					AnchorPoint={new Vector2(0.5, 0.5)} // Does nothing??
					Text={selected > 0 ? `Card ${selected + 1}` : ""}
					FontSize={Enum.FontSize.Size96}
					Font={Enum.Font.LuckiestGuy}
					TextColor3={new Color3(1, 1, 1)}
					children={[<uistroke Thickness={8} />]}
				/>,
				cards,
			]}
		></frame>
	);
}
