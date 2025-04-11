import { logger } from '../logger';
import { Match } from '../match';
import { Event } from '../events';
import { RuleCategory, RuleInterface } from '../rules';
import { EffectType } from '../effects';

export class OffensiveActionsRule implements RuleInterface {
    name: string = 'offensive-actions';
    description: string = 'This rule applies any time an offensive action is performed.';
    trigger: Event[] = [Event.ACTION_PERFORMED];
    visible: boolean = false;
    category: string = RuleCategory.CORE;
    priority: number = 1;
    apply(trigger: string, match: Match): void {
        const combatant = match.combatants.find(c => c.id === match.lastAction?.input.combatantId);
        // check if the combatant has any defensive effects active
        const defensiveEffects = combatant?.effects.all.filter(e => e.model.type === EffectType.DEFENSIVE);
        if (defensiveEffects && defensiveEffects.length > 0) {
            defensiveEffects.forEach(effect => {
                combatant?.effects.remove(effect, match);
            });
        }
    }
}