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
    name: string;
    faction: string | null = null; 
    className: string;

    health: number = 0;
    maxHealth: number = 0;

    initiative: number = 0;
    initiativeModifier: number = 0;
    
    defense: number = 0;
    defenseModifier: number = 0;
    
    attack: number = 0;
    attackModifier: number = 0;

    movementSpeed: number = 0;
    movementSpeedModifier: number = 0;
    
    location: LocationInterface;
    effects: StatusEffectCollection; 

    constructor(bot: BotInterface, location: LocationInterface, name: string, className: string) {
        this.bot = bot;
        this.id = uuidv4();
        this.name = name;
        this.className = className;
        this.location = location;
        this.effects = new StatusEffectCollection();
    }

    getAttack(): number {
        return this.attack + this.attackModifier;
    }

    getDefense(): number {
        return this.defense + this.defenseModifier;
    }

    getInitiative(): number {
        return this.initiative;
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
}

export class CombatantBuilder {
    combatant: Combatant;

    constructor() {
        this.combatant = this.reset();
    }

    reset() {
        return new Combatant(
            new Bot('', '', ''),
            new Location(0, 0, 0),
            'default',
            'default'
        );
    }

    setName(name: string): CombatantBuilder {
        this.combatant.name = name;
        return this;
    }

    setClassName(className: string): CombatantBuilder {
        this.combatant.className = className;
        return this;
    }

    setBot(bot: BotInterface): CombatantBuilder {
        this.combatant.bot = bot;
        return this;
    }

    setLocation(location: LocationInterface): CombatantBuilder {
        this.combatant.location = location;
        return this;
    }

    build(): Combatant {
        const combatant = this.combatant;
        this.combatant = this.reset();
        return combatant;
    }
}