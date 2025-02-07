import { Flamework, Modding } from "@flamework/core";
import Log, { Logger } from "@rbxts/log";
import { GAME_NAME, USER_ID } from "shared/constants";
import { setupLogger } from "shared/functions/setup-logger";
import { store } from "./store";
import { Players } from "@rbxts/services";
import { createApp } from "./ui/create-app";

function start(): void {
   setupLogger();

   Log.Info(`${GAME_NAME} client version: ${game.PlaceVersion}`);

   Modding.registerDependency<Logger>(ctor => Log.ForContext(ctor));

   Flamework.addPaths("src/client")

   Flamework.ignite();

   createApp().catch(() => {
		Log.Fatal(`Failed to create React app!`);
	});
}

start();
