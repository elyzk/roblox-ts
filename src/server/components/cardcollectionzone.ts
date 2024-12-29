import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { RunService } from "@rbxts/services";

@Component(
    {tag: "card-collection-zone"}
)
export class CardCollectionZone extends BaseComponent implements OnStart {
    // Ensures a zone can only be touched once
    // For now this is good, later I want to be able to go on and off it
    hit: boolean = false;

    onStart(): void {
        assert(this.instance.IsA("BasePart"), "Zone must be attached to a BasePart");
        
        this.instance.Touched.Connect((hit: BasePart) => {
            if (this.hit) return;

            if (hit.Parent!.FindFirstChild("Humanoid")) {
                this.hit = true;
            }
        })
    }
}