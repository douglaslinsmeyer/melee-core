import { Match } from '@/core/match';
import { Event } from '@/core/events';
import { RuleCategory, RuleInterface } from '@/core/rules';

export class StartingStatsRule implements RuleInterface {
    name: string = 'starting-stats';
    description: string = 'Each combatant starts with basic stats.';
    trigger: Event[] = [Event.MATCH_STARTED];
    visible: boolean = false;
    category: string = RuleCategory.CORE;
    priority: number = 1;
    apply(trigger: string, match: Match): void {
        match.combatants.forEach(combatant => {
            combatant.maxHealth = 100;
            combatant.health = 100;
            combatant.initiative = 0;
            combatant.attack = 0;
            combatant.defense = 0;
            combatant.movementSpeed = 5;
        });
    }
}