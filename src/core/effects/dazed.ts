import { StatusEffectInterface, Type } from '../effects';

export default function (appliedBy: string, appliedTo: string): StatusEffectInterface {

    const duration = 3;

    const effect: StatusEffectInterface = {
        name: "Dazed",
        description: "The target is dazed and cannot act.",
        type: Type.Debuff,
        duration: duration,
        remaining: duration,
        appliedBy: appliedBy,
        appliedTo: appliedTo,
        apply: (match) => {
            const self = match.combatants.find(c => c.id === appliedTo);
            if (!self) {
                throw new Error(`Combatant with ID ${appliedTo} not found.`);
            }

            self.
        }
    }

    return effect;
};