export { LastSurvivorRule } from '@/core/rules/rule/last-survivor';
export { MatchStatusRule } from '@/core/rules/rule/match-status';
export { MaxRoundsRule } from '@/core/rules/rule/max-rounds';
export { OffensiveActionsRule } from '@/core/rules/rule/offensive-actions';
export { RollForInitiativeRule } from '@/core/rules/rule/roll-for-initiative';
export { StartingStatsRule } from '@/core/rules/rule/starting-stats';
export { TickEffectsRule } from '@/core/rules/rule/tick-effects';

import { Match } from '../match';

/**
 * Rule interface
 * 
 * This interface represents a rule in the game.
 * It has a name, description, class, and methods to apply the rule.
 */
export interface RuleInterface {
    name: string;
    description: string;
    trigger: string|string[];
    category?: string;
    priority?: number;
    visible?: boolean;
    apply(trigger: string, match: Match, context?: any): void;
}

export enum RuleCategory {
    VICTORY_CONDITION = 'win_conditions',
    CORE = 'core',
}

const RULEBOOK_DEFAULT_NAME = "default";
const RULEBOOK_DEFAULT_PRIORITY = 1;
const RULEBOOK_DEFAULT_VISIBLE = false;
const RULEBOOK_DEFAULT_CATEGORY = "default";

/**
 * RuleBook class
 * 
 * This class represents a set of rules in the game.
 * It contains an array of rules and methods to add rules to the set.
 */
export class RuleBook {

    name: string = RULEBOOK_DEFAULT_NAME;
    rules: RuleInterface[] = [];

    constructor(name?: string) {
        if (name) this.name = name;
    }

    private sort(): this {
        this.rules.sort((a, b) => (a.priority ?? RULEBOOK_DEFAULT_PRIORITY) - (b.priority ?? RULEBOOK_DEFAULT_PRIORITY));

        return this;
    }

    addRule(rule: RuleInterface): this {
        rule.name = rule.name.toLowerCase();
        if (this.rules.some(r => r.name === rule.name)) {
            throw new Error(`Rule with name ${rule.name} already exists.`);
        }
        if (!Array.isArray(rule.trigger)) {
            rule.trigger = [rule.trigger];
        }
        rule.category = (!rule.category) ? RULEBOOK_DEFAULT_CATEGORY : rule.category.toLowerCase().replace(' ', '_');
        if (!rule.priority) rule.priority = RULEBOOK_DEFAULT_PRIORITY;
        if (!rule.visible) rule.visible = RULEBOOK_DEFAULT_VISIBLE;

        this.rules.push(rule);
        this.sort();

        return this;
    }

    trigger(trigger: string, state: Match, context?: any): Match {
        this.rules.forEach(rule => {
            if (rule.trigger.includes(trigger)) {
                rule.apply(trigger, state, context);
            }
        });
        return state;
    }

    merge(other: RuleBook): void {
        other.rules.forEach(rule => {
            rule.name = (other.name) ? `${other.name}.${rule.name}` : rule.name;
            if (!this.rules.some(r => r.name === rule.name)) {
                this.rules.push(rule);
            }
        });
        this.sort();
    }
}
