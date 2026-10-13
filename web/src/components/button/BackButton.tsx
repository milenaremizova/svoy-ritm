// обертка без стилей, взята готовая кнопка баттон и добавлена свг иконка, чтобы не копировать ее в четыре экрана

import { Button } from "./Button";

export function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <Button type="button" variant="icon" onClick={onClick} aria-label="Назад">
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M15 5 L8 12 L15 19" fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Button>
  );
}