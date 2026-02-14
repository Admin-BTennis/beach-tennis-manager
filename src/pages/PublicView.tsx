import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { tournamentService } from "@/services/tournamentService";
import { courtService } from "@/services/courtService";
import { matchService } from "@/services/matchService";
import { Court, Match, Tournament } from "@/types/beach-tennis";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Users, Calendar, MapPin, Activity, Clock } from "lucide-react";
import { ArenaCourtCard } from "@/components/ArenaCourtCard";
import { GroupStandings } from "@/components/matches/GroupStandings";
import { TournamentBrackets } from "@/components/matches/TournamentBrackets";

export default function PublicView() {
    const { id } = useParams();
    const [tournament, setTournament] = useState<Tournament | null>(null);
    const [courts, setCourts] = useState<Court[]>([]);
    const [matches, setMatches] = useState<Match[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("TODAS");

    useEffect(() => {
        if (id) {
            const unsubTourney = tournamentService.subscribe((tournaments) => {
                const current = tournaments.find(t => t.id === id);
                if (current) setTournament(current);
            });
            const unsubCourts = courtService.subscribeByTournament(id, setCourts);
            const unsubMatches = matchService.subscribeByTournament(id, setMatches);

            return () => {
                unsubTourney();
                unsubCourts();
                unsubMatches();
            };
        }
    }, [id]);

    if (!tournament) {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <div className="text-center space-y-4">
                    <Activity className="h-12 w-12 text-primary animate-pulse mx-auto" />
                    <p className="text-muted-foreground animate-pulse">Carregando torneio...</p>
                </div>
            </div>
        );
    }

    const filteredMatches = selectedCategory === "TODAS"
        ? matches
        : matches.filter(m => m.category === selectedCategory);

    const ongoingMatches = filteredMatches.filter(m => m.status === 'ongoing');
    const upcomingMatches = filteredMatches.filter(m => m.status === 'planned').slice(0, 5); // Show next 5

    const availableCategories = Array.from(new Set([
        ...(tournament?.categories || []),
        ...matches.map(m => m.category)
    ])).filter(Boolean).sort();

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Simple Mobile Header */}
            <header className="bg-primary px-6 py-8 rounded-b-[2.5rem] shadow-xl text-white">
                <div className="max-w-md mx-auto space-y-2">
                    <Badge variant="secondary" className="bg-white/20 text-white border-none mb-2">
                        BT MANAGER PRO
                    </Badge>
                    <h1 className="text-3xl font-black uppercase tracking-tighter">{tournament.name}</h1>
                    <div className="flex flex-wrap gap-3 text-sm font-medium opacity-90">
                        <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(tournament.date).toLocaleDateString('pt-BR')}
                        </span>
                        <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {tournament.location}
                        </span>
                    </div>
                </div>
            </header>

            <main className="max-w-md mx-auto px-4 -mt-6">
                <Tabs defaultValue="live" className="space-y-6">
                    <TabsList className="grid grid-cols-3 w-full h-12 bg-white rounded-full shadow-lg border p-1">
                        <TabsTrigger value="live" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">AO VIVO</TabsTrigger>
                        <TabsTrigger value="groups" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">GRUPOS</TabsTrigger>
                        <TabsTrigger value="brackets" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">CHAVES</TabsTrigger>
                    </TabsList>

                    {/* Quick Category Filter */}
                    {availableCategories.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                            <Button
                                variant={selectedCategory === "TODAS" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedCategory("TODAS")}
                                className="rounded-full h-8 text-[10px] whitespace-nowrap"
                            >
                                TODAS
                            </Button>
                            {availableCategories.map(cat => (
                                <Button
                                    key={cat}
                                    variant={selectedCategory === cat ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setSelectedCategory(cat)}
                                    className="rounded-full h-8 text-[10px] whitespace-nowrap"
                                >
                                    {cat}
                                </Button>
                            ))}
                        </div>
                    )}

                    <TabsContent value="live" className="space-y-4">
                        <h3 className="font-bold text-slate-800 px-2 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                            Quadras em Jogo
                        </h3>
                        {ongoingMatches.length === 0 ? (
                            <Card className="border-dashed border-2 bg-slate-50">
                                <CardContent className="py-12 text-center text-muted-foreground">
                                    Nenhuma partida em andamento no momento.
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="flex flex-col gap-6">
                                {courts.filter(c => c.status === 'em_jogo').map(court => (
                                    <div key={court.id} className="w-full flex justify-center">
                                        <ArenaCourtCard court={court} />
                                    </div>
                                ))}
                            </div>
                        )}

                        {upcomingMatches.length > 0 && (
                            <div className="pt-6 space-y-4">
                                <h3 className="font-bold text-slate-800 px-2 flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-primary" />
                                    Próximos Jogos
                                </h3>
                                <div className="grid gap-3">
                                    {upcomingMatches.map(m => (
                                        <div key={m.id} className="bg-white p-4 rounded-2xl border shadow-sm flex items-center justify-between">
                                            <div className="flex-1 text-center">
                                                <p className="text-xs font-bold truncate">{m.teamA.player1.name}</p>
                                            </div>
                                            <Badge variant="outline" className="mx-4 text-[8px] scale-75 opacity-50">VS</Badge>
                                            <div className="flex-1 text-center">
                                                <p className="text-xs font-bold truncate">{m.teamB.player1.name}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="groups" className="space-y-8">
                        {(selectedCategory === "TODAS" ? availableCategories : [selectedCategory]).map(cat => {
                            const catMatches = filteredMatches.filter(m => m.category === cat && m.group);
                            if (catMatches.length === 0) return null;
                            const groups = Array.from(new Set(catMatches.map(m => m.group))).sort();

                            return (
                                <div key={cat} className="space-y-4">
                                    <div className="flex items-center gap-3 px-2">
                                        <Badge className="bg-primary/10 text-primary border-none text-[10px] font-black uppercase">
                                            {cat}
                                        </Badge>
                                        <div className="h-px bg-slate-200 flex-1" />
                                    </div>
                                    <div className="space-y-6">
                                        {groups.map(groupName => (
                                            <GroupStandings
                                                key={`${cat}-${groupName}`}
                                                groupName={groupName!}
                                                matches={catMatches.filter(m => m.group === groupName)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            );
                        })}

                        {!filteredMatches.some(m => m.group) && (
                            <Card className="border-dashed border-2 bg-slate-50">
                                <CardContent className="py-12 text-center text-muted-foreground">
                                    Fase de grupos ainda não iniciada para esta categoria.
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>

                    <TabsContent value="brackets">
                        {id && <TournamentBrackets tournamentId={id} tournamentType={tournament.type} matches={filteredMatches} />}
                    </TabsContent>
                </Tabs>
            </main>

            {/* Support Watermark */}
            <div className="py-8 text-center text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                Powered by BT Manager
            </div>
        </div>
    );
}
