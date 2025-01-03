import { Service } from "@flamework/core";
import { Collection, createCollection, Document } from "@rbxts/lapis";
import { Players, RunService } from "@rbxts/services";
import { store } from "server/store";
import PlayerRemovalService from "server/player/player-removal-service";
import Log, { Logger } from "@rbxts/log";
import KickCode from "types/kick-reason";
import { defaultPlayerSave, PlayerSave, playerSaveSchema } from "shared/store/save/save-types";
import { selectPlayerSaveById } from "shared/store/save/save-selectors";

const documents = new Map<string, Document<{ cards: number }>>();
const DATA_STORE_NAME = RunService.IsStudio() ? "dev" : "prod";


@Service()
export default class PlayerDataService {
	private readonly collection: Collection<PlayerSave>
	
	constructor(
		private readonly logger: Logger,
		private readonly playerRemovalService: PlayerRemovalService,
	) {
		this.collection = createCollection(DATA_STORE_NAME, {
            defaultData: defaultPlayerSave,
			validate: playerSaveSchema, // try this with @rbxts/t instead?
        });
	}

    /**
	 * Loads the player data for the given player.
	 *
	 * @param player - The player to load data for.
	 * @returns The player data document if it was loaded successfully.
	 */
	public async loadPlayerSave(player: Player): Promise<Document<PlayerSave> | void> {
		try {
			const document = await this.collection.load(`${player.UserId}`, [player.UserId]);

			if (!player.IsDescendantOf(Players)) {
				await document.close();
				return;
			}

			const unsubscribe = store.subscribe(selectPlayerSaveById(tostring(player.UserId)), data => {
				if (data) {
					document.write(data);
				}
			});

			document.beforeClose(() => {
				unsubscribe();
				store.deletePlayerSave(tostring(player.UserId));
			});
			
			Log.Info(`Setting player save to loaded document with ${document.read().cards.size()} cards`);
			store.setPlayerSave(tostring(player.UserId), document.read());

			return document;
		} catch (err) {
			this.logger.Warn(`Failed to load data for ${player.UserId}: ${err}`);
			this.playerRemovalService.removeForBug(player, KickCode.PlayerProfileUndefined);
		}
	}
}