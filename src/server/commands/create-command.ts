import { Players, RunService } from "@rbxts/services";

import { getTextChatCommands } from "./utils";

const ADMINS = new ReadonlySet([
	151381226, // @Enracer
]);

export async function createCommand(alias: string, handler: (player: Player, argument: string) => void) {
	const container = await getTextChatCommands();
	const command = new Instance("TextChatCommand");

	command.Triggered.Connect((origin, unfilteredText) => {
		const player = Players.GetPlayerByUserId(origin.UserId);

		if (player && (ADMINS.has(origin.UserId) || RunService.IsStudio())) {
			const argument = unfilteredText.sub(2 + alias.size());
			handler(player, argument);
		}
	});

	command.Name = `GameCommand_${alias}`;
	command.PrimaryAlias = alias;
	command.Parent = container;
}