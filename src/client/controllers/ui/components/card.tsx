import React, { useBinding, useEffect, useState} from "@rbxts/react";
import { TweenOptions } from "@rbxts/ripple";
import { useMotion } from "../hooks/use-motion";
import { useSpring } from "../hooks/use-spring";
import { useEventListener } from "@rbxts/pretty-react-hooks";
import { RunService } from "@rbxts/services";

interface CardProps {
    position: UDim2;
	name: string;
}

export function Card(props: CardProps) {
	let startSize = new UDim2(0, 50, 0, 75);
	let endSize = new UDim2(0, 100, 0, 150);
	let startPosition = props.position;
	let midPosition = startPosition.add(new UDim2(0, 0, -0.1, 0)); 
	let endPosition = startPosition.add(new UDim2(0, 0, -0.25, 0));
	let delta = 0.5;
	let animCompleted = true;

	const [clicked, setClicked] = useState(false);
	// const posBinding = useSpring(startPosition)
	const [size, sizeMotion] = useMotion(startSize);
	const [pos, posMotion] = useMotion(startPosition);
	// const [progress, setProgress] = useBinding(0);

	// useEventListener(RunService.Heartbeat, (deltaTime) => {
	// 	setProgress(math.clamp(progress.getValue() + deltaTime, 0, 1));
	// })

	const handleMouseEnter = () => {
		if (clicked) return;
        sizeMotion.tween(endSize, { time: delta, style: Enum.EasingStyle.Quart });
		// setProgress(0);
		// posBinding.map(() => startPosition.Lerp(endPosition, progress.getValue()));
        posMotion.tween(midPosition, { time: delta, style: Enum.EasingStyle.Quart });
    }

    const handleMouseLeave = () => {
		if (clicked) return;
		sizeMotion.tween(startSize, { time: delta, style: Enum.EasingStyle.Quart });
		posMotion.tween(startPosition, {time: delta, style: Enum.EasingStyle.Quart});
    }

	const handleMouseClick = () => {
		// animCompleted = false;
		// if (!animCompleted) return;
		setClicked(true);
		posMotion.tween(endPosition, {time: delta, style: Enum.EasingStyle.Quart});
		wait(delta);
	}

	return (
		<textbutton
			Text={`${props.name}`}
			AnchorPoint={new Vector2(0.5, 0.5)}
			Size={size}
			Position={pos}
			Event={{
				MouseEnter: handleMouseEnter,
				MouseLeave: handleMouseLeave,
				MouseButton1Click: handleMouseClick
			}}
		/>
	);
}