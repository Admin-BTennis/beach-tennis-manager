import { MatchResult } from '@/types/beach-tennis';

interface ResultsTickerProps {
  results: MatchResult[];
}

export const ResultsTicker = ({ results }: ResultsTickerProps) => {
  if (results.length === 0) return null;

  const tickerContent = results.map((result, index) => (
    <span key={index} className="inline-flex items-center mx-8">
      <span className="font-bold text-primary">{result.courtName}:</span>
      <span className="ml-2 text-white">{result.teamANames}</span>
      <span className="mx-2 font-black text-[#CEFD03]">{result.scoreA}-{result.scoreB}</span>
      <span className="text-white">{result.teamBNames}</span>
    </span>
  ));

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-[#020617]/95 backdrop-blur-xl border-t border-white/5 overflow-hidden z-50 shadow-2xl">
      <div className="py-2.5">
        <div className="flex items-center">
          <span className="bg-[#CEFD03] text-black px-4 py-1.5 text-[10px] font-black uppercase shrink-0 tracking-widest italic ml-4 rounded-sm">
            Últimos Resultados
          </span>
          <div className="overflow-hidden flex-1">
            <div className="ticker-animation whitespace-nowrap flex items-center h-full">
              <div className="flex text-white font-medium text-xs uppercase tracking-tight antialiased">
                {tickerContent}
                {tickerContent}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
