CREATE TABLE users (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    timezone TEXT NOT NULL DEFAULT 'Europe/Moscow'
);

CREATE TABLE orders (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    total_kopecks BIGINT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('paid', 'delivered', 'cancelled')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE streaks (
    user_id UUID PRIMARY KEY REFERENCES users(id),
    links INT NOT NULL DEFAULT 0,
    best_links INT NOT NULL DEFAULT 0,
    rhythm_days INT NOT NULL DEFAULT 3,
    deadline_at TIMESTAMPTZ,
    freezes INT NOT NULL DEFAULT 1,
    level INT NOT NULL DEFAULT 1,
    min_order_kopecks BIGINT,
    goal_links INT,
    goal_deadline_at TIMESTAMPTZ,
    status TEXT NOT NULL DEFAULT 'new',
    version INT NOT NULL DEFAULT 1
);

CREATE TABLE streak_events (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    order_id UUID REFERENCES orders(id),
    type TEXT NOT NULL,
    payload JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (order_id, type)
);

CREATE TABLE coin_ledger (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    amount INT NOT NULL,
    reason TEXT NOT NULL,
    ref_id UUID NOT NULL UNIQUE
);
