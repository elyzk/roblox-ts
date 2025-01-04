import { CombineStates } from "@rbxts/reflex";
import { saveSlice } from "./save/save-slice";
import { createBinarySerializer } from "@rbxts/flamework-binary-serializer";

export type SharedState = CombineStates<typeof slices>
export type SerializedSharedState = ReturnType<typeof stateSerDes.serialize>;

export const stateSerDes = createBinarySerializer<SharedState>();

export const slices = {
    saves: saveSlice,
}