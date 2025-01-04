import { store } from "server/store";
import { createCommand } from "./create-command";
import { selectPlayerCards } from "shared/store/save/save-selectors";
import Log from "@rbxts/log";

createCommand("/give", (player, argument) => {
	store.givePlayerCard(player.Name, argument);
});

createCommand("/get", (player, argument) => {
	store.getState(selectPlayerCards(player.Name))?.forEach((card) => {
		Log.Info(`Cards: ${card}`)
	});
})

createCommand("/delete", (player, argument) => {
	// store.deletePlayerSave(player.Name); // I don't know why this doesn't work
	store.setPlayerSave(player.Name, {cards: []});
})
