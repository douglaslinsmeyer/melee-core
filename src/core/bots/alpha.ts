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

        const match = input.match;

        

        return {
            id: this.name, 
            secret: this.key, 
            action: 'ATTACK', 
            target: 'ENEMY'
        };
    }
}