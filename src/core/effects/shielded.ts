import { EffectType, TargetScope, StatusEffectInterface, StatusEffectInstance } from '../effects';
import { Match } from '../match';
import { dice } from '../dice';
import { logger } from '../logger';

const effect: StatusEffectInterface = {
    name: 'Shielded',
    description: "The target gains a defensive shield, increasing their defense.",
    type: EffectType.Defensive,
    targetScope: TargetScope.Self,
    tier: 0,
    apply: (effect: StatusEffectInstance, match: Match): void => {
        const defenseModifierValue = dice.roll('1d10').total;
        const self = match.getCombatant(effect.target);
        self.addDefenseModifier({
            id: effect.id,
            name: effect.model.name,
            value: defenseModifierValue,
        });
        logger.combat(`[EFFECT] Combatant: [${self.id}] is shielded. [Defense: +${defenseModifierValue}].`);
    },
    tick: (effect: StatusEffectInstance, match: Match): void => {
    },
    reset: (effect: StatusEffectInstance, match: Match): void => {
        const self = match.getCombatant(effect.target);
        self.removeDefenseModifier(effect.id);
        logger.combat(`[EFFECT] Combatant: [${self.id}] is no longer shielded.`);
    },
    
}

export default effect;