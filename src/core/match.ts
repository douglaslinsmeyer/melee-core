import { ActionInstanceInterface, ActionSet } from "@/core/actions";
import { Combatant } from "@/core/combatant";
import { RuleBook } from "@/core/rules";
import { Event } from "@/core/events";

export enum MatchState {
    PENDING = "match.pending",
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
    id: string = crypto.randomUUID();
    rounds: number = 100;
    currentRound: number = 0;
    combatants: Combatant[] = [];
    winners: Combatant[] = [];
    state: MatchState = MatchState.PENDING;
    lastAction: ActionInstanceInterface | null = null;
    ruleBook: RuleBook = new RuleBook();
    actionSet: ActionSet = new ActionSet();

    constructor(rounds?: number, currentRound?: number, combatants?: Combatant[]) {
        if (rounds) this.rounds = rounds;
        if (currentRound) this.currentRound = currentRound;
        if (combatants) this.combatants = combatants;
    }

    addCombatant(combatant: Combatant): this {
        if (this.state !== MatchState.PENDING) {
            throw new Error("Cannot add combatant after match has started.");
        }
        this.combatants.push(combatant);
        this.ruleBook.trigger(Event.COMBATANT_ADDED, this);
        return this;
    }

    getCombatant(id: string): Combatant {
        const combatant = this.combatants.find(c => c.id === id);
        if (!combatant) {
            throw new Error(`Combatant with id ${id} not found`);
        }
        return combatant;
    }

    addActionSet(actionSet: ActionSet): this {
        this.actionSet.merge(actionSet);
        return this;
    }

    addRuleBook(ruleBook: RuleBook): this {
        this.ruleBook.merge(ruleBook);
        return this;
    }
}
