import React from "react";

import { useEffect, useRef, useState } from "react";

import brutal1 from "../images/brutal1.jpg";
import brutal2 from "../images/brutal2.jpg";
import brutal3 from "../images/brutal3.jpg";
import PuzzleContainer from "./PuzzleContainer";

export type PuzzleDimensions = { width: number; height: number };

const autoRotateIntervalMs = 2500;

export default function Puzzle() {
    const images: string[] = [brutal1, brutal2, brutal3, brutal1, brutal2, brutal3];
    const numSlides = images.length;
    const ref = useRef<HTMLDivElement>(null);
    const [activeSlide, setActiveSlide] = useState(0);
    const [dimensions, setDimensions] = useState<PuzzleDimensions | undefined>(undefined);
    const [clickHappened, setClickHappened] = useState(false);

    function modulo(n: number, m: number) {
        // will deal correctly with negative numbers, unlike the "%" operator
        return ((n % m) + m) % m;
    }

    function onLeftClick() {
        setClickHappened(true);
        setActiveSlide(modulo(activeSlide - 1, numSlides));
    }

    function onRightClick() {
        setClickHappened(true);
        setActiveSlide(modulo(activeSlide + 1, numSlides));
    }

    useEffect(() => {
        if (clickHappened) {
            return;
        }

        const interval = setInterval(() => {
            if (clickHappened) {
                return;
            }
            setActiveSlide(modulo(activeSlide + 1, numSlides));
        }, autoRotateIntervalMs);

        return () => clearInterval(interval);
    }, [activeSlide, clickHappened, numSlides]);

    useEffect(() => {
        function handleResize() {
            if (!ref.current) {
                return;
            }
            setDimensions({ width: ref.current.clientWidth, height: ref.current?.clientHeight });
        }

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <div
                ref={ref}
                className={"aspect-image h-[66vh]"}
            >
                {!!dimensions && (
                    <>
                        <div className={"grid h-full grid-cols-2 grid-rows-1"}>
                            <PuzzleContainer
                                images={images}
                                activeSlide={activeSlide}
                                dimensions={dimensions}
                            />
                            <div
                                onClick={onLeftClick}
                                className={"hover:cursor-left-arrow z-30 col-start-1 row-start-1 h-full"}
                            />
                            <div
                                onClick={onRightClick}
                                className={"hover:cursor-right-arrow z-30 col-start-2 row-start-1 h-full"}
                            />
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
