import { StatusEffectInterface, StatusEffectInstance, EffectType, TargetScope } from '@/core/effects';
import { Match } from '@/core/match';

const effect: StatusEffectInterface = {
    name: "Blinded",
    description: "The target is blinded and cannot see.",
    type: EffectType.DETRIMENTAL,
    targetScope: TargetScope.ALL,
    tier: 0,
    isApplicable: (effect: StatusEffectInstance, match: Match): boolean => {
        const self = match.getCombatant(effect.target);
        return self.isAlive();
    },
    onApplication: (effect: StatusEffectInstance, match: Match): string => {
        const self = match.getCombatant(effect.target);
        self.addAttackModifier({ id: effect.id, name: effect.model.name, value: -0.2 });
        self.addDefenseModifier({ id: effect.id, name: effect.model.name, value: -0.2 });
        return `Combatant: [${self.id}] is blind!`;
    },
    onTick: (effect: StatusEffectInstance, match: Match): void => {},
    onRemoval: (effect: StatusEffectInstance, match: Match): string => {
        const self = match.getCombatant(effect.target);
        self.removeAttackModifier(effect.id);
        self.removeDefenseModifier(effect.id);
        return `Combatant: [${self.id}] is no longer blind.`;
    },
}

export default effect;