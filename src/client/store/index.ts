import { combineProducers, InferState } from "@rbxts/reflex";
import { slices } from "shared/store";
import { receiverMiddleware } from "./receiver";

export type RootStore = typeof store;
export type RootState = InferState<RootStore>;

export function createStore(): typeof store {
    const store = combineProducers({
        ...slices,
    });

    store.applyMiddleware(receiverMiddleware());

    return store;
}

/**
 * The Reflex store for the application.
 *
 * @see https://littensy.github.io/reflex/
 */
export const store = createStore();