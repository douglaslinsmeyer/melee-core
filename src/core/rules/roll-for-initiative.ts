import { logger } from '../logger';
import { Match } from '../match';
import { Event } from '../events';
import { RuleInterface } from '../rules';
import { dice } from '../dice';

// A rule that sets the match state to complete when the max rounds are reached
const rule: RuleInterface = {
    name: 'roll-for-initiative',
    description: 'At the start of each round, each combatant rolls for initiative.',
    trigger: Event.ROUND_STARTED,
    apply: (trigger: string, match: Match) => {
        match.combatants.forEach(combatant => {
            combatant.initiative = dice.roll('1d20').total + combatant.initiativeModifier;
            logger.combat(`[INITIATIVE]: The combatant:[${combatant.id}] rolled for initiative:[${combatant.initiative}]`);
            logger.info(`Combatant ${combatant.id} rolled for initiative: ${combatant.initiative}.`);
        });
        logger.info('All combatants have rolled for initiative.');
        return match;
    }
}

export default rule;