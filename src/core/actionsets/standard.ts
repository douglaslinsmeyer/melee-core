import { ActionSet } from './../actions';
import ActionJab from '../actions/jab';
import ActionMoveToward from '../actions/move-toward';
import ActionBlock from '../actions/block';
import ActionWait from '../actions/wait';

export default function (): ActionSet {
    const actionSet = new ActionSet();
    actionSet.addAction(ActionWait);
    actionSet.addAction(ActionJab);
    actionSet.addAction(ActionMoveToward);
    actionSet.addAction(ActionBlock);

    return actionSet;
}