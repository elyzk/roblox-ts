import {Service, OnStart, OnInit} from "@flamework/core"
import { Players, CollectionService } from "@rbxts/services"
import { ServerEvents } from "server/network";

@Service({})
export class PlayerInitialize implements OnStart, OnInit {
    onInit() {}

    onStart() {
        print("Player init");
        let isMoving : boolean = false;
        Players.PlayerAdded.Connect((player: Player) => {
            CollectionService.AddTag(player, "Player_Tag");
           
        })
    }

    kickPlayer(player: Player) {
        player.Kick();
    }
}