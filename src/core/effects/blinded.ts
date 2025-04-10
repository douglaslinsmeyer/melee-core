import { StatusEffectInterface, StatusEffectInstance, EffectType, TargetScope } from '../effects';
import { Match } from '../match';

const effect: StatusEffectInterface = {
    name: "Blinded",
    description: "The target is blinded and cannot see.",
    type: EffectType.DETRIMENTAL,
    targetScope: TargetScope.ALL,
    tier: 0,
    apply: (effect: StatusEffectInstance, match: Match): void => {
        const self = match.getCombatant(effect.target);
        self.addEfficacyModifier({
            id: effect.id,
            name: effect.model.name,
            value: -90,
        });
    },
    tick: (effect: StatusEffectInstance, match: Match): void => {
    },
    reset: (effect: StatusEffectInstance, match: Match): void => {
        const self = match.getCombatant(effect.target);
        self.removeEfficacyModifier(effect.id);
    },
}

export default effect;