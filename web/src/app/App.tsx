import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StreakProvider } from "../store/StreakProvider";
import { DevPanel } from "../components/DevPanel";
import { PhoneFrame } from "../components/PhoneFrame";
import { Home } from "../screens/Home";
import { Cart } from "../screens/Cart";
import { Delivered } from "../screens/Delivered";
import { GoalChoice } from "../screens/GoalChoice";
import { Rhythm } from "../screens/Rhythm";
import styles from "./App.module.css";

export default function App() {
  return (
    <StreakProvider>
      <BrowserRouter>
        <div className={styles.stage}>
          <PhoneFrame>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/rhythm" element={<Rhythm />} />
              <Route path="/goal" element={<GoalChoice />} />
              <Route path="/delivered" element={<Delivered />} />
            </Routes>
          </PhoneFrame>
        </div>
        <DevPanel />
      </BrowserRouter>
    </StreakProvider>
  );
}
