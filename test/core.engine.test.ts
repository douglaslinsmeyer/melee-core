import { Bot } from '../src/core/bot';
import { Combatant } from '../src/core/combatant';
import { Engine } from '../src/core/engine';
import { IOHandler } from '../src/core/io';
import { IODriverInternal } from '../src/core/io/internal';
import standardRules from '../src/core/rulebooks/standard';
import standardActions from '../src/core/actionsets/standard';
import { Match } from '../src/core/match';


const ioHandler = new IOHandler(new IODriverInternal());
const engine = new Engine(ioHandler);
const match = new Match()
    .addRuleBook(standardRules())
    .addActionSet(standardActions());

describe('Game engine tests:', () => {
    test('Test game engine start', () => {
        match
            .addCombatant(new Combatant(new Bot('Alpha-1', 'A test bot', 'internal://alpha')))
            .addCombatant(new Combatant(new Bot('Alpha-2', 'A test bot', 'internal://alpha')));
        
        engine.run(match);
    });

});
