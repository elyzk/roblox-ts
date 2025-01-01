import { Service } from "@flamework/core";
import { Collection, createCollection, Document } from "@rbxts/lapis";
import { Players, RunService } from "@rbxts/services";import { defaultPlayerData, PlayerData } from "shared/store/default-data";
import { validate } from "./validate-data";
import { store } from "server/store";
import { selectPlayerData } from "shared/store/persistent-selectors";
import PlayerRemovalService from "server/player/player-removal-service";
import { Logger } from "@rbxts/log";
import KickCode from "types/kick-reason";

const documents = new Map<string, Document<{ cards: number }>>();
const DATA_STORE_NAME = RunService.IsStudio() ? "dev" : "prod";


@Service()
export default class PlayerDataService {
	private readonly collection: Collection<PlayerData>
	
	constructor(
		private readonly logger: Logger,
		private readonly playerRemovalService: PlayerRemovalService,
	) {
		this.collection = createCollection(DATA_STORE_NAME, {
            defaultData: defaultPlayerData,
			validate, // try this with @rbxts/t instead?
        });
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
			this.logger.Warn(`Failed to load data for ${player.UserId}: ${err}`);
			this.playerRemovalService.removeForBug(player, KickCode.PlayerProfileUndefined);
		}
	}
}

export namespace DatastoreService {
	export function addCard(player: Player, name: string) {
		const old = getDocuments(player).read();
		getDocuments(player).write({ cards: old.cards + 1 });
	}

	export function getDocuments(player: Player): Document<{ cards: number }> {
		return documents.get(`${player.UserId}`)!;
	}
}
