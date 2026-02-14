import { useState, useCallback, useEffect } from 'react';
import { Match, TournamentSettings } from '@/types/beach-tennis';
import { matchService } from '@/services/matchService';
import { toast } from 'sonner';

export const useMatchScore = (matchId: string, initialMatch: Match, settings?: TournamentSettings) => {
    const [match, setMatch] = useState<Match>(initialMatch);
    const [history, setHistory] = useState<Match[]>([]);

    const gamesToWin = settings?.gamesPerSet || 6;
    const isNoAd = settings?.noAd ?? true;

    // Sync with Firebase updates
    useEffect(() => {
        setMatch(initialMatch);
    }, [initialMatch]);

    const updateMatchState = useCallback(async (newMatch: Match) => {
        setHistory(prev => [...prev, match].slice(-10));
        setMatch(newMatch);

        try {
            await matchService.update(matchId, newMatch);
        } catch (error) {
            setMatch(match);
            toast.error("Erro ao sincronizar placar.");
        }
    }, [match, matchId]);

    const addPoint = useCallback((team: 'teamA' | 'teamB') => {
        if (match.status === 'finished') return;

        const newMatch = { ...match };
        const pointsMap: Record<string | number, string | number> = {
            0: 15,
            15: 30,
            30: 40,
            40: 'Game'
        };

        const currentPoints = team === 'teamA' ? newMatch.pointsA : newMatch.pointsB;
        const opponentPoints = team === 'teamA' ? newMatch.pointsB : newMatch.pointsA;

        let nextPoints = pointsMap[currentPoints];

        // Handle No-Ad (Ponto de Ouro)
        if (isNoAd && currentPoints === 40 && opponentPoints === 40) {
            nextPoints = 'Game';
        }

        if (nextPoints === 'Game') {
            // Team won the game
            if (team === 'teamA') {
                newMatch.setsA += 1;
            } else {
                newMatch.setsB += 1;
            }

            // Reset points
            newMatch.pointsA = 0;
            newMatch.pointsB = 0;
            newMatch.serving = newMatch.serving === 'teamA' ? 'teamB' : 'teamA';

            toast.success(`Game para ${team === 'teamA' ? 'Dupla A' : 'Dupla B'}!`);

            // Check if match finished
            if (newMatch.setsA >= gamesToWin || newMatch.setsB >= gamesToWin) {
                // In a pro-set, we might need a 2-game lead, but usually it's just first to 6.
                // For now, let's keep it simple as "first to gamesToWin".
                toast.success("Partida concluída no placar!");
            }
        } else {
            if (team === 'teamA') {
                newMatch.pointsA = nextPoints;
            } else {
                newMatch.pointsB = nextPoints;
            }
        }

        updateMatchState(newMatch);
    }, [match, updateMatchState, gamesToWin, isNoAd]);

    const toggleServing = useCallback(() => {
        const newMatch = { ...match, serving: match.serving === 'teamA' ? 'teamB' : 'teamA' as 'teamA' | 'teamB' };
        updateMatchState(newMatch);
    }, [match, updateMatchState]);

    const undo = useCallback(() => {
        if (history.length === 0) return;
        const previousState = history[history.length - 1];
        setHistory(prev => prev.slice(0, -1));
        setMatch(previousState);
        matchService.update(matchId, previousState);
        toast.info("Última ação desfeita.");
    }, [history, matchId]);

    return {
        match,
        addPoint,
        toggleServing,
        undo,
        canUndo: history.length > 0
    };
};
