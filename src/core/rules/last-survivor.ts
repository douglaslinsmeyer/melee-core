import { logger } from '../logger';
import { Match } from '../match';
import { Event } from '../events';
import { RuleInterface } from '../rules';
import { State as MatchState } from '../match';

// A rule that sets the match state to complete when the max rounds are reached
const rule: RuleInterface = {
    name: 'win-condition.last-survivor',
    description: 'The match will end when only one combatant remains with health > 0; that combatant is the winner.',
    category: 'win_conditions',
    trigger: Event.ACTION_PERFORMED,
    visible: true,
    apply: (trigger: string, match: Match) => {
        const survivingCombatants = match.combatants.filter(c => c.health > 0);
        if (survivingCombatants.length !== 1) return match;
        match.winners = survivingCombatants;
        match.state = MatchState.COMPLETE;
        logger.combat(`[MATCH:COMPLETE] The match has ended as there is only one survivor. Winner(s): [${match.winners[0].id}]`);
        logger.info(`Match ended due to only one survivor remaining. Winner(s): ${match.winners[0].id}.`);
        return match;
    }
}

export default rule;