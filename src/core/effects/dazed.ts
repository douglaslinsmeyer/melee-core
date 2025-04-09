import { StatusEffect, Type, TargetScope } from '../effects';
import { Match } from '../match';

export default function (appliedBy: string, appliedTo: string): StatusEffect {

    const duration = 3;

    const effect: StatusEffect = {
        name: "Dazed",
        description: "The target is dazed and cannot act.",
        type: Type.Detrimental,
        targetScope: TargetScope.All,
        tier: 0,
        duration: duration,
        apply: (match: Match) => {
            
        },
    }

    return effect;
};