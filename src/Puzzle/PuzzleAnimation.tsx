import { motion } from "framer-motion";

import { ReactNode } from "react";
import useClipPathConfig, { AnimationClipPathConfig, Mod } from "./useClipPathConfig";
import { PuzzleDimensions } from "./Puzzle";
import PuzzleAnimationRect from "./PuzzleAnimationRect";
import React from "react";

const backgroundScaleFactor = 1.1;

export interface PuzzleBackgroundProps {
    children: ReactNode;
    dimensions: PuzzleDimensions;
    index: number;
    muted?: boolean;
    isVisible: boolean;
    mod: Mod;
}

export default function PuzzleAnimation(props: PuzzleBackgroundProps) {
    const { dimensions } = props;
    const times = [0, 0.45, 0.55, 1];
    const duration = props.muted ? 0 : 0.8;
    const clipId = `PuzzleSlide-svgClip-${props.index}`;
    const isEven = props.index % 2 === 0;
    const clipPathConfig: AnimationClipPathConfig = useClipPathConfig(isEven, props.mod, props.isVisible);

    return (
        <motion.div
            className={"col-span-2 col-start-1 row-start-1 h-full"}
            animate={
                props.isVisible
                    ? {
                          zIndex: 20,
                      }
                    : {
                          zIndex: 10,
                      }
            }
            transition={{ times, duration, delay: duration / 2 }}
        >
            <div
                className={"col-start-1 row-start-1 h-full overflow-hidden"}
                style={{ clipPath: `url(#${clipId})` }}
            >
                <motion.div
                    style={{ height: "100%" }}
                    animate={
                        props.isVisible
                            ? {
                                  scale: [1, backgroundScaleFactor, backgroundScaleFactor, 1],
                              }
                            : {
                                  scale: [1, backgroundScaleFactor, backgroundScaleFactor, backgroundScaleFactor],
                              }
                    }
                    transition={{
                        duration: duration,
                        times: times,
                        ease: ["linear"],
                    }}
                >
                    {props.children}
                </motion.div>

                <svg
                    width="0"
                    height="0"
                >
                    <defs>
                        <clipPath id={clipId}>
                            <PuzzleAnimationRect
                                isVisible={props.isVisible}
                                dimensions={dimensions}
                                rectConfig={clipPathConfig.rect1}
                                times={times}
                                duration={duration}
                            />

                            <PuzzleAnimationRect
                                isVisible={props.isVisible}
                                dimensions={dimensions}
                                rectConfig={clipPathConfig.rect2}
                                times={times}
                                duration={duration}
                            />

                            <PuzzleAnimationRect
                                isVisible={props.isVisible}
                                dimensions={dimensions}
                                rectConfig={clipPathConfig.rect3}
                                times={times}
                                duration={duration}
                            />
                        </clipPath>
                    </defs>
                </svg>
            </div>
        </motion.div>
    );
}
