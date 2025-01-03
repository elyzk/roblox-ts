import Log from "@rbxts/log";
import { SharedState } from "..";

export const selectPlayerSaves = (state: SharedState) => {
    return state.saves;
}

export const selectPlayerSaveById = (id: string) => {
    return (state: SharedState) => state.saves[id];
}

export const selectPlayerCards = (id: string) => {
    return (state: SharedState) => state.saves[id]?.cards;
}