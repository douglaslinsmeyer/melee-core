import { StatusEffect, Type, TargetScope } from '../effects';
import { Match } from '../match';

export default function (appliedBy: string, appliedTo: string): StatusEffect {
    const effect: StatusEffect = {
        name: "Dazed",
        description: "The target is dazed and is sluggish and disoriented.",
        type: Type.Detrimental,
        targetScope: TargetScope.All,
        tier: 0,
        duration: 3,
        apply: (match: Match) => {
            const self = match.getCombatant(appliedTo);
            self.efficacy = 50;
        },
    }

    return effect;
};