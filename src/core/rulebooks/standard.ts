import { RuleBook } from '../rules';
import MaxRounds from '../rules/max-rounds';
import RollForInitiative from '../rules/roll-for-initiative';
import MatchStatus from '../rules/match-status';
import StartingStats from '../rules/starting-stats';
import LastSurvivor from '../rules/last-survivor';

export default function (): RuleBook { 
    const rulebook = new RuleBook('core');
    rulebook.addRule(MaxRounds(25));
    rulebook.addRule(RollForInitiative);
    rulebook.addRule(MatchStatus);
    rulebook.addRule(StartingStats);
    rulebook.addRule(LastSurvivor);

    return rulebook;
}