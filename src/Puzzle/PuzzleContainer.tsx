import { useEffect, useState } from "react";


import React from "react";
import { PuzzleDimensions } from "./Puzzle";
import { Mod } from "./useClipPathConfig";
import PuzzleAnimation from "./PuzzleAnimation";

export interface PuzzleContainerProps {
    activeSlide: number;
    dimensions: PuzzleDimensions;
    images: string[];
}

export default function PuzzleContainer(props: PuzzleContainerProps) {
    const [muted, setMuted] = useState(true);

    useEffect(() => {
        setTimeout(() => setMuted(false));
    }, []);

    function getRandomMod(): Mod {
        const enumIndexes = Object.values(Mod).filter((v) => !isNaN(Number(v)));
        return Math.floor(Math.random() * enumIndexes.length);
    }

    return (
        <>
            {props.images.map((image, index) => (
                <PuzzleAnimation
                    key={index}
                    index={index}
                    dimensions={props.dimensions}
                    isVisible={index === props.activeSlide}
                    muted={muted}
                    mod={getRandomMod()}
                >
                    <div className={"h-[66vh] w-full"}>
                        <img
                            className={"object-cover h-full w-full"}
                            src={image}
                            alt={"demo image"}
                        />
                    </div>
                </PuzzleAnimation>
            ))}
        </>
    );
}
