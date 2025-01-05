import { Flamework, Modding } from "@flamework/core";
import Log, { Logger } from "@rbxts/log";
import { GAME_NAME } from "shared/constants";
import { setupLogger } from "shared/functions/setup-logger";

// Flamework.addPaths("src/server/components");
// Flamework.addPaths("src/server/services");
// Flamework.addPaths("src/shared/components");

// Flamework.ignite();

function start(): void {
	setupLogger();

	Log.Info(`${GAME_NAME} is starting up! Version: ${game.PlaceVersion}`);

	Modding.registerDependency<Logger>(ctor => Log.ForContext(ctor));

	Flamework.addPaths("src/server");

	Flamework.ignite();
}

start();