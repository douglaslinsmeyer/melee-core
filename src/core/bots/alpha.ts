import { IORequest, IOResponse } from "../io";
import { logger } from "../logger";

export class AlphaBot {
    name: string;
    key: string;

    constructor() {
        this.name = 'alpha';
        this.key = 'alpha-secret-key';
    }

    respond(input: IORequest): IOResponse {

        logger.info(`AlphaBot received request: ${JSON.stringify(input)}`);

        const enemies = input.match.combatants.filter(combatant => combatant.id !== input.combatant.id);

        if (enemies.length === 0) {
            logger.warn(`No enemies found for combatant ${input.combatant.id}`);
            return {
                id: this.name, 
                secret: this.key, 
                action: 'WAIT', 
                target: input.combatant.id
            };
        }

        return {
            id: this.name, 
            secret: this.key, 
            action: 'ATTACK', 
            target: enemies[0].id
        };
    }
}