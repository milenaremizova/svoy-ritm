import type { OrderRecord, StreakPossibleEvent, StreakState } from "./types";

export const START_FREEZES = 1; // заморозок на старте новой серии
export const MAX_FREEZES = 2; // больше двух не копится
export const FREEZE_GRANTED_AT_STOP = 7; // на 7-м звене дают вторую
export const LEVEL2_FROM_STOP = 7; // со 2-го уровня появляется порог суммы
export const LEVEL2_SHARE_OF_MEDIAN = 0.5; // порог = 50% медианного чека
export const REWARD_MIN = 15;
export const REWARD_MAX = 40;
export const MILESTONE_STOPS = [3, 7, 14]; // вехи с крупной наградой
export const MILESTONE_BONUS = 40;
export const REWARD_CAP_SHARE = 0.12; // награда не больше 12% от суммы заказа
export const DEFAULT_RHYTHM_DAYS = 3;
export const MIN_RHYTHM_DAYS = 2;
export const MAX_RHYTHM_DAYS = 7;
export const HISTORY_SIZE = 5;
export const MIN_ORDERS_FOR_RHYTHM = 3;

const DAY_MS = 24 * 60 * 60 * 1000;

function recordOfBest(state: StreakState, stops: number): number {
    return Math.max(state.bestStopsLine, stops);
};

function pushLog(state: StreakState, line: string): string[] {
    return [
        line,
        ...state.log
    ].slice(0, 6);
}

