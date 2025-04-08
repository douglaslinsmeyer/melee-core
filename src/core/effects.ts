/**
 * StatusEffect interface
 * 
 * Applying this interface to an actor allows it to have status effects
 * that can be applied to itself or other actors.
 */
export interface Affectable {
    statusEffects: StatusEffect[];
    applyEffects(actors: Affectable[]): void;
    addStatusEffect(effect: StatusEffect): void;
    removeStatusEffects(criteria: StatusEffectCritera): void;
}

/**
 * StatusEffectCritera class
 * 
 * This class is used to define criteria for filtering status effects.
 */
export class StatusEffectCritera {
    name: string | null = null;
    type: string | null = null;
    duration: number | null = null;
    remainingDuration: number | null = null;
    appliedBy: string | null = null;

    matches(effect: StatusEffect): boolean {
        if (this.name && this.name !== effect.name) return false;
        if (this.type && this.type !== effect.type) return false;
        if (this.duration && this.duration !== effect.duration) return false;
        if (this.remainingDuration && this.remainingDuration !== effect.remainingDuration) return false;
        if (this.appliedBy && this.appliedBy !== effect.appliedBy) return false;
        return true;
    }
}

/**
 * StatusEffect interface
 * 
 * This interface defines the structure of a status effect
 * that can be applied to an actor in the game.
 */
export interface StatusEffect {
    name: string;
    description: string;
    type: string;
    duration: number;
    remainingDuration: number;
    appliedBy: string;
    apply: (targets: Affectable[]) => void;
}

/**
 * Applies status effects to a list of actors.
 * 
 * This function iterates through each actor in the list,
 * applies their status effects to themselves and other actors,
 * and decrements the remaining duration of each effect.
 * If the remaining duration reaches zero, the effect is removed.
 * 
 * @param actors - The list of actors to apply effects to
 * @returns void
 */
export function applyEffects(actors: Affectable[]): void {
    actors.forEach(actor => {        
        if (actor.statusEffects.length === 0) return;
        actor.statusEffects.forEach(effect => {
            effect.apply(actors);
            effect.remainingDuration--;
            if (effect.remainingDuration <= 0) {
                actor.statusEffects = actor.statusEffects.filter(e => e !== effect);
            }
        });
    });
}