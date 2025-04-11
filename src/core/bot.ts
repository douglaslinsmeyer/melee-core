import { IODriverInterface, IORequest, IOResponse } from "./io/io";

export interface BotInterface {
    name: string;
    description: string;
    uri: string;
    key: string;
    driver: IODriverInterface
}

export class Bot implements BotInterface {
    name: string;
    description: string;
    uri: string;
    key: string;
    driver: IODriverInterface;

    constructor(name: string, description: string, uri: string, key: string, driver: IODriverInterface) {
        this.name = name;
        this.description = description;
        this.uri = uri;
        this.key = key;
        this.driver = driver;
    }
}