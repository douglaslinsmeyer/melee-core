import { logger } from '../../logger';
import { Match } from '../../match';
import { Event } from '../../events';
import { RuleCategory, RuleInterface } from '../rules';
import { dice } from '../../dice';

export class RollForInitiativeRule implements RuleInterface {
    name: string = 'roll-for-initiative';
    description: string = 'At the start of each round, each combatant rolls for initiative.';
    trigger: Event[] = [Event.ROUND_STARTED];
    visible: boolean = false;
    category: string = RuleCategory.CORE;
    priority: number = 1;
    apply(trigger: string, match: Match): void {
        match.combatants.forEach(combatant => {
            combatant.initiative = dice.roll('1d20').total;
            logger.combat(`[INITIATIVE]: The combatant:[${combatant.id}] rolled for initiative:[${combatant.initiative}]`);
        });
    }
}