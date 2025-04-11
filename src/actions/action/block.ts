import { ActionInterface, ActionType, ActionInstanceInterface } from '../actions';
import { Match } from '../../match';
import { logger } from '../../logger';
import Shielded from '../../effects/shielded';
import { StatusEffect } from '../../effects';

export class BlockAction implements ActionInterface {
    name: string = 'defense.block';
    description: string = "A defensive maneuver to block an attack.";
    type: ActionType = ActionType.DEFENSIVE;
    params?: Record<string, string>;
    apply(instance: ActionInstanceInterface, match: Match): string {
        const self = match.combatants.find(c => c.id === instance.input.combatantId);
        if (!self) {
            logger.error('Invalid input: combatant not found.');
            throw new Error('Invalid input: combatant not found.');
        }
        self.effects.add(StatusEffect(Shielded, self.id, self.id, 999), match);
        return `Combatant: [${self.id}] is blocking the next attack.`;
    }
}