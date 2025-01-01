import { renderApp } from "./app";

export namespace UIService {
    let isMounted : boolean = false;

    export function remount() { // I think this runs twice. Why?
        renderApp();
        isMounted = true;
    }
}