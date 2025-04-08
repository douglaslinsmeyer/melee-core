import { Bot } from '../src/core/bot';
import { AlphaBot } from '../src/core/bots/alpha';
import { Combatant } from '../src/core/combatant';
import { IODriverInternal } from '../src/core/io/internal';
import { Match } from '../src/core/match';
import { Location } from '../src/core/movement';

describe('Internal driver tests:', () => {
    test('test bot loading', () => {
        const alpha = new AlphaBot();
        const driver = new IODriverInternal();
        const response = driver.call('internal://alpha', {
            combatant: new Combatant(new Bot('', '', ''), new Location(0,0,0), '', ''),
            match: new Match(),
        });
        expect(response.id).toBe(alpha.name);
        expect(response.secret).toBe(alpha.key);
    });
});
