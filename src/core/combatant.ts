import { Locatable, Location, LocationInterface, Moveable } from "./movement";
import { Affectable, StatusEffectCollection } from "./effects";
import { Bot, BotInterface } from "./bot";
import { v4 as uuidv4 } from 'uuid';

interface StatModifierInterface {
    id: string;
    name: string;
    value: number;
}

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
    _healthModifiers: StatModifierInterface[] = [];

    _initiative: number = 0;
    _initiativeModifiers: StatModifierInterface[] = [];
    
    _defense: number = 0;
    _defenseModifiers: StatModifierInterface[] = [];
    
    _attack: number = 0;
    _attackModifiers: StatModifierInterface[] = [];

    _movementSpeed: number = 0;
    _movementSpeedModifiers: StatModifierInterface[] = [];

    _efficacy: number = 100;
    _efficacyModifiers: StatModifierInterface[] = [];
    
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

    public addMaxHealthModifier(modifier: StatModifierInterface): void {
        this._healthModifiers.push(modifier);
    }

    public removeMaxHealthModifier(id: string): void {
        const index = this._healthModifiers.findIndex(m => m.id === id);
        if (index !== -1) {
            this._healthModifiers.splice(index, 1);
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

    private calculateModifierSum(statModifiers: StatModifierInterface[]): number {
        return statModifiers.reduce((sum: number, modifier: StatModifierInterface) => sum + modifier.value, 0);
    }
}