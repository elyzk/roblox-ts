export interface PlayerData {
    readonly cards: PlayerCards;
}

export interface PlayerCards {
    readonly ids: number[];
}

export const defaultPlayerData: PlayerData = {
    cards: {ids: []},
}