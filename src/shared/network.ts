import { Networking } from "@flamework/networking";
import { BroadcastAction } from "@rbxts/reflex";
import { Client } from "@rbxts/remo";

interface ServerEvents {
    reflex: {
        start: () => void;
    }
}

interface ServerFunctions{}

interface ClientEvents {
    reflex: {
        dispatch: (actions: Array<BroadcastAction>) => void;
        start: () => void;
    }
}

interface ClientFunctions{}

export const GlobalEvents = Networking.createEvent<ServerEvents, ClientEvents>();
export const GlobalFunctions = Networking.createFunction<ServerFunctions, ClientFunctions>();
