export interface BotInterface {
    name: string;
    description: string;
    uri: string;
}

export class Bot implements BotInterface {
    name: string;
    description: string;
    uri: string;

    constructor(name: string, description: string, uri: string) {
        this.name = name;
        this.description = description;
        this.uri = uri;
    }
}