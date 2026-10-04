package ritm.engine

import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.assertEquals
import java.time.Instant

class ApplyEventTest {

    @Test
    fun `delivered order adds a link`() {
        val t0 = Instant.parse("2026-10-07T14:00:00Z")
        val afterPaid = applyEvent(StreakState(), StreakEvent.OrderPaid("o1", t0)).state
        val outcome = applyEvent(afterPaid, StreakEvent.OrderDelivered("o1", t0.plusSeconds(1200)))

        assertEquals(1, outcome.state.links)
    }
}
