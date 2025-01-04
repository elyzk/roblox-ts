import { createBroadcastReceiver, ProducerMiddleware } from "@rbxts/reflex";
import { Events } from "client/network";
import { remotes } from "shared/remotes";

export function receiverMiddleware(): ProducerMiddleware {
    const receiver = createBroadcastReceiver({
        start: () => {
            remotes.store.start.fire();
        }
    });

    remotes.store.dispatch.connect((actions) => {
        receiver.dispatch(actions)
    });

    return receiver.middleware;
}