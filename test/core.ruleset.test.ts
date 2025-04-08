import { RuleBook } from "../src/core/rules";
import { standardRules } from "../src/core/rules/standard";

describe('Ruleset tests:', () => {
    test('Test ruleset priority resolution', () => {
        const ruleBook = new RuleBook();

        ruleBook.addRule({
            name: 'core.rule-1',
            description: 'Rule 1 description',
            trigger: 'onStart',
            apply: (match) => match,
            priority: 2
        });

        ruleBook.addRule({
            name: 'core.rule-2',
            description: 'Rule 2 description',
            trigger: 'onStart',
            apply: (match) => match,
            priority: 1
        });

        expect(ruleBook.rules[0].name).toBe('core.rule-2');
        expect(ruleBook.rules[1].name).toBe('core.rule-1');
    });

    test('Test the standard ruleset', () => {
        expect(standardRules).toBeDefined();
        expect(standardRules.name).toBe('Standard Rules');
        expect(standardRules.rules.length).toBeGreaterThan(0);
    });
});
