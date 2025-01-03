import { CombineStates } from "@rbxts/reflex";
import { saveSlice } from "./save/save-slice";

export type SharedState = CombineStates<typeof slices>

export const slices = {
    saves: saveSlice,
}