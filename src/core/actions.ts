import { Match } from './match';
import ActionWait from './actions/wait';
import ActionJab from './actions/jab';
import ActionMoveToward from './actions/move-toward';

export interface ActionInputInterface {
    combatantId: string;
    targetId: string;
    action: string;
    params?: any;
}

export interface ActionInterface {
    name: string;
    description: string;
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

    find(name: string): ActionInterface {
        const action = this.actions.find(a => a.name === name.toLowerCase());
        if (!action) {
            throw new Error(`Action with name ${name} not found.`);
        }
        return action;
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

export const standardActions = new ActionSet();
standardActions.addAction(ActionWait);
standardActions.addAction(ActionJab);
standardActions.addAction(ActionMoveToward);