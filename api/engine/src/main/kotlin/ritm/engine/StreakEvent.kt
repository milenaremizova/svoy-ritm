package ritm.engine

import java.time.Instant

sealed interface StreakEvent {
    val at: Instant

    data class OrderPaid(val orderId: String, override val at: Instant) : StreakEvent
    data class OrderDelivered(val orderId: String, override val at: Instant) : StreakEvent
    data class OrderCancelled(val orderId: String, override val at: Instant) : StreakEvent
    data class Tick(override val at: Instant) : StreakEvent
}
