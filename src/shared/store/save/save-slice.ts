import { createProducer } from "@rbxts/reflex";
import { PlayerSave } from "./save-types";
import { mapProperty } from "shared/utils/object-utils";
import Log from "@rbxts/log";

export interface SaveState {
    readonly [id: string]: PlayerSave | undefined;
}

const initialState: SaveState = {};

export const saveSlice = createProducer(initialState, {
    setPlayerSave: (state, player: string, save: PlayerSave) => {
        return {
            ...state,
		    [player]: save,
        }
	},

	deletePlayerSave: (state, player: string) => ({
		...state,
		[player]: undefined,
	}),

    givePlayerCard: (state, player: string, card: string) => {
        return mapProperty(state, player, (save) => ({
			...save,
			skins: [...save.cards, card],
		}));
    },

    getPlayerSave: (state, player: string) => {
        state[player]?.cards.forEach((card) => {
            Log.Info(`card: ${card}`);
        })
        // Log.Info(`ards are: ${state[player]?.cards}`);
        return state;
    }

    // closePlayerData: (state, playerId: string): CardsState => {
    //     return {
    //         ...state,
    //         [playerId]: undefined,
    //     }
    // },

    // loadPlayerData: (state, playerId: string, data: PlayerData): CardsState => {
    //     return {
	// 		...state,
	// 		[playerId]: data.cards,
	// 	};
	// },

    
    // addCard: (state, playerId: string, cardId: number): CardsState => {
    //     const cards = state[playerId];
    //     return {
    //         ...state,
    //         [playerId]: cards && {
    //             ...cards,
    //             ids: [...cards.ids, cardId],
    //         },
    //     };
    // },
});