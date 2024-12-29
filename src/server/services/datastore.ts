import { BaseComponent } from "@flamework/components";
import { Service } from "@flamework/core";
import { Collection, CollectionOptions, createCollection, Document } from "@rbxts/lapis";
import { t } from "@rbxts/t";
import { OnPlayerJoined, OnPlayerLeaving } from "shared/components/scheduler";

// TODO: collection type
let collection: Collection<{}>
let documents = new Map<string, Document<{}>>();

@Service()
class _DatastoreService extends BaseComponent implements OnPlayerJoined, OnPlayerLeaving{
    constructor() {
        super();
        collection = createCollection("data-dev-1", {
            validate: t.strictInterface({}),
            defaultData: {},
        } as CollectionOptions<{}>);
    }

    onPlayerJoined(player: Player): void {
        collection.load(`${player.UserId}`).then((document) => {
            documents.set(`${player.UserId}`, document)
        })
    }

    onPlayerLeaving(player: Player): void {
        documents.get(`${player.UserId}`)!.save(); // this should always exist b/c we add document on player join
        documents.delete(`${player.UserId}`);
    }
}

export namespace DatastoreService {
    export function getCards(player: Player) {
        let document;
        // Wait to load document
        while (!document) {
            document = documents.get(`${player.UserId}`)!;
            wait(0.1);
        }
        // return document.read().
    }

    // Idk if this should be here.
    // could do generateCard() somewhere else and just have an addCard() that takes a known card
    export function generateCard(player: Player) {
        
    }
}
