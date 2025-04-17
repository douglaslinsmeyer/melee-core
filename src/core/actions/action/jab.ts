import { ActionInterface, ActionType, ActionInstanceInterface } from '@/core/actions';
import { Match } from '@/core/match';
import { dice } from '@/core/dice';
import Dazed from '@/core/effects/effect/dazed';
import { StatusEffect } from '@/core/effects';

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
            return 'Action Failed. target not found.';
        }

        if (self.id === target.id) {
            return 'Action Failed. You cannot attack yourself.';
        }

        if (self.location.distanceTo(target.location) > this.range) {
            return `Action Failed. target: [${target.id}] is out of range.`;
        }

        // Determine if the attack hits
        const attackRoll = dice.roll('1d20').total;
        if (target.defense >= attackRoll) {
            return `Action Failed. target: [${target.id}] defended against the attack.`;
        }

        const damage = dice.roll('2d4').total;
        target.damage(damage);
        
        if (dice.roll('1d20>15')) {
            target.effects.add(StatusEffect(Dazed, self.id, target.id, 1), match);
        }

        return `Combatant: [${self.id}] attacked target: [${target.id}] with [jabs] for [Total: ${damage}] damage.`;
    }
}