import React from "@rbxts/react";

export function MenuVignette() {
    return (
        <frame 
            Size={new UDim2(1, 0, 1, 0)}
            
            // Position={new UDim2(0,0,0,0)}
        >
            <uigradient Color={new ColorSequence(Color3.fromRGB(255, 0, 0), Color3.fromRGB(0, 255, 0))} />
        </frame>
    )
}