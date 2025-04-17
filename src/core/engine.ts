import { IO } from "@/core/io";
import { Match, MatchState } from "@/core/match";
import { Event } from "@/core/events";
import { logger, combatLog } from "@/core/logger";
import { ActionInputInterface } from "@/core/actions";

const infiniteLoopMaxRounds = 100;
const infiniteLoopMaxRoundsMessage = `Infinite loop detected. The match has been stopped after ${infiniteLoopMaxRounds} rounds.`;

export class Engine {

    private _io: IO

    constructor(io: IO) {
        this._io = io;
        logger.debug("Engine initialized.");
    }

    run(match: Match): void {
        this.start(match);
        while (match.state !== MatchState.COMPLETE) {
            if (match.currentRound > infiniteLoopMaxRounds) {
                logger.error(infiniteLoopMaxRoundsMessage);
                throw new Error(infiniteLoopMaxRoundsMessage);
            }
            this.advance(match);
        }
        this.end(match);
        logger.info(combatLog.join("\n"));
    }
    
    start(match: Match): void {
        match.ruleBook.trigger(Event.MATCH_STARTED, match);
        logger.combat(`[MATCH:STARTED]: The match started with [${match.combatants.length}] combatants.`);
    }

    advance(match: Match): void {
        match.currentRound++;
        logger.combat(`[ROUND:STARTED]: Round No. [${match.currentRound}] started.`);
        match.ruleBook.trigger(Event.ROUND_STARTED, match);
        match.combatants.forEach(combatant => {
            if (combatant.health <= 0) return;
            const response = this._io.call(combatant, match);
            const actionInput: ActionInputInterface = {
                combatantId: combatant.id,
                targetId: response.target,
                action: response.action,
                params: response.params
            };
            logger.combat(`[ACTION:STARTED] Combatant: [${combatant.id}] performed action: [${actionInput.action}] on target: [${actionInput.targetId}].`);
            match.actionSet.apply(actionInput, match);
            match.ruleBook.trigger(Event.ACTION_PERFORMED, match);
        });
        
        match.ruleBook.trigger(Event.ROUND_ENDED, match);
        logger.combat(`[ROUND:ENDED]: Round No. [${match.currentRound}] ended.`);
    }

    end(match: Match): void {
        match.ruleBook.trigger(Event.MATCH_ENDED, match);
        logger.combat(`[MATCH:ENDED]: The match ended. The winner(s) are: [${match.winners.map(w => w.id).join(", ")}]`);
        for (const combatant of match.combatants) {
            this._io.call(combatant, match);
        }
    }
}