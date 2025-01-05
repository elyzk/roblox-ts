import React, { StrictMode, useEffect, useState } from "@rbxts/react";
import { createPortal, createRoot } from "@rbxts/react-roblox";
import { ReflexProvider, useSelector, useSelectorCreator } from "@rbxts/react-reflex";
import { store } from "client/store";
import Log, { Logger } from "@rbxts/log";
import { Players } from "@rbxts/services";
import { selectPlayerCards } from "shared/store/save/save-selectors";
import { defaultPlayerSave } from "shared/store/save/save-types";
import { USER_ID } from "shared/constants";
import { CollectedCards } from "./components/currentcards";

export function App() {
	return <frame Size={new UDim2(1, 0, 1, 0)} Transparency={1} children={[<CollectedCards/>]}></frame>;
}