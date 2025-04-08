import { EVENT } from './events';
import { Match } from './match';
import { Dice } from 'dice-typescript';

/**
 * Rule interface
 * 
 * This interface represents a rule in the game.
 * It has a name, description, class, and methods to apply the rule.
 */
export interface Rule {
    name: string;
    description: string;
    trigger: string;
    priority: number;
    apply: (match: Match) => Match;
}

/**
 * RuleBook class
 * 
 * This class represents a set of rules in the game.
 * It contains an array of rules and methods to add rules to the set.
 */
export class RuleBook {
    name: string = "Default";
    description: string = "";
    rules: Rule[] = [];

    constructor(name?: string, description?: string) {
        this.name = name || this.name;
        this.description = description || this.description;
    }

    addRule(rule: Rule): void {
        this.rules.push(rule);
        this.rules.sort((a, b) => a.priority - b.priority);
    }

    removeRule(ruleName: string): void {
        this.rules = this.rules.filter(rule => rule.name !== ruleName);
    }

    removeMatchingRules(ruleName: string): void {
        this.rules = this.rules.filter(rule => !rule.name.startsWith(ruleName));
    }

    trigger(trigger: string, state: Match): Match {
        this.rules.forEach(rule => {
            if (rule.trigger === trigger) {
                state = rule.apply(state);
            }
        });
        return state;
    }
}
