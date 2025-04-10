import { EffectType, TargetScope, StatusEffectInterface, StatusEffectInstance } from '../effects';
import { Match } from '../match';
import { logger } from '../logger';

const effect: StatusEffectInterface = {
    name: "Dazed",
    description: "The target is dazed and is sluggish and disoriented.",
    type: EffectType.DETRIMENTAL,
    targetScope: TargetScope.ALL,
    tier: 0,
    apply: (effect: StatusEffectInstance, match: Match): void => {
        const self = match.getCombatant(effect.target);
        self.addEfficacyModifier({
            id: effect.id,
            name: effect.model.name,
            value: -50,
        });
        logger.combat(`[EFFECT] Combatant: [${self.id}] is now dazed.`);
    },
    tick: (effect: StatusEffectInstance, match: Match): void => {
    },
    reset: (effect: StatusEffectInstance, match: Match): void => {
        const self = match.getCombatant(effect.target);
        self.removeEfficacyModifier(effect.id);
        logger.combat(`[EFFECT] Combatant: [${self.id}] is no longer dazed.`);
    },
}

export default effect;