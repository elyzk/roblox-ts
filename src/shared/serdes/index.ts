// import { SharedState } from "shared/store";
// // import { CandyState } from "shared/store/candy";
// // import { SnakesState } from "shared/store/snakes";

// // import { deserializeCandy, serializeCandy } from "./handlers/serdes-candy";
// // import { deserializeSnakes, serializeSnakes } from "./handlers/serdes-snake";

// export interface SharedStateSerialized {
// 	// candy?: string;
// 	// snakes?: string;
// }

// interface SharedStateForSerdes {
// 	// cards?: CardsState;
// }

// // Store the last serialized state to avoid unnecessary re-computations
// let lastSerialized: SharedStateSerialized | undefined;

// export function serializeState(state: SharedStateForSerdes, includeCandy = true): SharedStateSerialized {
// 	// if (state.candy === lastCandy && state.snakes === lastSnakes) {
// 		return lastSerialized!;
// 	// }

// 	// const serialized = {
// 	// 	...state,
// 	// 	// candy: state.candy && includeCandy ? serializeCandy(state.candy) : undefined,
// 	// 	// snakes: state.snakes && serializeSnakes(state.snakes),
// 	// };

// 	// lastSerialized = serialized;
// 	// // lastCandy = state.candy;
// 	// // lastSnakes = state.snakes;

// 	// return serialized;
// }

// export function deserializeState(state: SharedStateSerialized): SharedStateForSerdes {
// 	// return {
// 	// 	...state,
// 	// 	// candy: state.candy !== undefined ? deserializeCandy(state.candy) : undefined,
// 	// 	// snakes: state.snakes !== undefined ? deserializeSnakes(state.snakes) : undefined,
// 	// };
//     return state;
// }