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
        //logger.info(`AlphaBot received request: ${JSON.stringify(input)}`);
        const enemies = input.match.combatants.filter(combatant => combatant.id !== input.self.id);
        if (enemies.length === 0) {
            logger.warn(`No enemies found for combatant ${input.self.id}`);
            return {
                id: this.name, 
                secret: this.key, 
                action: 'movements.wait', 
                target: input.self.id
            };
        }

        return {
            id: this.name, 
            secret: this.key, 
            action: 'attacks.jab', 
            target: enemies[0].id
        };
    }
}