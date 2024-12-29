import {Service, OnStart, OnInit} from "@flamework/core"
import { Players, CollectionService, PhysicsService } from "@rbxts/services"
import { ServerEvents } from "server/network";

@Service({})
export class CharacterController implements OnStart, OnInit {
    onInit() {}

    onStart() {
        PhysicsService.RegisterCollisionGroup("game-players");
        PhysicsService.CollisionGroupSetCollidable("game-players", "game-players", false);
        // PhysicsService.CollisionGroupSetCollidable("game-players", "card-collection-zone", true);
    }
}