package ritm.engine

/**
 * Чистое ядро «Своего ритма». Без базы, без Ktor, без Instant.now() —
 * время приходит вместе с событием. Подробные правила 1–9 — в документе
 * с концепцией; здесь только каркас, который предстоит реализовать.
 */
fun applyEvent(state: StreakState, event: StreakEvent): Outcome = when (event) {
    is StreakEvent.OrderPaid -> TODO("звено переходит в статус «в пути»")
    is StreakEvent.OrderDelivered -> TODO("звено засчитано: LinkAdded + Reward, пересчёт ритма и дедлайна")
    is StreakEvent.OrderCancelled -> TODO("убрать заказ из pending, звено не засчитывается")
    is StreakEvent.Tick -> TODO("проверить дедлайн: FreezeUsed либо Broken")
}
