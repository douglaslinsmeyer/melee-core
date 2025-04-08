import { ActionInputInterface, ActionSet } from "../actions";
import { Match } from "../match";
import { logger } from "../logger";

export const standardActions = new ActionSet();

enum CATEGORY {
    ATTACK = 'ATTACKS',
    MOVEMENT = 'MOVEMENTS',
}

standardActions.addAction({
    name: 'core.move-toward',
    description: 'Move your combatant to a new position.',
    category: CATEGORY.MOVEMENT,
    params: {
        exampleProperty: "string, some example property.",
    },
    apply: (input: ActionInputInterface, match: Match): Match => {
        const self = match.combatants.find(c => c.id === input.combatantId);
        const target = match.combatants.find(c => c.id === input.targetId);
        if (!self || !target) {
            logger.error('Invalid input: combatant or target not found.');
            throw new Error('Invalid input: combatant or target not found.');
        }
        
        self.location.moveToward(target.location, self.movementSpeed);
        logger.combat(`[ACTION] Combatant: [${self.id}] moved toward target: [${target.id}].`);
        logger.info(`Combatant ${self.name} is now ${self.location.distanceTo(target.location)} units away from ${target.name}.`);

        return match;
    }
});
