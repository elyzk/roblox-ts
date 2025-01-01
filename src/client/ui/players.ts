import { UIService } from "./uiservice";
import { BaseComponent } from "@flamework/components";
import { Controller, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";

@Controller()
export class CharacterController extends BaseComponent implements OnStart {
    onStart(): void {
        Players.LocalPlayer.WaitForChild("PlayerGui");
        UIService.remount();
    }
}