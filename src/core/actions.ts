import { Match } from './match';

export interface Actor {
    name: string;
    health: number;
    maxHealth: number;
}

export interface Action {
    name: string;
    description: string;
    actor: Actor;
    target: Actor;
    apply: (state: Match) => Match;
}