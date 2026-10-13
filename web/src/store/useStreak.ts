import { useContext } from "react";
import { StreakContext } from "./context";

export function useStreak() {
    const ctx = useContext(StreakContext);
    if (!ctx) throw new Error("useStreak должен вызываться внутри <StreakProvider>");
    return ctx;
}