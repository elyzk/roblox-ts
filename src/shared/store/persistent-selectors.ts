import { createSelector } from "@rbxts/reflex";
import { SharedState } from ".";
import { PlayerData } from "./default-data";

export function selectPlayerCards(playerId: string) {
    return (state: SharedState) => state.persistent.cards[playerId];
}

export function selectPlayerData(playerId: string): (state: SharedState) => PlayerData | undefined {
    return createSelector(
        selectPlayerCards(playerId),
        (cards): PlayerData | undefined => {
            if (!cards) {
                return undefined;
            }
            return {
                cards,
            };
        },
    );
}