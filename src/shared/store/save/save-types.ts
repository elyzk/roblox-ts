import { t } from "@rbxts/t";

export interface PlayerSave {
    readonly cards: readonly string[];
}

export const defaultPlayerSave: PlayerSave = {
    cards: [],
}

export const playerSaveSchema: t.check<PlayerSave> = t.interface({
    cards: t.array(t.string),
})