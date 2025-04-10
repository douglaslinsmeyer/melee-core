import { StatusEffectInterface, StatusEffectInstance, EffectType, TargetScope } from '../effects';
import { Match } from '../match';

const effect: StatusEffectInterface = {
    name: "Blinded",
    description: "The target is blinded and cannot see.",
    type: EffectType.Detrimental,
    targetScope: TargetScope.All,
    tier: 0,
    apply: (effect: StatusEffectInstance, match: Match): Match => {
        const self = match.getCombatant(effect.target);
        self.addEfficacyModifier({
            id: effect.id,
            name: "Blinded",
            value: -90,
        });
        return match;
    },
    tick: (effect: StatusEffectInstance, match: Match): Match => {
        return match;
    },
    reset: (effect: StatusEffectInstance, match: Match): Match => {
        const self = match.getCombatant(effect.target);
        self.removeEfficacyModifier(effect.id);
        return match;
    },
}

export default effect;