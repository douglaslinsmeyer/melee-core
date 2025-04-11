import { Bot } from '../src/core/bot';
import { Combatant } from '../src/core/combatant';
import { Engine } from '../src/core/engine';
import { IO } from '../src/core/io/io';
import internalDriver from '../src/core/io/drivers/internal/internal';
import standardRules from '../src/core/rulebooks/standard';
import standardActions from '../src/core/actionsets/standard';
import { Match } from '../src/core/match';

const io = new IO();
const engine = new Engine(io);
const match = new Match()
    .addRuleBook(standardRules())
    .addActionSet(standardActions());

describe('Game engine tests:', () => {
    test('Test game engine start', () => {
        match
            .addCombatant(new Combatant(new Bot('Alpha-1', 'A test bot', 'internal://alpha', 'alpha-1-secret', internalDriver)))
            .addCombatant(new Combatant(new Bot('Alpha-2', 'A test bot', 'internal://alpha', 'alpha-2-secret', internalDriver)));
        
        engine.run(match);
    });

});
