import { logger } from '../logger';
import { Match } from '../match';
import { Event } from '../events';
import { RuleInterface } from '../rules';
import { State as MatchState } from '../match';

let roundLimit = 10; // Default round limit

// A rule that sets the match state to complete when the max rounds are reached
const rule: RuleInterface = {
    name: 'win-condition.max-rounds',
    description: 'The match will end if the round limit is reached; the winner will be whichever combatant has the most health.',
    category: 'win_conditions',
    trigger: [
        Event.ROUND_ENDED,
        Event.MATCH_STARTED,
    ],
    visible: true,
    apply: (trigger: string, match: Match) => {
        switch (trigger) {
            case Event.MATCH_STARTED:
                match.rounds = roundLimit;
                logger.info(`Round limit set to ${roundLimit}.`);
                logger.combat(`[MATCH:ROUND_LIMIT] Round limit set to [${roundLimit}].`);
                break
            case Event.ROUND_ENDED:
                if (match.currentRound >= match.rounds) {
                    const maxHealth = Math.max(...match.combatants.map(c => c.health));
                    match.winners = match.combatants.filter(c => c.health === maxHealth);
                    match.state = MatchState.COMPLETE;
                    logger.combat(`[MATCH:COMPLETE] The match has ended due to reaching round limit.`);
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