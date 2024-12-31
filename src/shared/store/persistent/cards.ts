import { createProducer } from "@rbxts/reflex";
import { PlayerCards, PlayerData } from "../default-data"

export type CardsState = Readonly<Record<string, PlayerCards | undefined>>

const initialState: CardsState = {};

export const cardsSlice = createProducer(initialState, {
    closePlayerData: (state, playerId: string): CardsState => {
        return {
            ...state,
            [playerId]: undefined,
        }
    },

    loadPlayerData: (state, playerId: string, data: PlayerData): CardsState => {
		return {
			...state,
			[playerId]: data.cards,
		};
	},

    /**
     * 
     */
    addCard: (state, playerId: string, cardId: number): CardsState => {
        const cards = state[playerId];
        return {
            ...state,
            [playerId]: cards && {
                ...cards,
                ids: [...cards.ids, cardId],
            },
        };
    },
});