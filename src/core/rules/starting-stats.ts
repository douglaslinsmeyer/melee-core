import { logger } from '../logger';
import { Match } from '../match';
import { Event } from '../events';
import { RuleInterface } from '../rules';

// A rule that sets the match state to complete when the max rounds are reached
const rule: RuleInterface = {
    name: 'starting-stats',
    description: 'Each combatant starts with basic stats.',
    trigger: Event.COMBATANTS_ADDED,
    apply: (trigger: string, match: Match) => {
        match.combatants.forEach(combatant => {
            combatant.health = 100;
            combatant.maxHealth = 100;
            combatant.initiative = 0;
            combatant.attack = 0;
            combatant.defense = 0;
            combatant.movementSpeed = 5;
            logger.info(`Combatant ${combatant.bot.name} assigned starting stats.`);
        });
        logger.info('All combatants have been assigned starting stats.');
        return match;
    }
}

export default rule;