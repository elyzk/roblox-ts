import { CardData } from "client/data/card"
import { Card } from "./card";
import React from "@rbxts/react";
// Graphical representation of a list of cards

interface CollectedCardsProps {
    cards: CardData[]
}

export function CollectedCards(props: CollectedCardsProps) {
    const selected = false;
    const cards = props.cards.map((card, i) => {
        let yOffset = 0.85;
        let xOffset = 1/(props.cards.size() + 1) * (i+1);
        return <Card name={card.name} position={new UDim2(xOffset, 0, yOffset, 0)}/>
    });
    return (
        cards
    );
}