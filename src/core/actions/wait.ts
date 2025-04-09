import { ActionInterface, ActionInputInterface } from '../actions';
import { Match } from '../match';
import { logger } from '../logger';

const action: ActionInterface = {
    name: 'movements.wait',
    description: 'Wait for the next turn.',
    apply: (input: ActionInputInterface, match: Match): Match => {
        const self = match.combatants.find(c => c.id === input.combatantId);
        if (!self) {
            logger.error('Invalid input: combatant not found.');
            throw new Error('Invalid input: combatant not found.');
        }
        logger.combat(`[ACTION] Combatant: [${self.id}] is waiting for the next turn.`);
        return match;
    }
}

export default action;