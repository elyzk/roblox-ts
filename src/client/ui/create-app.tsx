import { StrictMode } from "@rbxts/react";
import { createPortal, createRoot } from "@rbxts/react-roblox";
import { Players } from "@rbxts/services";
import { RootProvider } from "./providers/root-provider";
import React from "@rbxts/react";

const root = createRoot(new Instance("Folder"));
const playerGui = new Instance("ScreenGui", Players.LocalPlayer.WaitForChild("PlayerGui"));

// export function createApp() {
//     root.render(<StrictMode>{createPortal(
// 		<RootProvider>
// 			<App />
// 		</RootProvider>,
// 	playerGui)}</StrictMode>);
// }

// I do not know why this is async. I guess the UI can fail to render?
export async function createApp(): Promise<void> {
	// Avoid implicit React import before setting the __DEV__ flag
	const React = await import("@rbxts/react");
	const { App } = await import("client/ui/app");

	root.render(<StrictMode>{createPortal(
        <RootProvider>
            <App />
        </RootProvider>,
    playerGui)}</StrictMode>);
}
