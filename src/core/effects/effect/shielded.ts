import { StatModifierType } from '@/core/combatant';
import { EffectType, TargetScope, StatusEffectInterface, StatusEffectInstance } from '@/core/effects';
import { Match } from '@/core/match';

const blockValue = 15;

const effect: StatusEffectInterface = {
    name: 'Shielded',
    description: "The target gains a defensive shield, increasing their defense.",
    type: EffectType.DEFENSIVE,
    targetScope: TargetScope.SELF,
    tier: 0,
    isApplicable: (effect: StatusEffectInstance, match: Match): boolean => {
        const self = match.getCombatant(effect.target);
        return self.isAlive();
    },
    onApplication: (effect: StatusEffectInstance, match: Match): string => {
        const self = match.getCombatant(effect.target);
        self.addDefenseModifier({
            id: effect.id,
            name: effect.model.name,
            value: blockValue,
            type: StatModifierType.PERCENTAGE
        });
        return `Combatant: [${self.id}] is shielded. [Defense: +${blockValue}].`;
    },
    onTick: (effect: StatusEffectInstance, match: Match): void => {},
    onRemoval: (effect: StatusEffectInstance, match: Match): string => {
        const self = match.getCombatant(effect.target);
        self.removeDefenseModifier(effect.id);
        return `Combatant: [${self.id}] is no longer shielded.`;
    },
    
}

export default effect;