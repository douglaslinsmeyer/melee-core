import { Combatant } from "./combatant";
import { IOHandler } from "./io";
import { Match, MATCH_STATE } from "./match";
import { RuleBook } from "./rules";
import { EVENT } from "./events";
import { logger } from "./logger";
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
        match = this.start(match, combatants);
        while (match.state !== MATCH_STATE.COMPLETE) {
            if (match.currentRound > infiniteLoopMaxRounds) {
                logger.error(infiniteLoopMaxRoundsMessage);
                throw new Error(infiniteLoopMaxRoundsMessage);
            }
            match = this.advance(match);
        }
        match = this.end(match);
        return match;
    }
    
    start(match: Match, combatants: Combatant[]): Match {
        combatants.forEach(combatant => {
            this.ruleBook.trigger(EVENT.PRE_COMBATANT_ADDED, match);
            match.addCombatant(combatant);
            this.ruleBook.trigger(EVENT.POST_COMBATANT_ADDED, match);
        });
        this.ruleBook.trigger(EVENT.COMBATANTS_ADDED, match);
        this.ruleBook.trigger(EVENT.MATCH_STARTED, match);
        logger.combat(`[MATCH:STARTED]: The match started with [${match.combatants.length}] combatants.`);
        logger.info(`Match started with ${match.combatants.length} combatants.`);
        return match;
    }

    advance(match: Match): Match {
        match.currentRound++;
        this.ruleBook.trigger(EVENT.ROUND_STARTED, match);
        logger.combat(`[ROUND:${match.currentRound}:STARTED]: Round No. [${match.currentRound}] started.`);
        logger.info(`Round ${match.currentRound} started.`);
        match.combatants.sort((a, b) => b.initiative - a.initiative);
        match.combatants.forEach(combatant => {
            const response = this.io.call(combatant.bot.uri, combatant, match, this.ruleBook, this.actions);
            logger.info(`Combatant ${combatant.id} performed action: ${response.action} targeting ${response.target}`);
            const actionInput: ActionInputInterface = {
                combatantId: combatant.id,
                targetId: response.target,
                action: response.action,
                params: response.params
            };
            match = this.actions.find(response.action).apply(actionInput, match);
            this.ruleBook.trigger(EVENT.ACTION_PERFORMED, match);
        });

        this.ruleBook.trigger(EVENT.ROUND_ENDED, match);
        return match;
    }

    end(match: Match): Match {
        this.ruleBook.trigger(EVENT.MATCH_ENDED, match);
        logger.combat(`[MATCH:ENDED]: The match ended. The winner(s) are: [${match.winners.map(w => w.id).join(", ")}]`);
        logger.info(`Match ended. The winner(s) are: ${match.winners.map(w => w.id).join(", ")}`);
        for (const combatant of match.combatants) {
            this.io.call(combatant.bot.uri, combatant, match, this.ruleBook, this.actions);
            logger.info(`Combatant ${combatant.id} received end of match notification.`);
        }
        return match;
    }
}