import { Observable } from '@nativescript/core';
import { User } from '../models/user.model';

interface Standing extends User {
    position: number;
    wins: number;
    losses: number;
    setsWon: number;
    setsLost: number;
    score: number;
}

export class TournamentResultsViewModel extends Observable {
    private _tournamentName: string;
    private _format: string;
    private _winner: Standing;
    private _standings: Array<Standing> = [];

    constructor(context: any) {
        super();
        this._tournamentName = context.tournamentName;
        this._format = this.formatToDisplayName(context.format);
        this.calculateResults(context.matches);
    }

    private formatToDisplayName(format: string): string {
        switch(format) {
            case 'round_robin_single':
                return 'Round Robin Singles';
            case 'round_robin_teams':
                return 'Round Robin Teams';
            case 'mexicano':
                return 'Mexicano Format';
            default:
                return 'Tournament';
        }
    }

    private calculateResults(matches: Array<any>) {
        // Create standings map to track statistics
        const standingsMap = new Map<string, Standing>();

        // Process all matches
        matches.forEach(match => {
            this.processMatch(match, standingsMap);
        });

        // Convert map to array and sort
        this._standings = Array.from(standingsMap.values()).sort((a, b) => {
            // Sort by wins first
            if (b.wins !== a.wins) return b.wins - a.wins;
            // Then by sets difference
            const aSetsRatio = a.setsWon - a.setsLost;
            const bSetsRatio = b.setsWon - b.setsLost;
            if (bSetsRatio !== aSetsRatio) return bSetsRatio - aSetsRatio;
            // Finally by total score
            return b.score - a.score;
        });

        // Assign positions
        this._standings.forEach((standing, index) => {
            standing.position = index + 1;
        });

        // Set winner
        this._winner = this._standings[0];

        this.notifyPropertyChange('standings', this._standings);
        this.notifyPropertyChange('winner', this._winner);
    }

    private processMatch(match: any, standingsMap: Map<string, Standing>) {
        const team1 = this.getOrCreateStanding(match.team1, standingsMap);
        const team2 = this.getOrCreateStanding(match.team2, standingsMap);

        let team1Sets = 0;
        let team2Sets = 0;
        let team1Points = 0;
        let team2Points = 0;

        match.sets.forEach(set => {
            const score1 = parseInt(set.team1Score) || 0;
            const score2 = parseInt(set.team2Score) || 0;

            team1Points += score1;
            team2Points += score2;

            if (score1 > score2) team1Sets++;
            if (score2 > score1) team2Sets++;
        });

        // Update standings
        team1.setsWon += team1Sets;
        team1.setsLost += team2Sets;
        team1.score += team1Points;

        team2.setsWon += team2Sets;
        team2.setsLost += team1Sets;
        team2.score += team2Points;

        if (team1Sets > team2Sets) {
            team1.wins++;
            team2.losses++;
        } else {
            team2.wins++;
            team1.losses++;
        }

        standingsMap.set(team1.id, team1);
        standingsMap.set(team2.id, team2);
    }

    private getOrCreateStanding(player: User, standingsMap: Map<string, Standing>): Standing {
        if (!standingsMap.has(player.id)) {
            standingsMap.set(player.id, {
                ...player,
                position: 0,
                wins: 0,
                losses: 0,
                setsWon: 0,
                setsLost: 0,
                score: 0
            });
        }
        return standingsMap.get(player.id);
    }

    get tournamentName(): string {
        return this._tournamentName;
    }

    get format(): string {
        return this._format;
    }

    get winner(): Standing {
        return this._winner;
    }

    get standings(): Array<Standing> {
        return this._standings;
    }
}