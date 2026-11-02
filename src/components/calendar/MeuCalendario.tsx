import React from 'react';
import { DayPicker } from 'react-day-picker';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';

interface MeuCalendarioProps {
  onSelectDate: (date: Date) => void;
  className?: string;
}

const botaoNav =
  "flex size-9.5 cursor-pointer items-center justify-center rounded-[5px] border-[1.5px] border-gray-100 bg-white text-luna-teal transition-all duration-200 hover:border-gray-200 hover:bg-gray-50 4xl:size-14 4xl:rounded-lg";

export default function MyCalendar({ onSelectDate, className = "" }: MeuCalendarioProps) {
  const [selected, setSelected] = React.useState<Date>(new Date());

  return (
    <div
      className={`relative flex w-full max-w-91 flex-col rounded-[20px] bg-white px-3! pt-4! pb-14! font-sans shadow-[0_10px_40px_rgba(0,0,0,0.08)] sm:px-6! 3xl:max-w-112 4xl:max-w-170 4xl:rounded-4xl 4xl:px-10! 4xl:pt-7! 4xl:pb-24! ${className}`}
    >
      <DayPicker
        mode="single"
        required
        selected={selected}
        onSelect={setSelected}
        locale={ptBR}
        showOutsideDays
        components={{
          Chevron: ({ orientation }) =>
            orientation === 'left'
              ? <ChevronLeft className="size-5 4xl:size-8" />
              : <ChevronRight className="size-5 4xl:size-8" />,
        }}
        classNames={{
          root: "w-full",
          months: "block",
          month: "block",
          nav: "absolute inset-x-3 top-3.5 flex justify-between sm:inset-x-6 4xl:inset-x-10 4xl:top-7",
          button_previous: botaoNav,
          button_next: botaoNav,
          month_caption: "flex items-center justify-center py-2.5! text-[15px] font-bold text-gray-900 capitalize 3xl:text-lg 4xl:py-4! 4xl:text-3xl",
          month_grid: "w-full table-fixed border-separate border-spacing-y-1.5 4xl:border-spacing-y-3",
          weekday: "h-8 text-xs font-medium text-gray-400 capitalize 3xl:text-sm 4xl:h-14 4xl:text-xl",
          day: "h-10 p-0! text-center align-middle 4xl:h-17",
          day_button:
            "mx-auto! flex size-8 cursor-pointer items-center justify-center rounded-full border-none bg-transparent font-sans text-xs text-gray-700 transition-colors duration-200 hover:bg-gray-100 sm:size-9 3xl:size-10 3xl:text-sm 4xl:size-15 4xl:text-2xl",
          today:
            "[&>button]:bg-[#004d4d] [&>button]:font-bold [&>button]:text-luna-peach [&>button]:hover:bg-[#004d4d]",
          selected:
            "[&>button]:bg-[#004d4d] [&>button]:font-semibold [&>button]:text-white! [&>button]:hover:bg-[#004d4d]",
          outside: "opacity-80 [&>button]:text-gray-300",
        }}
      />

      <button
        type="button"
        aria-label="Adicionar evento na data selecionada"
        className="absolute right-4 bottom-2.5 flex h-[35px] w-20 cursor-pointer items-center justify-center rounded-lg border-none bg-luna-teal shadow-[0_4px_10px_rgba(0,77,77,0.2)] transition-all duration-200 hover:-translate-y-px hover:bg-[#003d3d] 4xl:right-7 4xl:bottom-5 4xl:h-14 4xl:w-32 4xl:rounded-xl"
        onClick={() => onSelectDate(selected)}
      >
        <CalendarDays color="white" className="size-5 4xl:size-8" />
      </button>
    </div>
  );
}