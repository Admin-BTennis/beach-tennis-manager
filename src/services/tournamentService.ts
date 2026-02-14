import { db } from "@/lib/firebase";
import { Tournament } from "@/types/beach-tennis";
import { ref, push, set, onValue, query, orderByChild, update, get, equalTo } from "firebase/database";

const DB_PATH = "tournaments";

export const tournamentService = {
    create: async (tournament: Omit<Tournament, "id" | "createdAt" | "status">) => {
        const tournamentsRef = ref(db, DB_PATH);
        const newTournamentRef = push(tournamentsRef);
        const newTournament: Tournament = {
            ...tournament,
            id: newTournamentRef.key!,
            status: 'planning',
            type: tournament.type,
            createdAt: Date.now(),
        };
        await set(newTournamentRef, newTournament);
        return newTournamentRef.key;
    },

    subscribe: (callback: (data: Tournament[]) => void) => {
        const tournamentsRef = query(ref(db, DB_PATH), orderByChild("createdAt"));
        return onValue(tournamentsRef, (snapshot) => {
            const data = snapshot.val();
            const tournaments: Tournament[] = data
                ? (Object.values(data) as Tournament[]).sort((a, b) => b.createdAt - a.createdAt) // Newest first
                : [];
            callback(tournaments);
        });
    },

    update: async (id: string, data: Partial<Tournament>) => {
        const tournamentRef = ref(db, `${DB_PATH}/${id}`);
        await update(tournamentRef, data);
    },

    delete: async (id: string) => {
        const updates: Record<string, any> = {};

        // 1. Prepare matches for deletion (Using server-side query)
        const matchesRef = ref(db, "matches");
        const matchesSnapshot = await get(query(matchesRef, orderByChild("tournamentId"), equalTo(id)));
        if (matchesSnapshot.exists()) {
            Object.keys(matchesSnapshot.val()).forEach(matchId => {
                updates[`matches/${matchId}`] = null;
            });
        }

        // 2. Prepare courts for deletion
        const courtsRef = ref(db, "courts");
        const courtsSnapshot = await get(query(courtsRef, orderByChild("tournamentId"), equalTo(id)));
        if (courtsSnapshot.exists()) {
            Object.keys(courtsSnapshot.val()).forEach(courtId => {
                updates[`courts/${courtId}`] = null;
            });
        }

        // 3. Prepare results for deletion
        const resultsRef = ref(db, "results");
        const resultsSnapshot = await get(query(resultsRef, orderByChild("tournamentId"), equalTo(id)));
        if (resultsSnapshot.exists()) {
            Object.keys(resultsSnapshot.val()).forEach(resultId => {
                updates[`results/${resultId}`] = null;
            });
        }

        // 4. Delete the tournament itself
        updates[`${DB_PATH}/${id}`] = null;

        // 5. Execute all deletions atomically
        await update(ref(db), updates);
    }
};
