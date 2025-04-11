import { Match } from "../../match";
import { Event } from '../../events';
import { RuleCategory, RuleInterface } from '../rules';

export class TickEffectsRule implements RuleInterface {
    name: string = 'tick-effects';
    description: string = 'This rule determines how effects are applied to combatants each tick.';
    trigger: Event[] = [Event.ROUND_STARTED];
    visible: boolean = false;
    category: string = RuleCategory.CORE;
    priority: number = 1;
    apply(trigger: string, match: Match): void {
        match.combatants.forEach(combatant => {
            if (combatant.effects) combatant.effects.tick(match);
        });
    }
}