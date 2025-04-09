import { StatusEffectInterface, Type, TargetScope } from '../effects';
import { Match } from '../match';

const effect: StatusEffectInterface = {
    name: "Blinded",
    description: "The target is blinded and cannot see.",
    type: Type.Detrimental,
    targetScope: TargetScope.All,
    tier: 0,
    apply: (match: Match, source: string, target: string): void => {
        const self = match.getCombatant(target);
        self.efficacy = 10;
    },
}

export default effect;