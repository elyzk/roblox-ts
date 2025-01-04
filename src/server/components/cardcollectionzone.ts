import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import Log from "@rbxts/log";
import { Players, RunService } from "@rbxts/services";
import { store } from "server/store";
import { USER_ID } from "shared/constants";
import { selectPlayerSaveById } from "shared/store/save/save-selectors";

@Component({ tag: "card-collection-zone" })
export class CardCollectionZone extends BaseComponent implements OnStart {
	hit: boolean = false;

	onStart(): void {
		assert(this.instance.IsA("BasePart"), "Zone must be attached to a BasePart");
		this.instance.Touched.Connect((hit: BasePart) => {
			if (this.hit) return;

			const humanoid = hit.Parent!.FindFirstChild("Humanoid");
			if (humanoid) {
				this.hit = true;
				const player = Players.GetPlayerFromCharacter(humanoid.Parent);

				if (!player) return;

			store.setPlayerSave(player.Name, {cards: ["cheese", "fire", "snow", "water"]});
			}
		});
	}
}
