import { Type, TargetScope, StatusEffectInterface } from '../effects';
import { Match } from '../match';

const effect: StatusEffectInterface = {
    name: "Dazed",
    description: "The target is dazed and is sluggish and disoriented.",
    type: Type.Detrimental,
    targetScope: TargetScope.All,
    tier: 0,
    apply: (match: Match, source: string, target: string): void => {
        const self = match.getCombatant(target);
        self.efficacy = 50;
    },
}

export default effect;