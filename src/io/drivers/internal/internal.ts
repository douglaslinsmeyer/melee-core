import { IODriverInterface, IORequest, IOResponse } from "../../io";
import alpha from './agents/alpha';

export interface InternalAgentInterface {
    name: string;
    respond(input: IORequest): IOResponse;
}

export class IODriverInternal implements IODriverInterface {
    
    public agents: InternalAgentInterface[] = [];

    addAgent(agent: InternalAgentInterface) {
        this.agents.push(agent);
    }

    getAgentByName(name: string): InternalAgentInterface {
        const agent = this.agents.find(agent => agent.name === name);
        if (!agent) throw new Error(`Action with name "${name}" not found.`);
        return agent;
    }

    call(request: IORequest): IOResponse {
        const decodedUri = new URL(request.uri);
        const agentName = decodedUri.hostname;
        const botInstance = this.getAgentByName(agentName);
        const response = botInstance.respond(request);
        return response;
    }
}

const driver = new IODriverInternal();
driver.addAgent(alpha);

export default driver;