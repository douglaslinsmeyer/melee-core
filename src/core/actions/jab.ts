import { ActionInterface, ActionInputInterface } from '../actions';
import { Match } from '../match';
import { logger } from '../logger';
import { dice } from '../dice';

const action: ActionInterface = {
    name: 'attacks.jabs',
    description: 'A series of quick jab attack.',
    apply: (input: ActionInputInterface, match: Match): Match => {
        const self = match.combatants.find(c => c.id === input.combatantId);
        const target = match.combatants.find(c => c.id === input.targetId);
        if (!self || !target) {
            logger.error('Invalid input: combatant or target not found.');
            throw new Error('Invalid input: combatant or target not found.');
        }

        const damage = dice.roll('2d6').total + self.getAttack() - target.getDefense();
        target.damage(damage);
        logger.combat(`[ACTION] Combatant: [${self.id}] attacked target: [${target.id}] with jab for [${damage}] damage.`);
        logger.info(`Combatant ${self.id} attacked target ${target.id} with jab for ${damage} damage.`);
        return match;
    }
}

export default action;