import {  useState } from "react";



export interface RectConfig {
    width: number;
    height: number;
    originX: number;
    originY: number;
    scale: number;
}

export interface AnimationClipPathConfig {
    rect1: RectConfig;
    rect2: RectConfig;
    rect3: RectConfig
}

export enum Mod {
    "none",
    "invertX",
    "invertY",
    "invertXY",
}

export default function useClipPathConfig(isEven: boolean, mod: Mod, isVisible: boolean): AnimationClipPathConfig {
    // we want to change returned config exactly when isVisible changes.
    // Don't work with useEffect or useMemo, instead refer to this pattern:
    // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
    const [prevVisible, setPrevVisible] = useState(isVisible);
    const [config, setConfig] = useState(getConfig());

    function random() {
        const min = 0.98;
        const max = 1.18;
        return Math.random() * (max - min) + min;
    }

    function modX(v: number) {
        if (mod === Mod.invertX || mod === Mod.invertXY) {
            return 1 - v;
        }

        return v;
    }

    function modY(v: number) {
        if (mod === Mod.invertY || mod === Mod.invertXY) {
            return 1 - v;
        }

        return v;
    }

    function getConfig() {
        return isEven
            ? {
                  rect1: {
                      scale: 0.3 * 0.6 * random(),
                      width: 1.2,
                      height: 1,
                      originX: 0.15 * random(),
                      originY: 0,
                  },
                  rect2: {
                      scale: 0.15 * 0.6 * random(),
                      width: 0.8,
                      height: 2,
                      originX: modX(0.58),
                      originY: modY(0.3),
                  },
                  rect3: {
                      scale: 0.15 * 0.6 * random(),
                      width: 2.2,
                      height: 1,
                      originX: modX(0.7),
                      originY: modY(0.77),
                  },
              }
            : {
                  rect1: {
                      scale: 0.2 * 0.6 * random(),
                      width: 1.7,
                      height: 1,
                      originX: modX(0.4),
                      originY: modX(0),
                  },
                  rect2: {
                      scale: 0.25 * 0.6 * random(),
                      width: 1.3,
                      height: 1.4,
                      originX: modX(0.4),
                      originY: modY(0.5),
                  },
                  rect3: {
                      scale: 0.1 * 0.6 * random(),
                      width: 1.5,
                      height: 1.6,
                      originX: modX(0.74),
                      originY: modY(0.4),
                  },
              };
    }

    if (isVisible === prevVisible) {
        return config;
    }

    // Update state during render!
    setPrevVisible(isVisible);
    setConfig(getConfig());
    return config;
}
