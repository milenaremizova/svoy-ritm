export type StreakState = {
    now: string;
    stops: number;
    bestStopsLine: number;
    personalRhythmDays: number;
    deadlineAt: string | null;
    freezesForStreak: number;
    levelForIncrease: 1 | 2;
    status: StreakStatus;
    faster: boolean;
    pendingOrder: PendingOrder | null;
    orderHistory: OrderRecord[];
    selectedGoalStops: number | null;
    selectedGoalDeadlineAt: string | null;
    wallet: number;
    lastEventType: LastEventType;
    lastReward: number;
    log: string[];
};

export type StreakPossibleEvent = 
| { type: "PLACE_ORDER"; total: number } 
| { type: "DELIVERY" } 
| { type: "CANCEL" } 
| { type: "ADVANCE_TIME"; hours: number } 
| { type: "SET_GOAL"; stops: number } 
| { type: "TOGGLE_FASTER" } 
| { type: "RESET" };

export type StreakStatus = "new" | "active" | "broken";

export type PendingOrder = {
    id: string;
    total: number;
    placedAt: string;
};

export type OrderRecord = {
    id: string;
    total: number;
    deliveredAt: string;
};

export type LastEventType = "stop-added" | "below-threshold" | "freeze-applied" | "broken" | "cancelled" | null;