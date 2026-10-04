package ritm.engine

import java.time.Instant

enum class StreakStatus { NEW, ACTIVE, BROKEN }

data class StreakState(
    val links: Int = 0,
    val bestLinks: Int = 0,
    val rhythmDays: Int = 3,
    val deadlineAt: Instant? = null,
    val freezes: Int = 1,
    val level: Int = 1,
    val status: StreakStatus = StreakStatus.NEW,
    // звенья "в пути": оплачен, но не доставлен
    val pendingOrderIds: Set<String> = emptySet(),
)

data class Outcome(
    val state: StreakState,
    val effects: List<Effect> = emptyList(),
)
