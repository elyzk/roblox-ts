import { createBroadcastReceiver, ProducerMiddleware } from "@rbxts/reflex";
import { Events } from "client/network";
import { remotes } from "shared/remotes";
import { stateSerDes } from "shared/store";

export function receiverMiddleware(): ProducerMiddleware {
    const receiver = createBroadcastReceiver({
        start: () => {
            remotes.store.start.fire();
        }
    });

    remotes.store.dispatch.connect((actions) => {
        receiver.dispatch(actions)
    });

    remotes.store.hydrate.connect((state) => {
		receiver.hydrate(stateSerDes.deserialize(state.buffer, state.blobs));
	});

    return receiver.middleware;
}