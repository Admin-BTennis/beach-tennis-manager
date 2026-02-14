import { useState, useEffect } from 'react';
import { ArenaHeader } from '@/components/ArenaHeader';
import { ArenaCourtCard } from '@/components/ArenaCourtCard';
import { ResultsTicker } from '@/components/ResultsTicker';
import { useCourtData } from '@/hooks/useCourtData';
import { Clock } from 'lucide-react';
import { TournamentBrackets } from '@/components/matches/TournamentBrackets';
import { GroupStandings } from '@/components/matches/GroupStandings';
import { tournamentService } from '@/services/tournamentService';
import { matchService } from '@/services/matchService';
import { Tournament, Match } from '@/types/beach-tennis';

const ArenaPanel = () => {
  const { courts, results } = useCourtData();
  const [activeTournament, setActiveTournament] = useState<Tournament | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Filter courts by active tournament and 'em_jogo' status
  const ongoingCourts = courts.filter(c =>
    c.status === 'em_jogo' &&
    activeTournament &&
    c.tournamentId === activeTournament.id
  );

  // Fetch active tournament and matches
  useEffect(() => {
    const unsubTournament = tournamentService.subscribe((tournaments) => {
      const active = tournaments.find(t => t.status === 'active') || tournaments[0];
      setActiveTournament(active);
    });
    return () => unsubTournament();
  }, []);

  useEffect(() => {
    if (activeTournament) {
      const unsubMatches = matchService.subscribeByTournament(activeTournament.id, setMatches);
      return () => unsubMatches();
    }
  }, [activeTournament]);

  // Automatic Switcher (Carousel)
  useEffect(() => {
    if (ongoingCourts.length <= 1) {
      setActiveIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % ongoingCourts.length);
    }, 8000); // 8 seconds per match
    return () => clearInterval(interval);
  }, [ongoingCourts.length]);

  const getGridClass = () => {
    const count = courts.length;
    if (count === 1) return "max-w-4xl mx-auto flex items-center justify-center h-full";
    if (count <= 4) return "grid grid-cols-1 md:grid-cols-2 gap-6 h-full content-center";
    return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto pr-2 custom-scrollbar";
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-white overflow-hidden font-inter">
      {/* Header */}
      <ArenaHeader tournamentName={activeTournament?.name || 'Beach Tennis Manager'} />

      {/* Main Content with Transition */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8 pb-32 overflow-hidden relative">
        {ongoingCourts.length > 0 ? (
          <div className="w-full max-w-5xl h-full flex flex-col items-center justify-center relative">
            {ongoingCourts.map((court, idx) => (
              <div
                key={court.id}
                className={`transition-all duration-1000 absolute w-full flex justify-center
                  ${idx === activeIndex
                    ? 'opacity-100 scale-100 translate-x-0 z-10'
                    : 'opacity-0 scale-95 translate-x-32 z-0 pointer-events-none'}`}
              >
                <div className="w-full scale-110 sm:scale-125 lg:scale-150">
                  <ArenaCourtCard
                    court={court}
                    isHighlighted={true}
                  />
                </div>
              </div>
            ))}

            {/* Pagination Indicators - Only if > 1 */}
            {ongoingCourts.length > 1 && (
              <div className="absolute -bottom-12 flex gap-3">
                {ongoingCourts.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-3 rounded-full transition-all duration-500 
                                ${idx === activeIndex ? 'bg-primary w-12' : 'bg-white/10 w-3'}`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-6 text-center animate-in fade-in duration-1000">
            <div className="w-24 h-24 rounded-full border-4 border-dashed border-primary/20 flex items-center justify-center">
              <Clock className="w-10 h-10 text-primary/40 animate-pulse" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">Aguardando Próxima Partida</h2>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-2">Os jogos iniciados pelos árbitros aparecerão aqui</p>
            </div>
          </div>
        )}
      </main>

      {/* Results Ticker */}
      <ResultsTicker results={results} />
    </div>
  );
};

export default ArenaPanel;

