import { Bot } from '../src/core/bot';
import { Combatant } from '../src/core/combatant';
import { Location } from '../src/core/movement';
import { Engine } from '../src/core/engine';
import { IOHandler } from '../src/core/io';
import { IODriverInternal } from '../src/core/io/internal';
import { standardActions } from '../src/core/actions';
import { standardRules } from '../src/core/rules';

const ioHandler = new IOHandler(new IODriverInternal());
const engine = new Engine(ioHandler);
engine.ruleBook.merge(standardRules);
engine.actions.merge(standardActions);

describe('Game engine tests:', () => {
    test('Test game engine start', () => {
        const combatantAlpha = new Combatant(
            new Bot('Alpha-1', 'A test bot', 'internal://alpha')
        );

        const combatantBravo = new Combatant(
            new Bot('Alpha-2', 'A test bot', 'internal://alpha')
        );
        
        const match = engine.run([
            combatantAlpha,
            combatantBravo
        ]);

        expect(match).toBeDefined();
        expect(match.combatants.length).toBe(2);
    });

});
