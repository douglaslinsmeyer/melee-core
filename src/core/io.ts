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
    combatant: Combatant;
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

    call(uri: string,combatant: Combatant, match: Match, ruleBook: RuleBook, actions: ActionSet): IOResponse {
        return this.driver.call(uri, {
            combatant: combatant,
            match: match,
            log: combatLoggerArray.map(log => {
                return log[0];
            }),
            rules: ruleBook.toSanitizedJSON(),
            actions: actions.toSanitizedJSON()
        });
    }
}