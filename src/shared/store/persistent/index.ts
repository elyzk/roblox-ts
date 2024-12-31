import { combineProducers } from "@rbxts/reflex";
import { cardsSlice } from "./cards";

export const persistentSlice = combineProducers({
    cards: cardsSlice,
})