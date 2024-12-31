import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Players, RunService } from "@rbxts/services";
import { DatastoreService } from "server/services/datastore";

@Component({ tag: "card-collection-zone" })
export class CardCollectionZone extends BaseComponent implements OnStart {
	// Ensures a zone can only be touched once
	// For now this is good, later I want to be able to go on and off it
	hit: boolean = false;

	onStart(): void {
		assert(this.instance.IsA("BasePart"), "Zone must be attached to a BasePart");

		this.instance.Touched.Connect((hit: BasePart) => {
			if (this.hit) return;

			const humanoid = hit.Parent!.FindFirstChild("Humanoid");
			if (humanoid) {
				this.hit = true;
				print("Zone touched");
				const playerObj = Players.GetPlayerFromCharacter(humanoid.Parent);
				DatastoreService.addCard(playerObj as Player, "test");
			}
		});
	}
}
