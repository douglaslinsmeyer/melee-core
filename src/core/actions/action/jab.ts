import { ActionInterface, ActionType, ActionInstanceInterface } from '../actions';
import { Match } from '../../match';
import { dice } from '../../dice';
import Dazed from '../../effects/effect/dazed';
import { StatusEffect } from '../../effects/effects';

export class JabAction implements ActionInterface {
    name: string = 'offense.jabs';
    description: string = 'A series of quick jab attack.';
    type: ActionType = ActionType.OFFENSIVE;
    range: number = 1;
    params?: Record<string, string>;
    apply(instance: ActionInstanceInterface, match: Match): string {
        const self = match.combatants.find(c => c.id === instance.input.combatantId);
        const target = match.combatants.find(c => c.id === instance.input.targetId);
        if (!self || !target) {
            throw new Error('Invalid input: combatant or target not found.');
        }
        const originalDamage = dice.roll('3d4').total;
        const effectiveDamage = Math.round(originalDamage * self.efficacyPercentage);
        const totalDamage = Math.max(effectiveDamage - target.defense, 0);
        target.damage(totalDamage);
        if (dice.roll('1d20>15')) {
            target.effects.add(StatusEffect(Dazed, self.id, target.id, 1), match);
        }

        return `Combatant: [${self.id}] attacked target: [${target.id}] with [jabs] for [Total: ${totalDamage}] (Original: ${originalDamage}, Effective: ${effectiveDamage}) damage.`;
    }
}