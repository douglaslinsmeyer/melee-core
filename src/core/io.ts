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
            rules: match.ruleBook.toSanitizedJSON(),
            actions: match.actionSet.toSanitizedJSON()
        });
    }
}