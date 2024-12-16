import React, { useBinding, useEffect, useState} from "@rbxts/react";
import { TweenOptions } from "@rbxts/ripple";
import { useMotion } from "../hooks/use-motion";
import { useSpring } from "../hooks/use-spring";
import { useEventListener } from "@rbxts/pretty-react-hooks";
import { RunService } from "@rbxts/services";

interface CardProps {
    position: UDim2;
	name: string;
	onSelected: (a: boolean) => void;
	selected: number;
}

export function Card(props: CardProps) {
	const startSize = new UDim2(0, 50, 0, 75);
	const endSize = new UDim2(0, 100, 0, 150);

	const startPosition = props.position;
	const midPosition = startPosition.add(new UDim2(0, 0, -0.1, 0)); 
	const endPosition = startPosition.add(new UDim2(0, 0, -0.25, 0));
	
	const delta = 0.75;

	const tweenStyle = Enum.EasingStyle.Quart;

	let clicked = props.selected > -1;

	const [size, sizeMotion] = useMotion(startSize);
	const [pos, posMotion] = useMotion(startPosition);

	const handleMouseEnter = () => {
		if (clicked) return;
        sizeMotion.tween(endSize, { time: delta, style: tweenStyle });
        posMotion.tween(midPosition, { time: delta, style: tweenStyle });
		wait(delta);
    }

    const handleMouseLeave = () => {
		if (clicked) return;
		sizeMotion.tween(startSize, { time: delta, style: tweenStyle });
		posMotion.tween(startPosition, {time: delta, style: tweenStyle});
		wait(delta);
    }

	const handleMouseClick = () => {
		if (!clicked) { // card is already selected
			props.onSelected(true);
			posMotion.tween(endPosition, {time: delta, style: tweenStyle});
			sizeMotion.tween(endSize, {time: delta, style: tweenStyle});
		} else {
			props.onSelected(false);
			posMotion.tween(startPosition, {time: delta, style: tweenStyle});
			sizeMotion.tween(startSize, {time: delta, style: tweenStyle});
		}
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