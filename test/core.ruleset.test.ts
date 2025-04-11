import { RuleBook } from "../src/rules/rules";

describe('Ruleset tests:', () => {
    test('Test ruleset priority resolution', () => {
        const ruleBook = new RuleBook('test');

        ruleBook.addRule({
            name: 'core.rule-1',
            description: 'Rule 1 description',
            trigger: 'onStart',
            apply: (trigger, match) => match,
            priority: 2,
            visible: true
        });

        ruleBook.addRule({
            name: 'core.rule-2',
            description: 'Rule 2 description',
            trigger: 'onStart',
            apply: (trigger, match) => match,
            priority: 1,
            visible: true
        });

        expect(ruleBook.name).toBe('test');
        expect(ruleBook.rules.length).toBe(2);
        expect(ruleBook.rules[0].name).toBe('core.rule-2');
        expect(ruleBook.rules[1].name).toBe('core.rule-1');
    });
});
