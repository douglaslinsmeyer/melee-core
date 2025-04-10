import { EffectType, TargetScope, StatusEffectInterface, StatusEffectInstance } from '../effects';
import { Match } from '../match';

const NAME = "Shielded: Defense";

const effect: StatusEffectInterface = {
    name: NAME,
    description: "The target gains a defensive shield, increasing their defense.",
    type: EffectType.Defensive,
    targetScope: TargetScope.Self,
    tier: 0,
    apply: (effect: StatusEffectInstance, match: Match): Match => {
        const self = match.getCombatant(effect.target);
        self.addDefenseModifier({
            id: effect.id,
            name: NAME,
            value: 3,
        });
        return match;
    },
    tick: (effect: StatusEffectInstance, match: Match): Match => {
        return match;
    },
    reset: (effect: StatusEffectInstance, match: Match): Match => {
        const self = match.getCombatant(effect.target);
        self.removeDefenseModifier(effect.id);
        return match;
    },
    
}

export default effect;