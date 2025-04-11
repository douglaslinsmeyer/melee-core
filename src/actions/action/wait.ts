import { ActionType, ActionInterface, ActionInstanceInterface } from '../actions';
import { Match } from '../../match';
import { logger } from '../../logger';

export class WaitAction implements ActionInterface {
    name: string = 'action.movements.wait';
    description: string = 'Wait for the next turn.';
    type: ActionType = ActionType.NEUTRAL;
    params?: Record<string, string>;
    apply(instance: ActionInstanceInterface, match: Match): void {
        const self = match.combatants.find(c => c.id === instance.input.combatantId);
        if (!self) {
            logger.error('Invalid input: combatant not found.');
            throw new Error('Invalid input: combatant not found.');
        }
        logger.combat(`[ACTION] Combatant: [${self.id}] is waiting for the next turn.`);
    }
}