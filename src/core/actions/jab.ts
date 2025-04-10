import { ActionInterface, ActionInputInterface, ActionType } from '../actions';
import { Match } from '../match';
import { logger } from '../logger';
import { dice } from '../dice';
import Dazed from '../effects/dazed';
import { StatusEffect } from '../effects';

const action: ActionInterface = {
    name: 'offense.jabs',
    description: 'A series of quick jab attack.',
    type: ActionType.OFFENSIVE,
    apply: (input: ActionInputInterface, match: Match): void => {
        const self = match.combatants.find(c => c.id === input.combatantId);
        const target = match.combatants.find(c => c.id === input.targetId);
        if (!self || !target) {
            logger.error('Invalid input: combatant or target not found.');
            throw new Error('Invalid input: combatant or target not found.');
        }
        const originalDamage = dice.roll('3d4').total;
        const effectiveDamage = Math.round(originalDamage * self.efficacyPercentage);
        const totalDamage = effectiveDamage - target.defense;
        target.damage(totalDamage);
        logger.combat(`[ACTION] Combatant: [${self.id}] attacked target: [${target.id}] with [jabs] for [Total: ${totalDamage}] (Original: ${originalDamage}, Effective: ${effectiveDamage}) damage.`);
        target.effects.add(StatusEffect(Dazed, self.id, target.id, 1), match);
    }
}

export default action;