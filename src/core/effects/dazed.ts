import { EffectType, TargetScope, StatusEffectInterface, StatusEffectInstance } from '../effects';
import { Match } from '../match';
import { logger } from '../logger';

const effect: StatusEffectInterface = {
    name: "Dazed",
    description: "The target is dazed and is sluggish and disoriented.",
    type: EffectType.Detrimental,
    targetScope: TargetScope.All,
    tier: 0,
    apply: (effect: StatusEffectInstance, match: Match): Match => {
        const self = match.getCombatant(effect.target);
        self.addEfficacyModifier({
            id: effect.id,
            name: "Dazed",
            value: -50,
        });
        logger.combat(`[EFFECT] Combatant: [${self.id}] is now dazed.`);

        return match;
    },
    tick: (effect: StatusEffectInstance, match: Match): Match => {
        return match;
    },
    reset: (effect: StatusEffectInstance, match: Match): Match => {
        const self = match.getCombatant(effect.target);
        self.removeEfficacyModifier(effect.id);
        logger.combat(`[EFFECT] Combatant: [${self.id}] is no longer dazed.`);

        return match;
    },
}

export default effect;