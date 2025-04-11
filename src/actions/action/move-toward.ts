import { ActionInterface, ActionInputInterface, ActionType, ActionInstanceInterface } from '../actions';
import { Match } from '../../match';
import { logger } from '../../logger';

export class MoveTowardAction implements ActionInterface {
    name: string = 'movements.move.toward';
    description: string = 'Move your combatant to a new position.';
    type: ActionType = ActionType.NEUTRAL;
    params?: Record<string, string>;
    apply(instance: ActionInstanceInterface, match: Match): string {
        const self = match.combatants.find(c => c.id === instance.input.combatantId);
        const target = match.combatants.find(c => c.id === instance.input.targetId);
        if (!self || !target) {
            logger.error('Invalid input: combatant or target not found.');
            throw new Error('Invalid input: combatant or target not found.');
        }
        
        self.location.moveToward(target.location, self.movementSpeed);
        return `Combatant: [${self.id}] moved toward target: [${target.id}].`;
    }
}