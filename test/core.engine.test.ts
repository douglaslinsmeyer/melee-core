import { Bot } from '../src/bot';
import { Combatant } from '../src/combatant';
import { Engine } from '../src/engine';
import { IO } from '../src/io/io';
import internalDriver from '../src/io/drivers/internal/internal';
import { standard } from '../src/rules/rulebooks';
import standardActions from '../src/actions/actionsets/standard';
import { Match } from '../src/match';
import { Location } from './../src/movements/movement';

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
