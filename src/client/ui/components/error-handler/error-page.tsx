import Log from "@rbxts/log";
import React from "@rbxts/react";
import { TeleportService } from "@rbxts/services";
import { Layer } from "../layer";


interface ErrorPageProps {
    readonly message: unknown;
}

export function ErrorPage({message}: ErrorPageProps) {
    return (
        <Layer>
            <frame 
                Size={new UDim2(1, 0, 1, 0)}
            >
                <textlabel Text={tostring(message)} Position={new UDim2(0.5, 0, 0.5, 0)} TextSize={20}/>
                <textbutton 
                    Text={"Reconnect"}
                    Position={new UDim2(0.5, 0, 0.75, 0)}
                    AnchorPoint={new Vector2(0.5, 0.5)}
                    BackgroundColor3={Color3.fromRGB(255, 255, 255)}
                    Size={new UDim2(0, 75, 0, 50)}
                    Event={{
                        MouseButton1Click: async () => {
                            TeleportService.TeleportToPlaceInstance(game.PlaceId, game.JobId);
                            Log.Info("Reconnect attempted");
                        }
                    }}/>
            </frame>
        </Layer>
    )
}