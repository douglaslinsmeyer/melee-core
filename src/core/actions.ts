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

export class ActionSet {

    actions: ActionInterface[] = [];

    addAction(action: ActionInterface): void {
        action.name = action.name.toLowerCase();
        if (this.actions.some(a => a.name === action.name)) {
            throw new Error(`Action with name ${action.name} already exists.`);
        }
        this.actions.push(action);
    }

    toSanitizedJSON(): any {
        const actionsDescriptions: { [key: string]: string[] } = {};
        this.actions.forEach(action => {
            const category = action.category || "default";
            if (!actionsDescriptions[category]) {
                actionsDescriptions[category] = [];
            }
            actionsDescriptions[category].push(action.description);
        });
        
        return {
            actions: actionsDescriptions
        };
    }
    
    merge(other: ActionSet): void {
        this.actions = [...this.actions, ...other.actions];
    }
}