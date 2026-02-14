import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { tournamentService } from "@/services/tournamentService";
import { Tournament } from "@/types/beach-tennis";
import { Trophy, ArrowLeft, Activity, MapPin, Calendar, LayoutDashboard } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function RefereeLogin() {
    const navigate = useNavigate();
    const [tournaments, setTournaments] = useState<Tournament[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = tournamentService.subscribe((data) => {
            // Only show active or planning tournaments
            setTournaments(data.filter(t => t.status === 'active' || t.status === 'planning'));
            setLoading(false);
        });
        return () => unsub();
    }, []);

    const handleSelectTournament = (t: Tournament) => {
        // Save session for the generic referee role (no specific court yet)
        localStorage.setItem("beach-tennis-referee-session", JSON.stringify({
            role: 'referee',
            tournamentId: t.id,
            tournamentName: t.name,
            timestamp: Date.now()
        }));
        navigate(`/arbitro/painel?tournamentId=${t.id}`);
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-lg space-y-8">
                <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-primary/20 rounded-3xl rotate-12 flex items-center justify-center mx-auto mb-6 border border-primary/30 shadow-2xl shadow-primary/20">
                        <LayoutDashboard className="w-10 h-10 text-primary -rotate-12" />
                    </div>
                    <h1 className="text-4xl font-black text-white tracking-tight uppercase">Painel do Árbitro</h1>
                    <p className="text-slate-400 text-lg">Selecione o torneio que você irá arbitrar</p>
                </div>

                <div className="grid gap-4">
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <Activity className="h-8 w-8 text-primary animate-spin" />
                        </div>
                    ) : tournaments.length === 0 ? (
                        <div className="text-center py-12 bg-slate-900/50 rounded-2xl border border-dashed border-slate-700">
                            <p className="text-slate-500">Nenhum torneio ativo no momento.</p>
                            <Button variant="link" onClick={() => navigate("/")} className="mt-2 text-primary">Voltar ao Início</Button>
                        </div>
                    ) : (
                        tournaments.map(t => (
                            <button
                                key={t.id}
                                onClick={() => handleSelectTournament(t)}
                                className="group w-full bg-slate-900 border border-slate-800 p-6 rounded-2xl text-left hover:border-primary transition-all hover:shadow-xl hover:shadow-primary/10 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Trophy className="w-24 h-24 text-white" />
                                </div>

                                <div className="relative z-10 flex justify-between items-center">
                                    <div className="space-y-2">
                                        <Badge variant="secondary" className="bg-primary/10 text-primary border-none text-[10px] font-black uppercase">
                                            {t.status === 'active' ? '● Em Andamento' : 'Planejado'}
                                        </Badge>
                                        <h3 className="text-xl font-bold text-white uppercase tracking-tight">{t.name}</h3>
                                        <div className="flex items-center gap-4 text-slate-400 text-xs">
                                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {t.location}</span>
                                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(t.date).toLocaleDateString('pt-BR')}</span>
                                        </div>
                                    </div>

                                    <div className="bg-slate-800 p-3 rounded-full group-hover:bg-primary group-hover:text-black transition-colors text-white">
                                        <ArrowLeft className="w-5 h-5 rotate-180" />
                                    </div>
                                </div>
                            </button>
                        ))
                    )}
                </div>

                <Button
                    variant="ghost"
                    className="w-full text-slate-500 hover:text-white"
                    onClick={() => navigate("/")}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Voltar ao Início
                </Button>
            </div>
        </div>
    );
}
