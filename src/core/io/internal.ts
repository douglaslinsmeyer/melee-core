import { IODriverInterface, IORequest, IOResponse } from "../io";
import { AlphaBot } from "../bots/alpha";

export interface IOInternalBot {
    name: string;
    respond(input: IORequest): IOResponse;
}

export class IODriverInternal implements IODriverInterface {
    
    name: string = 'internal';
    bots: IOInternalBot[] = [];

    constructor() {
        this.registerBot(new AlphaBot());
    }

    registerBot(bot: IOInternalBot) {
        this.bots.push(bot);
    }

    getBot(name: string): IOInternalBot | undefined {
        return this.bots.find(bot => bot.name === name);
    }

    call(uri: string, request: IORequest): IOResponse {
        const decodedUri = new URL(uri);
        const bot = decodedUri.hostname;
        const botInstance = this.getBot(bot);
        if (!botInstance) {
            throw new Error(`Bot not found: ${bot}`);
        }
        const response = botInstance.respond(request);
        return response;
    }
}