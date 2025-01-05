import { store } from "client/store";
import { RemProvider, RemProviderProps } from "./rem-provider";
import { ReflexProvider } from "@rbxts/react-reflex";
import React from "@rbxts/react";

export function RootProvider({baseRem, remOverride, children}: RemProviderProps) {
    return (
        <ReflexProvider producer={store}>
            <RemProvider baseRem={baseRem} remOverride={remOverride}>
                {children}
            </RemProvider>
        </ReflexProvider>
    );
}