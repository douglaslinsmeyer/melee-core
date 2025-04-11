import { RuleBook } from '../rules/rules';
import * as Rule from '../rules/rule/index';

export default function (): RuleBook { 
    const rulebook = new RuleBook('core');
    rulebook.addRule(new Rule.LastSurvivorRule());
    rulebook.addRule(new Rule.MatchStatusRule());
    rulebook.addRule(new Rule.MaxRoundsRule(25));
    rulebook.addRule(new Rule.OffensiveActionsRule());
    rulebook.addRule(new Rule.RollForInitiativeRule());
    rulebook.addRule(new Rule.StartingStatsRule());
    rulebook.addRule(new Rule.TickEffectsRule());
    return rulebook;
}