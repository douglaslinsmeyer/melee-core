import { logger } from '../logger';
import { Match } from '../match';
import { EVENT } from '../events';
import { RuleInterface } from '../rules';
import { MATCH_STATE } from '../match';

let roundLimit = 10; // Default round limit

// A rule that sets the match state to complete when the max rounds are reached
const rule: RuleInterface = {
    name: 'win-condition.max-rounds',
    description: 'The match will end if the round limit is reached; the winner will be whichever combatant has the most health.',
    category: 'win_conditions',
    trigger: [
        EVENT.ROUND_ENDED,
        EVENT.COMBATANTS_ADDED,
    ],
    visible: true,
    apply: (trigger: string, match: Match) => {
        switch (trigger) {
            case EVENT.COMBATANTS_ADDED:
                if (match.rounds !== roundLimit) {
                    match.rounds = roundLimit;
                    logger.info(`Round limit set to ${roundLimit}.`);
                    logger.combat(`[MATCH:ROUND_LIMIT] Round limit set to [${roundLimit}].`);
                }
                break
            case EVENT.ROUND_ENDED:
                if (match.currentRound >= match.rounds) {
                    const maxHealth = Math.max(...match.combatants.map(c => c.health));
                    match.winners = match.combatants.filter(c => c.health === maxHealth);
                    match.state = MATCH_STATE.COMPLETE;
                    logger.combat(`[MATCH:COMPLETE] The match has ended due to reaching round limit. Winner(s):[${match.winners.map(c => c.id).join(', ')}]`);
                    logger.info(`Match ended due to reaching round limit. Winner(s): ${match.winners.map(c => c.id).join(', ')}.`);
                }
                break
        }
        return match;
    }
}

export default function (MaxRounds: number): RuleInterface {
    if (MaxRounds < 1) {
        throw new Error(`MaxRounds must be greater than 0.`);
    }
    roundLimit = MaxRounds;
    return rule;
};