function fmtTime(iso: string): string {
    return new Date(iso).toLocaleString("ru-RU", {
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function createInitialState(now: string): StreakState {
  return {
    now,
    stops: 0,
    bestStopsLine: 0,
    personalRhythmDays: DEFAULT_RHYTHM_DAYS,
    deadlineAt: null,
    freezesForStreak: START_FREEZES,
    levelForIncrease: 1,
    status: "new",
    faster: false,
    pendingOrder: null,
    orderHistory: [],
    selectedGoalStops: null,
    selectedGoalDeadlineAt: null,
    wallet: 4000,
    lastEventType: null,
    lastReward: 0, 
    log: []
  };
};

function clampNumber(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
};

function median(values: number[]): number {
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
};

function seedFraction(seed: string): number {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = (hash * 31 + seed.charCodeAt((i))) >>> 0;
    };
    return (hash % 1000) / 1000;
};


function computeRhythmDays(history: OrderRecord[]): number {
    if (history.length < MIN_ORDERS_FOR_RHYTHM) return DEFAULT_RHYTHM_DAYS;
    const sorted = [...history].sort((a,b) => Date.parse(a.deliveredAt) - Date.parse(b.deliveredAt));
    const gaps: number[] = [];
    for (let i = 0; i < sorted.length; i++) {
        gaps.push((Date.parse(sorted[i].deliveredAt) - Date.parse(sorted[i].deliveredAt)) / DAY_MS);
    };
    return clampNumber(Math.round(median(gaps)), MIN_RHYTHM_DAYS, MAX_RHYTHM_DAYS);
};

function medianOrderTotal(history: OrderRecord[]): number {
    if (history.length === 0) return 0;
    return median(history.map((order) => order.total));
};

function computeReward(orderId: string, levelForIncrease: 1 | 2, stops: number, total: number): number {
    const base = REWARD_MIN + Math.round(seedFraction(orderId) * (REWARD_MAX - REWARD_MIN));
    const milestoneBonus = MILESTONE_STOPS.includes(stops)
    ? MILESTONE_BONUS
    : 0;

    const levelMultiplier = levelForIncrease === 2
    ? 1.5
    : 1;

    const raw = Math.round(base * levelMultiplier) + milestoneBonus;
    const cap = Math.max(REWARD_MIN, Math.round(total * REWARD_CAP_SHARE));
    return Math.min(raw, cap);
};

function applyFreeze(state: StreakState, deadlineAt: string): StreakState {
    const newDeadline = new Date(Date.parse(deadlineAt) + state.personalRhythmDays * DAY_MS).toISOString();
    return {
        ...state,
        freezesForStreak: state.freezesForStreak - 1,
        deadlineAt: newDeadline,
        lastEventType: "freeze-applied"
    };
};
    
function breakStreak(state: StreakState): StreakState {
    return {
        ...state, 
        status: "broken",
        bestStopsLine: recordOfBest(state, state.stops),
        stops: 0,
        freezesForStreak: START_FREEZES,
        levelForIncrease: 1,
        deadlineAt: null,
        selectedGoalStops: null,
        pendingOrder: null,
        lastEventType: "broken",
    }
};

function settle(state: StreakState): StreakState {
    const { deadlineAt } = state;
    if (!deadlineAt || state.status !== "active") return state;
    if (Date.parse(state.now) <= Date.parse(deadlineAt)) return state;

    return state.freezesForStreak > 0 ? applyFreeze(state, deadlineAt) : breakStreak(state);
};

export function applyEvent(prev: StreakState, event: StreakPossibleEvent): StreakState {
    const state = settle(prev);

    switch (event.type) {
        case "PLACE_ORDER" : {
            const id = `o${Date.parse(state.now)}`;
            return {
            ...state,
            pendingOrder: { id, total: event.total, placedAt: state.now },
            lastEventType: null,
            log: pushLog(state, `${fmtTime(state.now)} ORDER_PAID - остановка в пути`),
          };
        }
        case "CANCEL": {
            if (!state.pendingOrder) return state;
            return {
                ...state,
                pendingOrder: null,
                lastEventType: "cancelled",
                log: pushLog(state, `${fmtTime(state.now)} ORDER_CANCELLED - заказ отменён`),
            };
        }

        case "DELIVERY": {
            const order = state.pendingOrder;
            if (!order) return state;

            const willBeLevel2 = state.stops + 1 >= LEVEL2_FROM_STOP;
            if (willBeLevel2) {
                const threshold = medianOrderTotal(state.orderHistory) * LEVEL2_SHARE_OF_MEDIAN;
                if (threshold > 0 && order.total < threshold) {
                    return { ...state, pendingOrder: null, lastEventType: "below-threshold", lastReward: 0 };
                }
            }

            const newStops = state.stops + 1;
            const history = [
                { id: order.id, total: order.total, deliveredAt: state.now },
                ...state.orderHistory,
            ].slice(0, HISTORY_SIZE);


            const personalRhythmDays = computeRhythmDays(history);
            const windowDays = state.faster
            ? Math.max(MIN_RHYTHM_DAYS, personalRhythmDays - 1)
            : personalRhythmDays;

            const deadlineAt = new Date(Date.parse(state.now) + (windowDays + 1) * DAY_MS).toISOString();
            const levelForIncrease: 1 | 2 = newStops >= LEVEL2_FROM_STOP - 1
            ? 2
            : 1;

            const reward = computeReward(order.id, levelForIncrease, newStops, order.total);
            const grantsFreeze = newStops === FREEZE_GRANTED_AT_STOP;

            return {
                ...state,
                status: "active",
                stops: newStops,
                bestStopsLine: recordOfBest(state, newStops),
                personalRhythmDays,
                deadlineAt,
                levelForIncrease,
                freezesForStreak: grantsFreeze ? Math.min(MAX_FREEZES, state.freezesForStreak + 1) : state.freezesForStreak,
                orderHistory: history,
                pendingOrder: null,
                wallet: state.wallet + reward,
                lastEventType: "stop-added",
                lastReward: reward,
            };
        }

        case "ADVANCE_TIME": {
            const now = new Date(Date.parse(state.now) + event.hours * 60 * 60 * 1000).toISOString();
            return settle({ ...state, now });
        }

        case "SET_GOAL": {
            const stepsLeft = Math.max(1, event.stops);
            const selectedGoalDeadlineAt = new Date(Date.parse(state.now) + stepsLeft * state.personalRhythmDays * DAY_MS).toISOString();
            return {
                ...state,
                selectedGoalStops: event.stops,
                selectedGoalDeadlineAt,
                log: pushLog(state, `${fmtTime(state.now)} цель - ${event.stops} остановок`),
            };
        }

        case "TOGGLE_FASTER": 
            return { ...state, faster: !state.faster };

        case "RESET": 
            return createInitialState(state.now);

        default:
            return state;
    }
};
