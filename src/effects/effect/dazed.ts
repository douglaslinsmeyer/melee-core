import { EffectType, TargetScope, StatusEffectInterface, StatusEffectInstance } from '../effects';
import { Match } from '../../match';

const effect: StatusEffectInterface = {
    name: "Dazed",
    description: "The target is dazed and is sluggish and disoriented.",
    type: EffectType.DETRIMENTAL,
    targetScope: TargetScope.ALL,
    tier: 0,
    isApplicable: (effect: StatusEffectInstance, match: Match): boolean => {
        const self = match.getCombatant(effect.target);
        return self.isAlive();
    },
    onApplication: (effect: StatusEffectInstance, match: Match): string => {
        const self = match.getCombatant(effect.target);
        self.addEfficacyModifier({
            id: effect.id,
            name: effect.model.name,
            value: -50,
        });
        return `Combatant: [${self.id}] is now dazed.`;
    },
    onTick: (effect: StatusEffectInstance, match: Match): void => {},
    onRemoval: (effect: StatusEffectInstance, match: Match): string => {
        const self = match.getCombatant(effect.target);
        self.removeEfficacyModifier(effect.id);
        return `Combatant: [${self.id}] is no longer dazed.`;
    },
}

export default effect;