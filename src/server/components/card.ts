import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import Log from "@rbxts/log";
import { store } from "server/store";
import { USER_ID } from "shared/constants";
import { selectPlayerSaveById } from "shared/store/save/save-selectors";

@Component({ tag: "card" })
export class Card extends BaseComponent implements OnStart {
	hit: boolean = false;

	onStart(): void {
        store.subscribe(selectPlayerSaveById(tostring(USER_ID)), data => {
            Log.Info("Player save changed");
        })
	}
}
