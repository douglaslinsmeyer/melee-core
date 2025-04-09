import { Locatable, Location, LocationInterface, Moveable } from "./movement";
import { Affectable, StatusEffectCollection } from "./effects";
import { Bot, BotInterface } from "./bot";
import { v4 as uuidv4 } from 'uuid';

/**
 * Combatant class
 * 
 * This class represents a combatant in the game.
 * It implements the Locatable, Moveable, and Affectable interfaces.
 */
export class Combatant implements Locatable, Moveable, Affectable {
    
    bot: BotInterface;
    
    id: string;
    faction: string;
    className: string;

    health: number = 0;
    _maxHealth: number = 0;
    _healthModifiers: {[key: string]: number} = {};

    _initiative: number = 0;
    _initiativeModifiers: {[key: string]: number} = {};
    
    _defense: number = 0;
    _defenseModifiers: {[key: string]: number} = {};
    
    _attack: number = 0;
    _attackModifiers: {[key: string]: number} = {};

    _movementSpeed: number = 0;
    _movementSpeedModifiers: {[key: string]: number} = {};

    _efficacy: number = 100;
    _efficacyModifiers: {[key: string]: number} = {};
    
    location: LocationInterface;
    effects: StatusEffectCollection;

    constructor(bot: BotInterface, location: LocationInterface = new Location(0,0,0), className: string = 'default', faction: string = uuidv4()) {
        this.bot = bot;
        this.id = uuidv4();
        this.faction = faction;
        this.className = className;
        this.location = location;
        this.effects = new StatusEffectCollection();
    }

    public get maxHealth(): number {
        return this._maxHealth + this.calculateModifierSum(this._healthModifiers);
    }

    public set maxHealth(value: number) {
        this._maxHealth = value;
    }

    public addMaxHealthModifier(name: string, value: number): void {
        this._healthModifiers[name] = value;
    }

    public removeMaxHealthModifier(name: string): void {
        delete this._healthModifiers[name];
    }

    public get attack(): number {
        return this._attack + this.calculateModifierSum(this._attackModifiers);
    }

    public set attack(value: number) {
        this._attack = value;
    }

    public addAttackModifier(name: string, value: number): void {
        this._attackModifiers[name] = value;
    }

    public removeAttackModifier(name: string): void {
        delete this._attackModifiers[name];
    }
    
    public get defense(): number {
        return this._defense + this.calculateModifierSum(this._defenseModifiers);
    }

    public set defense(value: number) {
        this._defense = value;
    }
    public addDefenseModifier(name: string, value: number): void {
        this._defenseModifiers[name] = value;
    }

    public removeDefenseModifier(name: string): void {
        delete this._defenseModifiers[name];
    }

    public get initiative(): number {
        return this._initiative + this.calculateModifierSum(this._initiativeModifiers);
    }

    public set initiative(value: number) {
        this._initiative = value;
    }

    public addInitiativeModifier(name: string, value: number): void {
        this._initiativeModifiers[name] = value;
    }

    public removeInitiativeModifier(name: string): void {
        delete this._initiativeModifiers[name];
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

    public addEfficacyModifier(name: string, value: number): void {
        this._efficacyModifiers[name] = value;
    }

    public removeEfficacyModifier(name: string): void {
        delete this._efficacyModifiers[name];
    }

    public get movementSpeed(): number {
        return this._movementSpeed + this.calculateModifierSum(this._movementSpeedModifiers);
    }

    public set movementSpeed(value: number) {
        this._movementSpeed = value;
    }

    public addMovementSpeedModifier(name: string, value: number): void {
        this._movementSpeedModifiers[name] = value;
    }

    public removeMovementSpeedModifier(name: string): void {
        delete this._movementSpeedModifiers[name];
    }

    damage(amount: number): void {
        this.health = Math.max(0, this.health - amount);
    }

    heal(amount: number): void {
        this.health = Math.min(this.maxHealth, this.health + amount);
    }

    isAlive(): boolean {
        return this.health > 0;
    }

    moveToward(target: Locatable, distance: number) {
        distance = (distance > this.movementSpeed) ? this.movementSpeed : distance;
        this.location = this.location.moveToward(target.location, distance);
    }

    private calculateModifierSum(modifiers: {[key: string]: number}): number {
        return Object.values(modifiers).reduce((sum, value) => sum + value, 0);
    }
}