import { Match } from './match';
import { ActionInputInterface, ActionInterface } from './actions';

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
    apply(trigger: string, match: Match, action?: ActionInputInterface): void;
}

export enum Category {
    VictoryConditions = 'win_conditions',
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

    private sort(): void {
        this.rules.sort((a, b) => (a.priority ?? RULEBOOK_DEFAULT_PRIORITY) - (b.priority ?? RULEBOOK_DEFAULT_PRIORITY));
    }

    addRule(rule: RuleInterface): void {
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
    }

    trigger(trigger: string, state: Match, action?: ActionInputInterface): Match {
        this.rules.forEach(rule => {
            if (rule.trigger.includes(trigger)) {
                rule.apply(trigger, state, action);
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

    toSanitizedJSON(): { [key: string]: string[] }  {
        const rulesDescriptions: { [key: string]: string[] } = {};
        this.rules.forEach(rule => {
            if (!rule.visible) return;
            const category = rule.category || "default";
            if (!rulesDescriptions[category]) {
                rulesDescriptions[category] = [];
            }
            rulesDescriptions[category].push(rule.description);
        });
        
        return rulesDescriptions;
    }
}
