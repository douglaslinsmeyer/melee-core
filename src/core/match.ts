import { Combatant } from "./combatant";

/**
 * Match class
 * 
 * This class represents a match in the game.
 * It contains information about the rounds, combatants, and current round.
 */
export class Match {
    rounds: number = 1;
    currentRound: number = 0;
    combatants: Combatant[] = [];
    winners?: Combatant[];
    state: MATCH_STATE = MATCH_STATE.PENDING;

    constructor(rounds?: number, currentRound?: number, combatants?: Combatant[]) {
        if (rounds) this.rounds = rounds;
        if (currentRound) this.currentRound = currentRound;
        if (combatants) this.combatants = combatants;
    }

    addCombatant(combatant: Combatant): void {
        if (this.currentRound > 0) {
            throw new Error("Cannot add combatant after match has started");
        }
        this.combatants.push(combatant);
    }
}

export enum MATCH_STATE {
    PENDING = "match.pending",
    IN_PROGRESS = "match.in_progress",
    COMPLETE = "match.complete"
}