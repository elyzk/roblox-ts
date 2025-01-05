import { hoarcekat } from "@rbxts/pretty-react-hooks";
import React from "@rbxts/react";
import { Card } from "../components/cards/card";

export = hoarcekat(() => {
    return (
        <Card position={new UDim2(0.5,0,0.5,0)} name={"Card"} onSelected={() => {}} selected={0}/>
    )
})