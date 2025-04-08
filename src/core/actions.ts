import { Match } from './match';

export interface ActionInputInterface {
    combatantId: string;
    targetId: string;
    action: string;
    params?: any;
}

export interface ActionInterface {
    name: string;
    description: string;
    category: string;
    apply: (input: ActionInputInterface, state: Match) => Match;
}
