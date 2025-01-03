import { Players } from "@rbxts/services";

export const GAME_NAME = "Card Wars";

export const USER_ID = Players.LocalPlayer ? Players.LocalPlayer.UserId : 0;
export const USER_NAME = Players.LocalPlayer ? Players.LocalPlayer.Name : "(server)";