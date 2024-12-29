import { renderApp } from "./ui/app";

export namespace UIService {
    let isMounted : boolean = false;

    export function remount() {
        renderApp();
        isMounted = true;
    }
}