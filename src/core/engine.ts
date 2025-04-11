import { IO } from "./io/io";
import { Match, MatchState } from "./match";
import { Event } from "./events";
import { logger, combatLoggerArray } from "./logger";
import { ActionInputInterface } from "./actions";

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
        logger.info(combatLoggerArray.map(obj => obj[0]).join("\n"));
    }
    
    start(match: Match): void {
        match.ruleBook.trigger(Event.MATCH_STARTED, match);
        logger.combat(`[MATCH:STARTED]: The match started with [${match.combatants.length}] combatants.`);
    }

    advance(match: Match): void {
        match.currentRound++;
        logger.combat(`[ROUND:${match.currentRound}:STARTED]: Round No. [${match.currentRound}] started.`);
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
            match.actionSet.apply(actionInput, match);
            logger.combat(`[ACTION] Combatant: [${combatant.id}] performed action: [${actionInput.action}] on target: [${actionInput.targetId}].`);
            match.ruleBook.trigger(Event.ACTION_PERFORMED, match);
        });
        
        match.ruleBook.trigger(Event.ROUND_ENDED, match);
        logger.combat(`[ROUND:${match.currentRound}:ENDED]: Round No. [${match.currentRound}] ended.`);
    }

    end(match: Match): void {
        match.ruleBook.trigger(Event.MATCH_ENDED, match);
        logger.combat(`[MATCH:ENDED]: The match ended. The winner(s) are: [${match.winners.map(w => w.id).join(", ")}]`);
        for (const combatant of match.combatants) {
            this._io.call(combatant, match);
            logger.info(`Combatant ${combatant.id} received end of match notification.`);
        }
    }
}