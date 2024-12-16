import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";

// This would be a physical part associated with a card
@Component({tag: "card"})
export class Card extends BaseComponent implements OnStart {
    constructor() {
        super();
    }

    onStart(): void {
        // throw new Error("Method not implemented.");
    }
}