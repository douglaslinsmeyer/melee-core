import { Bot } from '../src/core/bot';
import { Combatant } from '../src/core/combatant';
import { Engine } from '../src/core/engine';
import { IOHandler } from '../src/core/io';
import { IODriverInternal } from '../src/core/io/internal';
import standardRules from '../src/core/rulebooks/standard';
import standardActions from '../src/core/actionsets/standard';


const ioHandler = new IOHandler(new IODriverInternal());
const engine = new Engine(ioHandler);
engine.ruleBook.merge(standardRules());
engine.actions.merge(standardActions());

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
