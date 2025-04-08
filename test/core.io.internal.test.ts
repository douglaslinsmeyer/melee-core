import { ActionSet } from '../src/core/actions';
import { Bot } from '../src/core/bot';
import { AlphaBot } from '../src/core/bots/alpha';
import { Combatant } from '../src/core/combatant';
import { IODriverInternal } from '../src/core/io/internal';
import { Match } from '../src/core/match';
import { Location } from '../src/core/movement';
import { RuleBook } from '../src/core/rules';

describe('Internal driver tests:', () => {
    test('test bot loading', () => {
        const alpha = new AlphaBot();
        const driver = new IODriverInternal();
        const response = driver.call('internal://alpha', {
            self: new Combatant(new Bot('', '', ''), new Location(0,0,0), '', ''),
            match: new Match(),
            rules: new RuleBook().toSanitizedJSON(),
            log: [],
            actions: new ActionSet().toSanitizedJSON()
        });
        expect(response.id).toBe(alpha.name);
        expect(response.secret).toBe(alpha.key);
    });
});
