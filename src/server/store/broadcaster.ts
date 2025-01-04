import Log from "@rbxts/log";
import { createBroadcaster, createBroadcastReceiver, ProducerMiddleware } from "@rbxts/reflex";
import { Players } from "@rbxts/services";
import { Events } from "server/network";
import { remotes } from "shared/remotes";
import { SerializedSharedState, SharedState, slices, stateSerDes } from "shared/store";

export function broadcasterMiddleware(): ProducerMiddleware {
    const hydrated = new Set<number>();

    const broadcaster = createBroadcaster({
        producers: slices,
        dispatch: (player, actions) => {
            remotes.store.dispatch(player, actions);
        },
        hydrate: (player, state) => {
            // This is not getting fired afaik
			remotes.store.hydrate.fire(player, state as unknown as SerializedSharedState);
		},
        beforeHydrate: (player, state) => {
            // The cast is necessary due to the typings of the reflex library.
            const serialized = stateSerDes.serialize(state) as unknown as SharedState;
    
            const isInitialHydrate = !hydrated.has(player.UserId);
            if (!isInitialHydrate) {
                return serialized;
            }
    
            hydrated.add(player.UserId);
            return serialized;
		},
    });

    remotes.store.start.connect((player) => {
        broadcaster.start(player);
    })

    Players.PlayerRemoving.Connect((player) => {
        hydrated.delete(player.UserId);
    })

    return broadcaster.middleware;
}
