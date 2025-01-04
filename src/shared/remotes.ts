import Log from "@rbxts/log";
import { BroadcastAction } from "@rbxts/reflex";
import { Client, createRemotes, namespace, remote, Server } from "@rbxts/remo";
import { t } from "@rbxts/t";
import { SerializedSharedState } from "./store";

export const remotes = createRemotes({
    store: namespace({
        dispatch: remote<Client, [actions: BroadcastAction[]]>(),
        hydrate: remote<Client, [state: SerializedSharedState]>(),
        start: remote<Server>(),
    }),

    // save: namespace({
    //     cardAdded: remote<Client, [card: string]>(t.string),
    // }),
})