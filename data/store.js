import { writable } from "svelte/store";

export const R = writable(220);
export const G = writable(180);
export const B = writable(130);
export const name1 = writable("player1");
export const name2 = writable("player2");
export const current_player = writable(0);
export const game = writable({});
export const columns = 20;
export const rows = 20;
export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
