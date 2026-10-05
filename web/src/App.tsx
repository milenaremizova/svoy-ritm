import { StreakProvider } from "./store/StreakProvider";
import { useStreak } from "./store/useStreak";

function WalletCheck() {
  const { state } = useStreak();
  return <p>Кошелёк: {state.wallet}</p>;
}

export default function App() {
  return (
    <StreakProvider>
      <WalletCheck />
    </StreakProvider>
  );
}
