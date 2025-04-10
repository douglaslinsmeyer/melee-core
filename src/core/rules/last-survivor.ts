import { logger } from '../logger';
import { Match } from '../match';
import { Event } from '../events';
import { RuleCategory, RuleInterface } from '../rules';
import { MatchState } from '../match';

export class LastSurvivorRule implements RuleInterface {
    name: string = 'win-condition.last-survivor';
    description: string = 'The match will end when only one combatant remains with health > 0; that combatant is the winner.';
    trigger: Event[] = [Event.ACTION_PERFORMED];
    visible: boolean = true;
    priority: number = 1;
    category: string = RuleCategory.VICTORY_CONDITION;
    apply(trigger: string, match: Match): void {
        const survivingCombatants = match.combatants.filter(c => c.health > 0);
        const allSameFaction = survivingCombatants.every(c => c.faction === survivingCombatants[0].faction);
        if (!allSameFaction) return;
        match.winners = survivingCombatants;
        match.state = MatchState.COMPLETE;
        logger.combat(`[MATCH:COMPLETE] The match has ended as there is only one survivor.`);
    }
}