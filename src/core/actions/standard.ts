import { ActionInputInterface, ActionInterface } from "../actions";
import { Match } from "../match";
import { Dice } from 'dice-typescript';
import { logger } from "../logger";

export const standardActions: ActionInterface[] = [];

enum CATEGORY {
    ATTACK = 'Attacks',
    MOVEMENT = 'Movements',
}

standardActions.push({
    name: 'core.move-toward',
    description: 'Move your combatant to a new position.',
    category: CATEGORY.MOVEMENT,
    apply: (input: ActionInputInterface, match: Match): Match => {
        const self = match.combatants.find(c => c.id === input.combatantId);
        const target = match.combatants.find(c => c.id === input.targetId);
        if (!self || !target) {
            logger.error('Invalid input: combatant or target not found.');
            throw new Error('Invalid input: combatant or target not found.');
        }
        
        self.location.moveToward(target.location, self.movementSpeed);
        logger.info(`Combatant ${self.name} moved toward ${target.name}.`);
        logger.info(`Combatant ${self.name} is now ${self.location.distanceTo(target.location)} units away from ${target.name}.`);

        return match;
    }
});
