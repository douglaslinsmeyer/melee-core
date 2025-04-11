import { mock } from 'ts-jest-mocker'
import { IODriverInternal } from '../src/io/drivers/internal/internal';
import { Match } from '../src/match';
import { Combatant } from '../src/combatant';

describe('Internal driver tests:', () => {
    test('test bot loading', () => {
        const driver = new IODriverInternal();
        driver.agents.forEach(agent => {
            const request = {
                uri: 'internal://' + agent.name,
                self: mock(Combatant),
                match: mock(Match),
                log: [],
                rules: {},
                actions: {}
            };
            const response = driver.call(request);
            expect(response).toHaveProperty('id');
            expect(response).toHaveProperty('secret');
            expect(response).toHaveProperty('action');
            expect(response).toHaveProperty('target');
        });
    });
});
