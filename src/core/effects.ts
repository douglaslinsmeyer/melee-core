import { logger } from "./logger";
import { Match } from "./match";
import { v4 as uuidv4 } from 'uuid';

export enum Type {
    Beneficial = 'Beneficial',
    Neutral = 'Neutral',
    Detrimental = 'Detrimental',
}

export enum TargetScope {
    Self = 'Self',
    Other = 'Other',
    Ally = 'Ally',
    Enemy = 'Enemy',
    All = 'All'
}


/**
 * StatusEffect interface
 * 
 * Applying this interface to an actor allows it to have status effects
 * that can be applied to itself or other actors.
 */
export interface Affectable {
    effects: StatusEffectCollection;
}

/**
 * StatusEffect interface
 * 
 * This interface defines the structure of a status effect
 * that can be applied to an actor in the game.
 */
export interface StatusEffectInterface {
    name: string;
    description: string;
    domain?: string;
    tier: number;
    type: Type;
    targetScope: TargetScope;
    apply: (match: Match, source: string, target: string) => void;
}

/**
 * StatusEffectInstance class
 * 
 * This class represents an instance of a status effect applied to an actor.
 */
class StatusEffectInstance {
    model: StatusEffectInterface;
    id: string;
    source: string;
    target: string;
    remaining: number;

    constructor(effect: StatusEffectInterface, source: string, target: string, duration: number) {
        this.model = effect;
        this.id = uuidv4();
        this.source = source;
        this.target = target;
        this.remaining = duration;
    }
}

export function StatusEffect(effect: StatusEffectInterface, source: string, target: string, duration: number): StatusEffectInstance {
    return new StatusEffectInstance(effect, source, target, duration);
}

/**
 * StatusEffectCollection class
 * 
 * This class represents a collection of status effects applied to an actor.
 */
export class StatusEffectCollection {
    
    effects: StatusEffectInstance[] = [];

    add(effect: StatusEffectInstance): void {
        if (this.isInvalidTargetForEffect(effect)) return;
        if (this.alreadyHasBetter(effect)) return;
        this.effects.push(effect);
        logger.combat(`[EFFECT:ADD] Effect: [${effect.model.name}] applied to [${effect.target}] by [${effect.source}].`);
    }

    remove(effect: StatusEffectInstance): void {
        const index = this.effects.findIndex(e => e.model.name === effect.model.name);
        if (index === -1) return;
        this.effects.splice(index, 1);
    }

    has(effect: StatusEffectInstance): boolean {
        return this.effects.some(e => e.model.name === effect.model.name);
    }

    tick(match: Match): void {
        this.effects.forEach(effect => {
            effect.model.apply(match, effect.source, effect.target);
            effect.remaining--;
            if (effect.remaining <= 0) this.remove(effect);
        });
    }

    private alreadyHasBetter(effect: StatusEffectInstance): boolean {
        if (!effect.model.domain) return false;
        const existingEffect = this.effects.find(e => e.model.domain === effect.model.domain);
        if (!existingEffect) return false;
        if (existingEffect.model.tier > effect.model.tier) {
            logger.combat(`[EFFECT:INVALID] Effect: [${effect.model.name}] is not better than the existing effect: [${existingEffect.model.name}] in the same domain: [${effect.model.domain}].`);
            return true;
        }

        return false;
    }

    private isInvalidTargetForEffect(effect: StatusEffectInstance): boolean {
        if (effect.model.targetScope === TargetScope.Self && effect.target !== effect.source) {
            logger.combat(`[EFFECT:INVALID] Effect: [${effect.model.name}] is a self-only effect and cannot be applied to: [${effect.target}] by [${effect.source}].`);
            return true;
        }

        if (effect.model.targetScope === TargetScope.Other && effect.target === effect.source) {
            logger.combat(`[EFFECT:INVALID] Effect: [${effect.model.name}] cannot be applied to self: [${effect.source}].`);
            return true;
        }

        if (effect.model.targetScope === TargetScope.Enemy && effect.target === effect.source) {
            logger.combat(`[EFFECT:INVALID] Effect: [${effect.model.name}] cannot be applied to self: [${effect.source}].`);
            return true;
        }

        return false;
    }
}
