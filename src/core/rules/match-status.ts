import { logger } from '../logger';
import { Match } from '../match';
import { Event } from '../events';
import { RuleInterface } from '../rules';
import { State as MatchState } from '../match';

// A rule that sets the match state to complete when the max rounds are reached
const rule: RuleInterface = {
    name: 'match-status.started',
    description: 'The match status is set to "in progress" when the match starts.',
    trigger: Event.MATCH_STARTED,
    apply: (trigger: string, match: Match) => {
        match.state = MatchState.IN_PROGRESS;
        logger.info('Match status set to in progress.');
        return match;
    }
}

export default rule;