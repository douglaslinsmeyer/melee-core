import { Combatant } from "./combatant";
import { IOHandler } from "./io";
import { Match, State as MatchState } from "./match";
import { RuleBook } from "./rules";
import { Event } from "./events";
import { logger, combatLoggerArray } from "./logger";
import { ActionSet, ActionInputInterface } from "./actions";

const infiniteLoopMaxRounds = 100;
const infiniteLoopMaxRoundsMessage = `Infinite loop detected. The match has been stopped after ${infiniteLoopMaxRounds} rounds.`;

export class Engine {

    io: IOHandler;
    ruleBook: RuleBook;
    actions: ActionSet;

    constructor(ioHandler: IOHandler) {
        this.io = ioHandler;
        this.ruleBook = new RuleBook();
        this.actions = new ActionSet();
        logger.info("Engine initialized");
    }

    run(combatants: Combatant[]): Match {
        let match = new Match();
        this.start(match, combatants);
        while (match.state !== MatchState.COMPLETE) {
            if (match.currentRound > infiniteLoopMaxRounds) {
                logger.error(infiniteLoopMaxRoundsMessage);
                throw new Error(infiniteLoopMaxRoundsMessage);
            }
            this.advance(match);
        }
        this.end(match);

        logger.info(combatLoggerArray.map(obj => obj[0]).join("\n"));

        return match;
    }
    
    start(match: Match, combatants: Combatant[]): void {
        combatants.forEach(combatant => {
            this.ruleBook.trigger(Event.PRE_COMBATANT_ADDED, match);
            match.addCombatant(combatant);
            this.ruleBook.trigger(Event.POST_COMBATANT_ADDED, match);
        });
        this.ruleBook.trigger(Event.COMBATANTS_ADDED, match);
        this.ruleBook.trigger(Event.MATCH_STARTED, match);
        logger.combat(`[MATCH:STARTED]: The match started with [${match.combatants.length}] combatants.`);
    }

    advance(match: Match): void {
        match.currentRound++;
        logger.combat(`[ROUND:${match.currentRound}:STARTED]: Round No. [${match.currentRound}] started.`);
        this.ruleBook.trigger(Event.ROUND_STARTED, match);

        // Resolve combatant actions
        match.combatants.forEach(combatant => {
            if (combatant.health <= 0) return;
            const response = this.io.call(combatant.bot.uri, combatant, match, this.ruleBook, this.actions);
            const actionInput: ActionInputInterface = {
                combatantId: combatant.id,
                targetId: response.target,
                action: response.action,
                params: response.params
            };
            this.actions.find(response.action).apply(actionInput, match);

            combatant.effects.tick(match);
            this.ruleBook.trigger(Event.ACTION_PERFORMED, match, actionInput);
        });
        
        this.ruleBook.trigger(Event.ROUND_ENDED, match);
        logger.combat(`[ROUND:${match.currentRound}:ENDED]: Round No. [${match.currentRound}] ended.`);
    }

    end(match: Match): void {
        this.ruleBook.trigger(Event.MATCH_ENDED, match);
        logger.combat(`[MATCH:ENDED]: The match ended. The winner(s) are: [${match.winners.map(w => w.id).join(", ")}]`);
        logger.info(`Match ended. The winner(s) are: ${match.winners.map(w => w.id).join(", ")}`);
        for (const combatant of match.combatants) {
            this.io.call(combatant.bot.uri, combatant, match, this.ruleBook, this.actions);
            logger.info(`Combatant ${combatant.id} received end of match notification.`);
        }
    }
}