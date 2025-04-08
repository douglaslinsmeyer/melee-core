import { Bot } from '../src/core/bot';
import { Combatant, CombatantBuilder } from '../src/core/combatant';
import { Location } from '../src/core/movement';
import { Engine } from '../src/core/engine';
import { IOHandler } from '../src/core/io';
import { IODriverInternal } from '../src/core/io/internal';
import { standardRules } from '../src/core/rules/standard';

const combatantBuilder = new CombatantBuilder();

function loadGameEngine() {
    const ioDriver = new IODriverInternal();
    const ioHandler = new IOHandler(ioDriver);
    const engine = new Engine(ioHandler, standardRules);

    return engine;
}

describe('Game engine tests:', () => {
    test('Test game engine initialization', () => {
        const engine = loadGameEngine();
        expect(engine).toBeDefined();
        expect(engine.io).toBeDefined();

    });

    test('Test game engine start', () => {

        const combatantAlpha = combatantBuilder
            .setName('Alpha-1')
            .setBot(new Bot('Alpha-1', 'A test bot', 'internal://alpha/alpha-1'))
            .setLocation(new Location(0, 0, 0))
            .build();

        const combatantBravo = combatantBuilder
            .setName('Alpha-2')
            .setBot(new Bot('Alpha-2', 'A test bot', 'internal://alpha/apha-2'))
            .setLocation(new Location(1, 0, 0))
            .build();

        const engine = loadGameEngine();
        const combatants = [
            combatantAlpha,
            combatantBravo
        ];

        const match = engine.run(combatants);

        expect(match).toBeDefined();
        expect(match.combatants.length).toBe(combatants.length);
    });

});
