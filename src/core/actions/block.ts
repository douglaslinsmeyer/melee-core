import { ActionInterface, ActionInputInterface, ActionType } from '../actions';
import { Match } from '../match';
import { logger } from '../logger';
import { dice } from '../dice';
import Shielded from '../effects/shielded';
import { StatusEffect } from '../effects';

const action: ActionInterface = {
    name: 'defense.block',
    description: "A defensive maneuver to block an attack.",
    type: ActionType.DEFENSIVE,
    apply: (input: ActionInputInterface, match: Match): void => {
        const self = match.combatants.find(c => c.id === input.combatantId);
        if (!self) {
            logger.error('Invalid input: combatant not found.');
            throw new Error('Invalid input: combatant not found.');
        }
        self.effects.add(StatusEffect(Shielded, self.id, self.id, 999), match);
        logger.combat(`[ACTION] Combatant: [${self.id}] is blocking the next attack.`);
    }
}

export default action;