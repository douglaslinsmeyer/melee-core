import { Match } from './match';

export interface ActionInputInterface {
    combatantId: string;
    targetId: string;
    action: string;
    params?: any;
}

export enum ActionType {
    OFFENSIVE = 'offensive',
    DEFENSIVE = 'defensive',
    NEUTRAL = 'neutral',
}

export interface ActionInterface {
    name: string;
    description: string;
    type: ActionType;
    params?: Record<string, string>;
    apply(input: ActionInstanceInterface, state: Match): void;
}

export interface ActionInstanceInterface {
    input: ActionInputInterface;
    action: ActionInterface;
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

    find(name: string): ActionInterface {
        const action = this.actions.find(a => a.name === name.toLowerCase());
        if (!action) throw new Error(`Action with name ${name} not found.`);
        return action;
    }

    apply(input: ActionInputInterface, match: Match): void {
        const action = this.find(input.action);
        const actionInstance: ActionInstanceInterface = {
            input: input,
            action: action,
        };
        action.apply(actionInstance, match);
    }

    toSanitizedJSON(): Record<string, any> {
        const actionsDescriptions: Record<string, any>[] = [];
        this.actions.forEach(action => {
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
    
    merge(other: ActionSet): void {
        this.actions = [...this.actions, ...other.actions];
    }
}
