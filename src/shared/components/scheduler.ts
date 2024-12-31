import { BaseComponent } from "@flamework/components";
import { Controller, Modding, OnStart, Service } from "@flamework/core";
import { Players } from "@rbxts/services";

export interface OnPlayerJoined {
	onPlayerJoined(player: Player): void;
}

export interface OnPlayerLeaving {
	onPlayerLeaving(player: Player): void;
}

@Service()
@Controller()
export class PlayerJoinService extends BaseComponent implements OnStart {
	onStart() {
		const listeners = new Set<OnPlayerJoined>();

		Modding.onListenerAdded<OnPlayerJoined>((object) => listeners.add(object));
		Modding.onListenerRemoved<OnPlayerJoined>((object) => listeners.delete(object));

		Players.PlayerAdded.Connect((player) => {
			for (const listener of listeners) {
				task.spawn(() => listener.onPlayerJoined(player));
			}
		});

		for (const player of Players.GetPlayers()) {
			for (const listener of listeners) {
				task.spawn(() => listener.onPlayerJoined(player));
			}
		}
	}
}

@Service()
@Controller()
export class PlayerLeaveService extends BaseComponent implements OnStart {
	onStart() {
		const listeners = new Set<OnPlayerLeaving>();

		Modding.onListenerAdded<OnPlayerLeaving>((object) => listeners.add(object));
		Modding.onListenerRemoved<OnPlayerLeaving>((object) => listeners.delete(object));

		Players.PlayerRemoving.Connect((player) => {
			for (const listener of listeners) {
				task.spawn(() => listener.onPlayerLeaving(player));
			}
		});

		for (const player of Players.GetPlayers()) {
			for (const listener of listeners) {
				task.spawn(() => listener.onPlayerLeaving(player));
			}
		}
	}
}
