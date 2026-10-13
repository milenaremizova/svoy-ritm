import { createContext } from "react";
import type { StreakPossibleEvent, StreakState } from "../engine/types";

export type StreakContextValue = {
    state: StreakState;
    dispatch: (event: StreakPossibleEvent) => void;
};

export const StreakContext = createContext<StreakContextValue | null>(null);