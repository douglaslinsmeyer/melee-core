import { ActionType, ActionInterface, ActionInstanceInterface } from '@/core/actions';
import { Match } from '@/core/match';

export class WaitAction implements ActionInterface {
    name: string = 'action.movements.wait';
    description: string = 'Wait for the next turn.';
    type: ActionType = ActionType.NEUTRAL;
    params?: Record<string, string>;
    apply(instance: ActionInstanceInterface, match: Match): string {
        const self = match.combatants.find(c => c.id === instance.input.combatantId);
        if (!self) {
            throw new Error('Invalid input: combatant not found.');
        }
        return `Combatant: [${self.id}] is waiting for the next turn.`;
    }
}