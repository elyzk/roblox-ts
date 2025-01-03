import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import Log from "@rbxts/log";

@Component({ tag: "card" })
export class Card extends BaseComponent implements OnStart {
	hit: boolean = false;

	onStart(): void {
	}
}
