import Log from "@rbxts/log";
import { BroadcastAction } from "@rbxts/reflex";
import { Client, createRemotes, namespace, remote, Server } from "@rbxts/remo";
import { t } from "@rbxts/t";

export const remotes = createRemotes({
    store: namespace({
        dispatch: remote<Client, [actions: BroadcastAction[]]>(),
        start: remote<Server>(),
    }),

    save: namespace({
        cardAdded: remote<Client, [card: string]>(t.string),
    }),
})

remotes.store.start.connect(() => {
    Log.Info("Client start event fired");
})

remotes.store.dispatch.connect(() => Log.Info("Client received dispatch"));