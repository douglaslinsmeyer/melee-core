import { IORequest, IOResponse } from "../../../io";
import { logger } from "../../../../logger";
import { dice } from '../../../../dice';

const bot = {
    name: 'alpha',
    description: 'Alpha bot that randomly chooses to attack or defend.',
    uri: 'internal://alpha',
    key: 'alpha-secret-key',

    respond(input: IORequest): IOResponse {
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

        const number = dice.roll('1d20').total;
        const action = (number > 10) ? 'offense.jabs' : 'defense.block';
        
        return {
            id: this.name, 
            secret: this.key,
            action: action, 
            target: enemies[0].id
        };
    }
}

export default bot;