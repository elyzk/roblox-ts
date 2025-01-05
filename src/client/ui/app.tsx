import React, { StrictMode, useEffect, useState } from "@rbxts/react";
import { createPortal, createRoot } from "@rbxts/react-roblox";
import { Card } from "./components/card";
import { CollectedCards } from "./components/currentcards";
import { ReflexProvider, useSelector, useSelectorCreator } from "@rbxts/react-reflex";
import { store } from "client/store";
import Log, { Logger } from "@rbxts/log";
import { Players } from "@rbxts/services";
import { selectPlayerCards } from "shared/store/save/save-selectors";
import { defaultPlayerSave } from "shared/store/save/save-types";
import { USER_ID } from "shared/constants";

const root = createRoot(new Instance("Folder"));
const playerGui = new Instance("ScreenGui", Players.LocalPlayer.WaitForChild("PlayerGui"));
export default function App() {

	return <frame Size={new UDim2(1, 0, 1, 0)} Transparency={1} children={[<CollectedCards/>]}></frame>;
}

export function renderApp() {
	root.render(<StrictMode>{createPortal(
		<ReflexProvider producer={store}>
			<App />
		</ReflexProvider>,
	playerGui)}</StrictMode>);
}
