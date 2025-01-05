import { hoarcekat } from "@rbxts/pretty-react-hooks";
import React from "@rbxts/react";
import { ErrorPage } from "../components/error-handler/error-page";

export = hoarcekat(() => {
    return (
        <>
            <ErrorPage message="Hello" />
        </>
    )
})