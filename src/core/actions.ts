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
    params?: Record<string, string>;
    apply: (input: ActionInputInterface, state: Match) => Match;
}

export class ActionSet {

    actions: ActionInterface[] = [];

    addAction(action: ActionInterface): void {
        action.name = action.name.toLowerCase();
        if (this.actions.some(a => a.name === action.name)) {
            throw new Error(`Action with name ${action.name} already exists.`);
        }
        this.actions.push(action);
    }

    toSanitizedJSON(): Record<string, any> {
        const actionsDescriptions: { [key: string]: object[] } = {};
        this.actions.forEach(action => {
            if (!actionsDescriptions[action.category]) {
                actionsDescriptions[action.category] = [];
            }
            actionsDescriptions[action.category].push({
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
        
        return actionsDescriptions;
    }
    
    merge(other: ActionSet): void {
        this.actions = [...this.actions, ...other.actions];
    }
}