import { Janitor } from "@rbxts/janitor";
import { Document } from "@rbxts/lapis";
import { PlayerData } from "shared/store/default-data";

export default class PlayerEntity {
    /** The player's username */
    public readonly name: string;
    /** The player's id as a string */
    public readonly userId: string;

    constructor(
        public readonly player: Player,
        public readonly janitor: Janitor,
        public readonly document: Document<PlayerData>
    ) {
        this.name = player.Name;
        this.userId = tostring(player.UserId)
    }
}