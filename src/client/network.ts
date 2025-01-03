import { Networking } from "@flamework/networking";
import { GlobalEvents, GlobalFunctions } from "shared/network";

// It is recommended that you create these in separate server/client files,
// which will avoid exposing server configuration (including type guards) to the client.
export const Events = GlobalEvents.createClient({});
export const Functions = GlobalFunctions.createClient({});