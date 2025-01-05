import React from "@rbxts/react";


interface ErrorPageProps {
    readonly message: unknown;
}

export function ErrorPage({message}: ErrorPageProps) {
    return (
        <frame 
            Size={new UDim2(1, 0, 1, 0)}
            
            // Position={new UDim2(0,0,0,0)}
        >
            <textlabel Text={tostring(message)} Position={new UDim2(0.5, 0, 0.5, 0)} TextSize={20}></textlabel>
        </frame>
    )
}