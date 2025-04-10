import { logger } from '../logger';
import { Match } from '../match';
import { Event } from '../events';
import { RuleInterface } from '../rules';

export class TemplateRule implements RuleInterface {
    name: string = '';
    description: string = '';
    trigger: Event[] = [];
    visible: boolean = true;
    category: string = '';
    priority: number = 1;
    apply(trigger: string, match: Match): void {}
}