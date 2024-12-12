import { OnStart } from "@flamework/core"
import { Component, BaseComponent } from "@flamework/components";
import { CollectionService, Players, Workspace } from "@rbxts/services";
import { ServerEvents } from "server/network";
import { GlobalEvents } from "shared/network";
import { ClientEvents } from "client/network";

interface Attributes {
    isLoaded: boolean,
    isMoving: boolean,
}

@Component({
    tag: "Player_Tag",
    defaults: {
        isLoaded: false,
        isMoving: false,
    },
})
export class PlayerComponent extends BaseComponent<Attributes, Player> implements OnStart {
    onStart() {
        if (this.instance) {
            this.attributes.isLoaded = true;
            this.instance.CharacterAdded.Connect((model: Model) => {
                let humanoidRootPart : Part = model.WaitForChild("HumanoidRootPart") as Part;
                let humanoid : Humanoid = model.WaitForChild("Humanoid") as Humanoid;
                humanoid.GetPropertyChangedSignal("MoveDirection").Connect(() => {
                    if (humanoid.MoveDirection.Magnitude > 0) {
                        this.attributes.isMoving = true;
                    }
                    if (humanoid.MoveDirection.Magnitude === 0) {
                        this.attributes.isMoving = false;
                    }
                }) 
                coroutine.wrap(() => this.trackMovement(humanoidRootPart))();
                this.isTouchingKicker(humanoidRootPart);
            })
        }
    }

    trackMovement(humanoidRootPart : Part) {
        while (wait(1)) {
            if (this.attributes.isMoving) {
                // print(humanoidRootPart.Position);
            }
        }
    }

    isTouchingKicker(humanoidRootPart: Part) {
        let kicker: Part = Workspace.WaitForChild("Kicker") as Part;
        kicker.Touched.Connect((otherPart: BasePart) => {
            if (otherPart === humanoidRootPart) {
                let player = Players.GetPlayerFromCharacter(humanoidRootPart.Parent);
                player?.Kick();
            }
        })
    }
}