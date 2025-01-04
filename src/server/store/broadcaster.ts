import Log from "@rbxts/log";
import { createBroadcaster, createBroadcastReceiver, ProducerMiddleware } from "@rbxts/reflex";
import { Events } from "server/network";
import { remotes } from "shared/remotes";
import { slices } from "shared/store";

export function broadcasterMiddleware(): ProducerMiddleware {
    const broadcaster = createBroadcaster({
        producers: slices,
        dispatch: (player, actions) => {
            remotes.store.dispatch(player, actions);
        }
    });

    remotes.store.start.connect((player) => {
        broadcaster.start(player);
    })

    return broadcaster.middleware;
}
