import { logger } from "./logger";
import { Match } from "./match";
import { v4 as uuidv4 } from 'uuid';
import { Event } from "./events";

export enum EffectType {
    BENEFICIAL = 'Beneficial',
    NEUTRAL = 'Neutral',
    DETRIMENTAL = 'Detrimental',
    OFFENSIVE = 'Offensive',
    DEFENSIVE = 'Defensive',
}

export enum TargetScope {
    SELF = 'Self',
    OTHER = 'Other',
    ALLY = 'Ally',
    ENEMY = 'Enemy',
    ALL = 'All'
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
    type: EffectType;
    targetScope: TargetScope;
    isApplicable(effect: StatusEffectInstance, match: Match, context?: any): boolean;
    onApplication(effect: StatusEffectInstance, match: Match, context?: any): void;
    onTick(effect: StatusEffectInstance, match: Match, context?: any): void;
    onRemoval(effect: StatusEffectInstance, match: Match, context?: any): void;
}

/**
 * StatusEffectInstance class
 * 
 * This class represents an instance of a status effect applied to an actor.
 */
export class StatusEffectInstance {
    model: StatusEffectInterface;
    id: string;
    source: string;
    target: string;
    remaining: number;
    tickingStarted: boolean = false;

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
    
    private _effects: StatusEffectInstance[] = [];

    add(effect: StatusEffectInstance, match: Match): void {
        if (!effect.model.isApplicable(effect, match)) return;
        if (this.isInvalidTargetForEffect(effect, match)) return;
        if (this.alreadyHasBetter(effect, match)) return;
        this.removeByName(effect.model.name, match);
        this._effects.push(effect);
        effect.model.onApplication(effect, match);
    }

    get all(): StatusEffectInstance[] {
        return this._effects;
    }

    has(name: string): boolean {
        return this._effects.some(e => e.model.name === name);
    }

    removeByName(name: string, match: Match): void {
        const index = this._effects.findIndex(e => e.model.name === name);
        if (index === -1) return;
        const effect = this._effects[index];
        this._effects.splice(index, 1);
        effect.model.onRemoval(effect, match);
    }

    remove(effect: StatusEffectInstance, match: Match): void {
        const index = this._effects.findIndex(e => e.id === effect.id);
        if (index === -1) return;
        this._effects.splice(index, 1);
        effect.model.onRemoval(effect, match);
    }

    tick(match: Match): void {
        this._effects.forEach(effect => {
            if (false === effect.tickingStarted) {
                effect.tickingStarted = true;
                return;
            }
            effect.remaining--;
            if (effect.remaining <= 0) {
                this.remove(effect, match);
                return;
            }
            effect.model.onTick(effect, match);
        });
    }

    private alreadyHasBetter(effect: StatusEffectInstance, match: Match): boolean {
        if (!effect.model.domain) return false;
        const existingEffect = this._effects.find(e => e.model.domain === effect.model.domain);
        if (!existingEffect) return false;
        if (existingEffect.model.tier > effect.model.tier) return true;
        if (existingEffect.remaining > effect.remaining) return true;

        this.remove(existingEffect, match);

        return false;
    }

    private isInvalidTargetForEffect(effect: StatusEffectInstance, match: Match): boolean {
        if (effect.model.targetScope === TargetScope.SELF && effect.target !== effect.source) {
            logger.combat(`[EFFECT:INVALID] Effect: [${effect.model.name}] is a self-only effect and cannot be applied to: [${effect.target}] by [${effect.source}].`);
            return true;
        }

        if (effect.model.targetScope === TargetScope.OTHER && effect.target === effect.source) {
            logger.combat(`[EFFECT:INVALID] Effect: [${effect.model.name}] cannot be applied to self: [${effect.source}].`);
            return true;
        }

        if (effect.model.targetScope === TargetScope.ENEMY && effect.target === effect.source) {
            logger.combat(`[EFFECT:INVALID] Effect: [${effect.model.name}] cannot be applied to self: [${effect.source}].`);
            return true;
        }

        return false;
    }
}
