import { Match } from '@/core/match';
import { Event } from '@/core/events';
import { RuleInterface } from '@/core/rules';
import { MatchState } from '@/core/match';

export class MatchStatusRule implements RuleInterface {
    name: string = 'match-status';
    description: string = 'The match status is set to "in progress" when the match starts.';
    trigger: Event[] = [Event.MATCH_STARTED];
    visible: boolean = true;
    category: string = 'match-status';
    priority: number = 1;
    apply(trigger: string, match: Match): void {
        match.state = MatchState.IN_PROGRESS;
    }
}