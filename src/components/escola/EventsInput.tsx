import { Trash2 } from 'lucide-react';

interface Evento {
  description: string;
  date: string;
}

interface EventsListProps {
  events: Evento[];
  onDelete: (index: number) => void;
  className?: string;
}

export default function EventsList({ events, onDelete, className = "" }: EventsListProps) {
  return (
    <div
      className={`flex h-auto max-h-full min-h-35 w-full max-w-87.5 flex-col rounded-[10px] bg-white p-2.5! font-sans shadow-[0_10px_30px_rgba(0,0,0,0.1)] lg:h-39 lg:max-h-none xl:h-45 min-[1600px]:h-55 3xl:max-w-112 3xl:h-64 4xl:max-w-170 4xl:rounded-2xl 4xl:p-5! ${className}`}
    >
      <h3 className="mb-5! text-base font-bold text-luna-teal 3xl:text-lg 4xl:mb-8! 4xl:text-3xl">EVENTOS</h3>

      <div className="flex-1 overflow-y-auto pr-1.5! [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-[10px] [&::-webkit-scrollbar-thumb]:bg-luna-teal [&::-webkit-scrollbar-track]:bg-[#f1f1f1] 4xl:[&::-webkit-scrollbar]:w-2.5">
        {events.map((event, index) => (
          <div
            key={index}
            className="mb-4! flex items-start justify-between gap-4 overflow-hidden rounded-lg border-l-[6px] border-luna-teal bg-white p-4! shadow-[0_4px_12px_rgba(0,0,0,0.08)] 4xl:mb-6! 4xl:gap-6 4xl:rounded-xl 4xl:border-l-[10px] 4xl:p-6!"
          >
            <p className="min-w-0 flex-1 text-sm leading-snug font-semibold text-black [overflow-wrap:anywhere] 3xl:text-base 4xl:text-2xl">
              {event.description}
            </p>

            <div className="flex shrink-0 flex-col items-end justify-between gap-2.5 4xl:gap-4">
              <span className="text-xs font-medium text-luna-teal 3xl:text-sm 4xl:text-xl">
                {new Date(event.date + "T00:00:00").toLocaleDateString('pt-BR')}
              </span>

              <button
                type="button"
                aria-label="Excluir evento"
                className="cursor-pointer border-none bg-transparent p-1.25! text-luna-teal transition-opacity duration-200 hover:opacity-70"
                onClick={() => onDelete(index)}
              >
                <Trash2 className="size-[18px] 4xl:size-8" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}