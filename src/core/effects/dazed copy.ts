import { StatusEffect, Type, TargetScope } from '../effects';
import { Match } from '../match';

export default function (appliedBy: string, appliedTo: string): StatusEffect {
    const effect: StatusEffect = {
        name: "Blinded",
        description: "The target is blinded and cannot see.",
        type: Type.Detrimental,
        targetScope: TargetScope.All,
        tier: 0,
        duration: 3,
        apply: (match: Match) => {
            const self = match.getCombatant(appliedTo);
            self.efficacy = 10;
        },
    }

    return effect;
};