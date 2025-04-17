import * as Actions from '@/core/actions';

export default function (): Actions.ActionSet {
    const actionSet = new Actions.ActionSet();
    actionSet.addAction(new Actions.MoveTowardAction());
    actionSet.addAction(new Actions.JabAction());
    actionSet.addAction(new Actions.BlockAction());
    actionSet.addAction(new Actions.WaitAction());
    return actionSet;
}