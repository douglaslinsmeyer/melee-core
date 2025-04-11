import { ActionSet } from "./actions";
import { Combatant } from "./combatant";
import { combatLoggerArray } from "./logger";
import { Match } from "./match";
import { RuleBook } from "./rules";

export interface IODriverInterface {
    name: string;
    call(uri: string, request: IORequest): IOResponse;
}

export interface IOResponse {
    id: string;
    secret: string;
    action: string;
    target: string;
    params?: Record<string, any>;
}

export interface IORequest {
    self: Combatant;
    match: Match;
    log: any[];
    rules: { [key: string]: string[] };
    actions: Record<string, any>;
}

export class IOHandler {

    driver: IODriverInterface;

    constructor(driver: IODriverInterface) {
        this.driver = driver;
    }

    call(uri: string,combatant: Combatant, match: Match): IOResponse {
        return this.driver.call(uri, {
            self: combatant,
            match: match,
            log: combatLoggerArray.map(log => {
                return log[0];
            }),
            rules: ioRuleBookFilter(match.ruleBook),
            actions: ioActionSetFilter(match.actionSet)
        });
    }
}

export const ioRuleBookFilter = (ruleBook: RuleBook): Record<string, any> => {
    const rulesDescriptions: { [key: string]: string[] } = {};
        ruleBook.rules.forEach(rule => {
            if (!rule.visible) return;
            const category = rule.category || "default";
            if (!rulesDescriptions[category]) {
                rulesDescriptions[category] = [];
            }
            rulesDescriptions[category].push(rule.description);
        });
        
        return rulesDescriptions;
}

export const ioActionSetFilter = (actionSet: ActionSet): Record<string, any> => {
    const actionsDescriptions: Record<string, any>[] = [];
        actionSet.actions.forEach(action => {
            actionsDescriptions.push({
                name: action.name,
                description: action.description,
                response: {
                    combatantId: "string, combatant ID.",
                    targetId: "string, target ID.",
                    action: "string, action name.",
                    params: action.params,
                }
            });
        });
        actionsDescriptions.sort((a, b) => a.name.localeCompare(b.name));
        return actionsDescriptions;
}