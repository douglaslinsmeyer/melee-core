import { logger } from '../logger';
import { Match } from '../match';
import { Event } from '../events';
import { RuleInterface } from '../rules';
import { ActionInputInterface, ActionType } from '../actions';
import { EffectType } from '../effects';

// A rule that sets the match state to complete when the max rounds are reached
const rule: RuleInterface = {
    name: 'offensive-ations',
    description: 'This rule applies any time an offensive action is performed.',
    trigger: Event.ACTION_PERFORMED,
    apply: (trigger: string, match: Match, action?: ActionInputInterface) => {
        if (!action) {
            logger.error('Invalid input: action not found.');
            throw new Error('Invalid input: action not found.');
        }
        const self = match.combatants.find(c => c.id === action.combatantId);
        if (!self) {
            logger.error('Invalid input: combatant not found.');
            throw new Error('Invalid input: combatant not found.');``
        }

        // Clear any defensive effects since the combatant is now offensive
        const defensiveEffects = self.effects.effects.filter(e => e.model.type === EffectType.Defensive);
        defensiveEffects.forEach(effect => {
            self.effects.remove(effect, match);
        });

        return match;
    }
}

export default rule;