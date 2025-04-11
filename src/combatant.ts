import { Locatable, Location, LocationInterface, Moveable } from "./movement";
import { Affectable, StatusEffectCollection } from "./effects";
import { BotInterface } from "./bot";
import { v4 as uuidv4 } from 'uuid';

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
interface StatModifierInterface {
    id: string;
    name: string;
    value: number;
}

interface Damageable {
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

    private _efficacy: number = 100;
    private _efficacyModifiers: StatModifierInterface[] = [];

    constructor(bot: BotInterface, location: LocationInterface = new Location(0,0,0), className: string = 'default', faction: string = uuidv4()) {
        this.bot = bot;
        this.id = uuidv4();
        this.faction = faction;
        this.className = className;
        this.location = location;
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
        return this._maxHealth + this.calculateModifierSum(this._healthModifiers);
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
        return this._attack + this.calculateModifierSum(this._attackModifiers);
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
        return this._defense + this.calculateModifierSum(this._defenseModifiers);
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
        return this._initiative + this.calculateModifierSum(this._initiativeModifiers);
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

    public get efficacy(): number {
        return this._efficacy + this.calculateModifierSum(this._efficacyModifiers);
    }

    public set efficacy(value: number) {
        this._efficacy = value;
    }

    public get efficacyPercentage(): number {
        return this.efficacy / 100;
    }

    public addEfficacyModifier(modifier: StatModifierInterface): void {
        this._efficacyModifiers.push(modifier);
    }

    public removeEfficacyModifier(id: string): void {
        const index = this._efficacyModifiers.findIndex(m => m.id === id);
        if (index !== -1) {
            this._efficacyModifiers.splice(index, 1);
        }
    }

    public get movementSpeed(): number {
        return this._movementSpeed + this.calculateModifierSum(this._movementSpeedModifiers);
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
        this.health = Math.max(0, this.health - amount);
    }

    public heal(amount: number): void {
        this.health = Math.min(this.maxHealth, this.health + amount);
    }

    public isAlive(): boolean {
        return this.health > 0;
    }

    public moveToward(target: Locatable, distance: number) {
        distance = (distance > this.movementSpeed) ? this.movementSpeed : distance;
        this.location = this.location.moveToward(target.location, distance);
    }

    private calculateModifierSum(statModifiers: StatModifierInterface[]): number {
        return statModifiers.reduce((sum: number, modifier: StatModifierInterface) => sum + modifier.value, 0);
    }
}