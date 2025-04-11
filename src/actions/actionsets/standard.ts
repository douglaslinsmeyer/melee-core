import * as actions from '../index';
import { ActionSet } from '../actions';

export default function (): ActionSet {
    const actionSet = new ActionSet();
    actionSet.addAction(new actions.MoveTowardAction());
    actionSet.addAction(new actions.JabAction());
    actionSet.addAction(new actions.BlockAction());
    actionSet.addAction(new actions.WaitAction());
    return actionSet;
}