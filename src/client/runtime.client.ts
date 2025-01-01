import { Flamework, Modding } from "@flamework/core";
import Log, { Logger } from "@rbxts/log";
import { GAME_NAME } from "shared/constants";
import { setupLogger } from "shared/functions/setup-logger";
import { UIService } from "./ui/uiservice";

function start(): void {
   setupLogger();

   Log.Info(`${GAME_NAME} client version: ${game.PlaceVersion}`);

   Modding.registerDependency<Logger>(ctor => Log.ForContext(ctor));

   Flamework.addPaths("src/client")
   
   Log.Info(`Flamework ignite!`);

   Flamework.ignite();

   UIService.remount();
}

start();
