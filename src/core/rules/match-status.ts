import { logger } from '../logger';
import { Match } from '../match';
import { EVENT } from '../events';
import { RuleInterface } from '../rules';
import { MATCH_STATE } from '../match';

// A rule that sets the match state to complete when the max rounds are reached
const rule: RuleInterface = {
    name: 'match-status.started',
    description: 'The match status is set to "in progress" when the match starts.',
    trigger: EVENT.MATCH_STARTED,
    apply: (trigger: string, match: Match) => {
        match.state = MATCH_STATE.IN_PROGRESS;
        logger.info('Match status set to in progress.');
        return match;
    }
}

export default rule;