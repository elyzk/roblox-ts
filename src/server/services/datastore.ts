import { BaseComponent } from "@flamework/components";
import { Service } from "@flamework/core";
import { Collection, CollectionOptions, createCollection, Document } from "@rbxts/lapis";
import { DataStoreService, Players, RunService } from "@rbxts/services";
import { t } from "@rbxts/t";
import { OnPlayerJoined, OnPlayerLeaving } from "shared/components/scheduler";
import { defaultPlayerData, PlayerData } from "shared/store/default-data";
import { validate } from "./validate-data";
import { store } from "server/store";
import { selectPlayerData } from "shared/store/persistent-selectors";

const documents = new Map<string, Document<{ cards: number }>>();
const DATA_STORE_NAME = RunService.IsStudio() ? "dev" : "prod";


@Service()
export class _DatastoreService extends BaseComponent implements OnPlayerJoined, OnPlayerLeaving {
	private readonly collection: Collection<PlayerData>
	
	constructor() {
		super();
		this.collection = createCollection(DATA_STORE_NAME, {
            defaultData: defaultPlayerData,
			validate, // try this with @rbxts/t instead?
        });
	}

	onPlayerJoined(player: Player): void {
		this.getCards(player);
	}

	onPlayerLeaving(player: Player): void {
		// documents.get(`${player.UserId}`)!.save(); // this should always exist b/c we add document on player join
		// documents.delete(`${player.UserId}`);
	}

    /**
	 * Loads the player data for the given player.
	 *
	 * @param player - The player to load data for.
	 * @returns The player data document if it was loaded successfully.
	 */
	public async loadPlayerData(player: Player): Promise<Document<PlayerData> | void> {
		try {
			const document = await this.collection.load(`${player.UserId}`, [player.UserId]);

			if (!player.IsDescendantOf(Players)) {
				await document.close();
				return;
			}

			const unsubscribe = store.subscribe(selectPlayerData(tostring(player.UserId)), data => {
				if (data) {
					document.write(data);
				}
			});

			document.beforeClose(() => {
				unsubscribe();
				store.closePlayerData(tostring(player.UserId));
			});

			store.loadPlayerData(tostring(player.UserId), document.read());

			return document;
		} catch (err) {
			print(`Failed to load data for ${player.UserId}`);
			// this.logger.Warn(`Failed to load data for ${player.UserId}: ${err}`);
			// this.playerRemovalService.removeForBug(player, KickCode.PlayerProfileUndefined);
		}
	}

	getCards(player: Player) {
		// const playerDocument = await this.loadPlayerData(player);
		// if (!playerDocument) return;
		// print(playerDocument.read());
		this.loadPlayerData(player).then((document) =>{
			if (!document) return;
			print(document.read());
		}
		)
	}
}

export namespace DatastoreService {
	// export function getCards(player: Player) {
	// 	const playerDocument =  _DatastoreService.loadPlayerData(player);
	// }

	// Idk if this should be here.
	// could do generateCard() somewhere else and just have an addCard() that takes a known card
	// export function generateCard(player: Player) {

	// }

	export function addCard(player: Player, name: string) {
		const old = getDocuments(player).read();
		getDocuments(player).write({ cards: old.cards + 1 });
	}

	export function getDocuments(player: Player): Document<{ cards: number }> {
		return documents.get(`${player.UserId}`)!;
	}
}
