import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Players, RunService } from "@rbxts/services";
import { DatastoreService } from "server/services/player-data-service";

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
				print("Zone touched");
				const playerObj = Players.GetPlayerFromCharacter(humanoid.Parent);

				
			}
		});
	}
}
