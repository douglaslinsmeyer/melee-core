import { ActionInterface, ActionType, ActionInstanceInterface } from '@/core/actions';
import { Match } from '@/core/match';

export class MoveTowardAction implements ActionInterface {
    name: string = 'movements.move.toward';
    description: string = 'Move your combatant to a new position.';
    type: ActionType = ActionType.NEUTRAL;
    params?: Record<string, string>;
    apply(instance: ActionInstanceInterface, match: Match): string {
        const self = match.combatants.find(c => c.id === instance.input.combatantId);
        const target = match.combatants.find(c => c.id === instance.input.targetId);
        if (!self || !target) {
            throw new Error('Invalid input: combatant or target not found.');
        }
        
        self.location.moveToward(target.location, self.movementSpeed);
        return `Combatant: [${self.id}] moved toward target: [${target.id}].`;
    }
}