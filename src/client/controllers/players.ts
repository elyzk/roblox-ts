import { UIService } from "./uiservice";
import { BaseComponent } from "@flamework/components";
import { Controller, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";

@Controller()
export class CharacterController extends BaseComponent implements OnStart {
    onStart(): void {
        print("Player started");
        // Players.LocalPlayer.WaitForChild("PlayerGui"); // is this necessary?
        UIService.mount();
    }
}