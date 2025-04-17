import { Bot } from '../src/core/bot';
import { Combatant } from '../src/core/combatant';
import { Engine } from '../src/core/engine';
import { IO } from '../src/core/io';
import internalDriver from '../src/core/io/drivers/internal/internal';
import { standard } from '../src/core/rules/rulebooks';
import standardActions from '../src/core/actions/actionsets/standard';
import { Match } from '../src/core/match';
import { Location } from '../src/core/movements';

const io = new IO();
const engine = new Engine(io);
const match = new Match()
    .addRuleBook(standard)
    .addActionSet(standardActions());

describe('Game engine tests:', () => {
    test('Test game engine start', () => {
        match
            .addCombatant(new Combatant(
                new Bot('Alpha-1', 'A test bot', 'internal://alpha', 'alpha-1-secret', internalDriver), 
                new Location())
            )
            .addCombatant(new Combatant(
                new Bot('Alpha-2', 'A test bot', 'internal://alpha', 'alpha-2-secret', internalDriver),
                new Location())
            );
        
        engine.run(match);
    });

});
