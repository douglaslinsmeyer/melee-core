import { Combatant } from "./combatant";

export enum State {
    PENDING = "match.PENDING",
    IN_PROGRESS = "match.in_progress",
    COMPLETE = "match.complete"
}

/**
 * Match class
 * 
 * This class represents a match in the game.
 * It contains information about the rounds, combatants, and current round.
 */
export class Match {
    rounds: number = 3;
    currentRound: number = 0;
    combatants: Combatant[] = [];
    winners: Combatant[] = [];
    state: State = State.PENDING;

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

    getCombatant(id: string): Combatant {
        const combatant = this.combatants.find(c => c.id === id);
        if (!combatant) {
            throw new Error(`Combatant with id ${id} not found`);
        }
        return combatant;
    }
}
