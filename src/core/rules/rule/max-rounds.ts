import { logger } from '../../logger';
import { Match } from '../../match';
import { Event } from '../../events';
import { RuleCategory, RuleInterface } from '../rules';
import { MatchState } from '../../match';

export class MaxRoundsRule implements RuleInterface {
    name: string = 'win-condition.max-rounds';
    description: string = 'The match will end if the round limit is reached; the winner will be whichever combatant has the most health.';
    trigger: Event[] = [Event.ROUND_ENDED, Event.MATCH_STARTED];
    visible: boolean = true;
    category: string = RuleCategory.VICTORY_CONDITION;
    priority: number = 1;
    roundLimit: number = 0;

    constructor(rounds: number) {
        if (rounds < 1) {
            throw new Error(`MaxRounds must be greater than 0.`);
        }
        this.roundLimit = rounds;
    }

    apply(trigger: string, match: Match): void {
        if (trigger === Event.MATCH_STARTED) this.setMaxRounds(match);
        if (trigger === Event.ROUND_ENDED) this.checkRoundLimit(match);
    }

    private setMaxRounds(match: Match): void {
        match.rounds = this.roundLimit;
        logger.combat(`[MATCH:ROUND_LIMIT] Round limit set to [${this.roundLimit}].`);
    }

    private checkRoundLimit(match: Match): void {
        if (match.currentRound >= match.rounds) {
            const maxHealth = Math.max(...match.combatants.map(c => c.health));
            match.winners = match.combatants.filter(c => c.health === maxHealth);
            match.state = MatchState.COMPLETE;
            logger.combat(`[MATCH:COMPLETE] The match has ended due to reaching round limit.`);
        }
    }
}