import { useReducer, type ReactNode } from "react";
import { applyEvent, createInitialState } from "../engine/applyEvent";
import { StreakContext } from "./context";

const INITIAL_NOW = "2026-10-07T09:00:00+03:00";

export function StreakProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(applyEvent, INITIAL_NOW, createInitialState);
    return (
        <StreakContext.Provider value={{state, dispatch}}>
            {children}
        </StreakContext.Provider>
    );
}