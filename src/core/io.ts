import { ActionInterface, ActionSet } from "./actions";
import { Combatant } from "./combatant";
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
}

export interface IORequest {
    combatant: Combatant;
    match: Match;
    rules: any;
    actions: any;
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
            rules: ruleBook.toSanitizedJSON(),
            actions: actions.toSanitizedJSON()
        });
    }
}