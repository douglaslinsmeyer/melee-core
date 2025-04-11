import { RuleBook } from './rules';
import * as Rules from './index';

export const standard = new RuleBook('core');
    standard.addRule(new Rules.LastSurvivorRule())
        .addRule(new Rules.MatchStatusRule())
        .addRule(new Rules.MaxRoundsRule(50))
        .addRule(new Rules.OffensiveActionsRule())
        .addRule(new Rules.RollForInitiativeRule())
        .addRule(new Rules.StartingStatsRule())
        .addRule(new Rules.TickEffectsRule());