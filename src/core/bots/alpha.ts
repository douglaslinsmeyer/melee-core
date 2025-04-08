import { IORequest, IOResponse } from "../io";
import { logger } from "../logger";
import { Match } from "../match";

export class AlphaBot {
    name: string;
    key: string;

    constructor() {
        this.name = 'alpha';
        this.key = 'alpha-secret-key';
    }

    respond(input: IORequest): IOResponse {

        logger.info(`AlphaBot received request: ${JSON.stringify(input)}`);

        return {
            id: this.name, 
            secret: this.key, 
            action: 'ATTACK', 
            target: 'ENEMY'
        };
    }
}