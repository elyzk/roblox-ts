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
        return state;
    }
});