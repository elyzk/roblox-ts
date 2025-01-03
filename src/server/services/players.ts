import {Service, OnStart, OnInit} from "@flamework/core"
import Log, { Logger } from "@rbxts/log";
import { store } from "server/store"
import { USER_ID } from "shared/constants";
import { selectPlayerSaveById } from "shared/store/save/save-selectors";

@Service({})
export class SubscriptionService implements OnStart {
    constructor(
        private readonly logger: Logger,
    ) {}
    onStart() {
        store.subscribe(selectPlayerSaveById(`${USER_ID}`), (save, lastSave) => {
                    this.logger.Info(`Player save updated`);
                })
    }
}