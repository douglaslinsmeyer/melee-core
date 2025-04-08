import { Dice } from 'dice-typescript';
import { EVENT } from '../events';
import { Match, MATCH_STATE } from '../match';
import { RuleBook } from '../rules';
import { logger } from '../logger';

const dice = new Dice();
export const standardRules = new RuleBook('Standard Rules', 'Standard rules for the game.');

// A rule that sets the match state to complete when the max rounds are reached
standardRules.addRule({
    name: 'core.win-condition.max-rounds',
    description: 'The match has ended when max rounds are reached, the winner is whichever combatant has the most health.',
    trigger: EVENT.ROUND_ENDED,
    priority: 1,
    apply: (match: Match) => {
        if (match.currentRound < match.rounds) return match;
        const maxHealth = Math.max(...match.combatants.map(c => c.health));
        match.winners = match.combatants.filter(c => c.health === maxHealth);
        match.state = MATCH_STATE.COMPLETE;
        logger.info(`Match ended. Winners: ${match.winners.map(c => c.name).join(', ')}`);
        return match;
    }
});

// A rule that sets the match status to "in progress" when the match starts
standardRules.addRule({
    name: 'core.match-status.started',
    description: 'The match status is set to "in progress" when the match starts.',
    trigger: EVENT.MATCH_STARTED,
    priority: 1,
    apply: (match: Match) => {
        match.state = MATCH_STATE.IN_PROGRESS;
        logger.info('Match status set to in progress.');
        return match;
    }
});

// A rule for determining starting stats for a default combatant class
standardRules.addRule({
    name: 'core.starting-stats',
    description: 'Each combatant starts with default stats.',
    trigger: EVENT.COMBATANTS_ADDED,
    priority: 1,
    apply: (match: Match) => {
        match.combatants.forEach(combatant => {
            combatant.health = 100;
            combatant.maxHealth = 100;
            combatant.initiativeModifier = 0;
            combatant.attackModifier = 0;
            combatant.defenseModifier = 0;
            logger.info(`Combatant ${combatant.bot.name} assigned starting stats.`);
        });
        logger.info('All combatants have been assigned starting stats.');
        return match;
    }
});

// A rule for determing the winner of the match

// A rule for rolling for initiative at the start of each round
standardRules.addRule({
    name: 'core.roll-for-initiative',
    description: 'At the start of each round, each combatant rolls for initiative.',
    trigger: EVENT.ROUND_STARTED,
    priority: 1,
    apply: (match: Match) => {
        match.combatants.forEach(combatant => {
            combatant.initiative = dice.roll('1d20').total + combatant.initiativeModifier;
            logger.info(`Combatant ${combatant.bot.name} rolled for initiative: ${combatant.initiative}`);
        });
        logger.info('All combatants have rolled for initiative.');
        return match;
    }
});