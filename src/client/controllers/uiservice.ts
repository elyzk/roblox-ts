import { renderApp } from "./ui/app";

export namespace UIService {
    let isMounted : boolean = false;

    export function mount() {
        print("Mounting ui");
        if (!isMounted) {
            renderApp();
            isMounted = true;
        }
    }
}