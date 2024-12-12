import React, { Component, ReactComponent, StrictMode, useState } from "@rbxts/react";
import { createPortal, createRoot } from "@rbxts/react-roblox";

const root = createRoot(new Instance("Folder"));
export default function App() {
    return <frame
        Size = {new UDim2(1,0,1,0)}
		children = {[
			<textlabel
					Position={new UDim2(0.5, 0, 0.5, 0)} // Relative to top left
					AnchorPoint={new Vector2(0.5, 0)} // Does nothing??
					Text={`Hello`}
					FontSize={Enum.FontSize.Size96}
					Font={Enum.Font.LuckiestGuy}
					TextColor3={new Color3(1, 1, 1)}
					children={[
						<uistroke
							Thickness={8}
						/>
					]}
				/>
		]}
    >
    </frame>;
}

export function renderApp() {
	// Don't forget to manually make it visible!

	while (!game.IsLoaded()) wait(0.1);
	const playerGui = new Instance("ScreenGui", game.GetService("Players").LocalPlayer.WaitForChild("PlayerGui"));
	root.render(
		<StrictMode>
            {createPortal(<App />, playerGui)}
		</StrictMode>);
}

interface CounterProps {
	initialCount: number;
}

export function Counter({ initialCount }: CounterProps) {
	const [count, setCount] = useState(initialCount);

	return (
		<textbutton
			Text={`Count: ${count}`}
			AnchorPoint={new Vector2(0.5, 0.5)}
			Size={new UDim2(0, 100, 0, 50)}
			Position={new UDim2(0.5, 0, 0.5, 0)}
			Event={{
				Activated: () => setCount(count + 1),
			}}
		/>
	);
}

