import { StatusEffectInterface, StatusEffectInstance, EffectType, TargetScope } from '../effects';
import { Match } from '../match';

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
    onApplication: (effect: StatusEffectInstance, match: Match): void => {
        const self = match.getCombatant(effect.target);
        self.addEfficacyModifier({
            id: effect.id,
            name: effect.model.name,
            value: -90,
        });
    },
    onTick: (effect: StatusEffectInstance, match: Match): void => {
    },
    onRemoval: (effect: StatusEffectInstance, match: Match): void => {
        const self = match.getCombatant(effect.target);
        self.removeEfficacyModifier(effect.id);
    },
}

export default effect;