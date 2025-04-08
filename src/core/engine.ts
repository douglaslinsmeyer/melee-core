import { Combatant } from "./combatant";
import { IOHandler } from "./io";
import { Match, MATCH_STATE } from "./match";
import { RuleBook } from "./rules";
import { EVENT } from "./events";
import { logger } from "./logger";

export class Engine {

    io: IOHandler;
    ruleBook: RuleBook;

    constructor(ioHandler: IOHandler, ruleBook: RuleBook) {
        this.io = ioHandler;
        this.ruleBook = ruleBook;
        logger.info("Engine initialized");
    }

    run(combatants: Combatant[]): Match {
        let match = new Match();
        match = this.start(match, combatants);
        while (match.state !== MATCH_STATE.COMPLETE) {
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
        logger.info("Match started");
        return match;
    }

    advance(match: Match): Match {
        this.ruleBook.trigger(EVENT.ROUND_STARTED, match);
        match.currentRound++;

        if (match.currentRound > match.rounds) {
            this.end(match);
            return match;
        }

        logger.info(`Round ${match.currentRound} started`);
        match.combatants.sort((a, b) => b.initiative - a.initiative);
        match.combatants.forEach(combatant => {
            const action = this.io.call(combatant.bot.uri, combatant, match);
            logger.info(`Combatant ${combatant.bot.name} performed action: ${JSON.stringify(action)}`);
        });

        this.ruleBook.trigger(EVENT.ROUND_ENDED, match);
        return match;
    }

    end(match: Match): Match {
        this.ruleBook.trigger(EVENT.MATCH_ENDED, match);
        return match
    }
}