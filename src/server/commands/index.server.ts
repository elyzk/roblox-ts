import { store } from "server/store";
import { createCommand } from "./create-command";

createCommand("/cards", (player, argument) => {
	store.getPlayerSave(`${player.UserId}`);
});
