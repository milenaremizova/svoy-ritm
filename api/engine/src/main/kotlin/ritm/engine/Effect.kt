package ritm.engine

sealed interface Effect {
    data class LinkAdded(val linkNumber: Int) : Effect
    data class Reward(val amount: Int) : Effect
    data class FreezeUsed(val freezesLeft: Int) : Effect
    data object Broken : Effect
    data class LevelUp(val level: Int) : Effect
}
