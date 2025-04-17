import * as Rules from '@/core/rules';

export const standard = new Rules.RuleBook('core');
    standard.addRule(new Rules.LastSurvivorRule())
        .addRule(new Rules.MatchStatusRule())
        .addRule(new Rules.MaxRoundsRule(50))
        .addRule(new Rules.OffensiveActionsRule())
        .addRule(new Rules.RollForInitiativeRule())
        .addRule(new Rules.StartingStatsRule())
        .addRule(new Rules.TickEffectsRule());