import { Locatable, Location, LocationInterface, Moveable } from "@/core/movements";
import { Affectable, StatusEffectCollection } from "@/core/effects";
import { BotInterface } from "@/core/bot";
import { v4 as uuidv4 } from 'uuid';

/**
 * StatModifierType
 * 
 * This enum defines the types of stat modifiers that can be applied to a combatant's stats.
 */
export enum StatModifierType {
    PERCENTAGE = 'percentage',
    FLAT = 'flat'
}

/**
 * StatModifierInterface
 * 
 * This interface defines the structure of a stat modifier
 * that can be applied to a combatant's stats.
 * 
 * Stat modifiers are used to modify the combatant's stats
 * such as health, attack, defense, initiative, movement speed, and efficacy.
 * The combatant's stat modifier is equal to the sum of all the status modifiers
 * applied to it.
 */
export interface StatModifierInterface {
    id: string;
    name: string;
    type: StatModifierType;
    value: number;
}

/**
 * Damageable
 * 
 * This interface defines the structure of a damageable entity.
 * It includes methods for dealing damage, healing, and checking if the entity is alive.
 */
export interface Damageable {
    damage(amount: number): void;
    heal(amount: number): void;
    isAlive(): boolean;
}

/**
 * Combatant class
 * 
 * This class represents a combatant in the game.
 */
export class Combatant implements Locatable, Moveable, Affectable, Damageable {
    
    public bot: BotInterface;
    public id: string;
    public faction: string;
    public className: string;
    public location: LocationInterface;
    public effects: StatusEffectCollection;

    private _health: number = 0;
    private _maxHealth: number = 0;
    private _healthModifiers: StatModifierInterface[] = [];

    private _initiative: number = 0;
    private _initiativeModifiers: StatModifierInterface[] = [];
    
    private _defense: number = 0;
    private _defenseModifiers: StatModifierInterface[] = [];
    
    private _attack: number = 0;
    private _attackModifiers: StatModifierInterface[] = [];

    private _movementSpeed: number = 0;
    private _movementSpeedModifiers: StatModifierInterface[] = [];

    constructor(bot: BotInterface, location?: LocationInterface, className?: string, faction?: string ) {
        this.bot = bot;
        this.id = uuidv4();
        this.faction = faction || uuidv4();
        this.className = className || 'default';
        this.location = location || new Location();
        this.effects = new StatusEffectCollection();
    }

    public get health(): number {
        return this._health;
    }

    public set health(value: number) {
        if (value + this.health > this.maxHealth) value = this.maxHealth;
        this._health = value;
    }

    public get maxHealth(): number {
        return this.calculateModifiedStat(this._maxHealth, this._healthModifiers);
    }

    public set maxHealth(value: number) {
        this._maxHealth = value;
    }

    public addMaxHealthModifier(modifier: StatModifierInterface): void {
        this._healthModifiers.push(modifier);
    }

    public removeMaxHealthModifier(id: string): void {
        const modifier = this._healthModifiers.find(m => m.id === id);
        if (!modifier) return;
        this._healthModifiers.splice(this._healthModifiers.indexOf(modifier), 1);
        // If the modifier was positive, then check to ensure the current health is not greater than max health
        if (modifier.value > 0 && this.health > this.maxHealth) {
            this.health = this.maxHealth;
        }
    }

    public get attack(): number {
        return this.calculateModifiedStat(this._attack, this._attackModifiers);
    }

    public set attack(value: number) {
        this._attack = value;
    }

    public addAttackModifier(modifer: StatModifierInterface): void {
        this._attackModifiers.push(modifer);
    }

    public removeAttackModifier(id: string): void {
        const index = this._attackModifiers.findIndex(m => m.id === id);
        if (index !== -1) {
            this._attackModifiers.splice(index, 1);
        }
    }
    
    public get defense(): number {
        return this.calculateModifiedStat(this._defense, this._defenseModifiers);
    }

    public set defense(value: number) {
        this._defense = value;
    }
    public addDefenseModifier(modifier: StatModifierInterface): void {
        this._defenseModifiers.push(modifier);
    }

    public removeDefenseModifier(id: string): void {
        const index = this._defenseModifiers.findIndex(m => m.id === id);
        if (index !== -1) {
            this._defenseModifiers.splice(index, 1);
        }
    }

    public get initiative(): number {
        return this.calculateModifiedStat(this._initiative, this._initiativeModifiers);
    }

    public set initiative(value: number) {
        this._initiative = value;
    }

    public addInitiativeModifier(modifier: StatModifierInterface): void {
        this._initiativeModifiers.push(modifier);
    }

    public removeInitiativeModifier(id: string): void {
        const index = this._initiativeModifiers.findIndex(m => m.id === id);
        if (index !== -1) {
            this._initiativeModifiers.splice(index, 1);
        }
    }

    public get movementSpeed(): number {
        return this.calculateModifiedStat(this._movementSpeed, this._movementSpeedModifiers);
    }

    public set movementSpeed(value: number) {
        this._movementSpeed = value;
    }

    public addMovementSpeedModifier(modifier: StatModifierInterface): void {
        this._movementSpeedModifiers.push(modifier);
    }

    public removeMovementSpeedModifier(id: string): void {
        const index = this._movementSpeedModifiers.findIndex(m => m.id === id);
        if (index !== -1) {
            this._movementSpeedModifiers.splice(index, 1);
        }
    }

    public damage(amount: number): void {
        this._health = Math.max(0, this.health - amount);
    }

    public heal(amount: number): void {
        this._health = Math.min(this.maxHealth, this.health + amount);
    }

    public isAlive(): boolean {
        return this.health > 0;
    }

    public moveToward(target: Locatable, distance: number) {
        distance = (distance > this.movementSpeed) ? this.movementSpeed : distance;
        this.location = this.location.moveToward(target.location, distance);
    }

    private calculateModifiedStat(stat: number, modifiers: StatModifierInterface[]): number {
        let modifiedStat = stat;

        // Add all flat modifiers first
        for (const modifier of modifiers) {
            if (modifier.type === StatModifierType.FLAT) {
                modifiedStat += modifier.value;
            }
        }

        // Then apply percentage modifiers
        for (const modifier of modifiers) {
            if (modifier.type === StatModifierType.PERCENTAGE) {
                modifiedStat = modifiedStat * (1 + modifier.value);
            }
        }

        return modifiedStat;
    }
}