import { CombineStates } from "@rbxts/reflex";
import { persistentSlice } from "./persistent";

export type SharedState = CombineStates<typeof slices>

export const slices = {
    persistent: persistentSlice,
}