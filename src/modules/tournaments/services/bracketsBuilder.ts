import { BracketNode, BracketPlace } from "../domain/brackets";
import { Inscribed } from "../domain/inscribed";

/*
 * @param: node
 * root tree node for tournament's brackets on first call
 *
 * @param: deep
 * multiples of 2 for reach the brackets tree lenght
 *
 * */
export function buildBracketsBuilder(
    deep: number,
    node: BracketNode,
    inscribed: Inscribed[]
) {
    if (node.deep == deep) {
        const rightP = inscribed.find(
            (i) => i.position == node.rightPlace.value
        );
        if (rightP) {
            node.rightPlace.setParticipant(rightP.participant!);
        }

        const leftP = inscribed.find((i) => i.position == node.leftPlace.value);
        if (leftP) {
            node.leftPlace.setParticipant(leftP.participant!);
        }

        if (!!rightP === true && !leftP) {
            const isRightChildren = node.parent?.right?.equals(node);
            if (isRightChildren) {
                node.parent?.rightPlace.setParticipant(rightP.participant!);
            } else {
                node.parent?.leftPlace.setParticipant(rightP.participant!);
            }
        }

        if (!!leftP === true && !rightP) {
            const isRightChildren = node.parent?.right?.equals(node);
            if (isRightChildren) {
                node.parent?.rightPlace.setParticipant(leftP.participant!);
            } else {
                node.parent?.leftPlace.setParticipant(leftP.participant!);
            }
        }

        console.log(
            `deep: ${node.deep}\n`,
            `node rightp: ${node.rightPlace.value}:${node.rightPlace.participant?.participantId.id.toString()}\n`,
            `node leftp: ${node.leftPlace.value}:${node.leftPlace.participant?.participantId.id.toString()}\n`
        );

        console.log(
            `deep: ${node.deep}\n`,
            `parentnode rightp: ${node.parent?.rightPlace.value}:${node.parent?.rightPlace.participant?.participantId.id.toString()}\n`,
            `parentnode leftp: ${node.parent?.leftPlace.value}:${node.parent?.leftPlace.participant?.participantId.id.toString()}\n`
        );

        return;
    }

    const nextDeep = node.deep + 1;

    if (node.right == null) {
        const right = BracketNode.create({
            parent: node,
            deep: nextDeep,
            contestId: node.contestId,
            rightPlace: BracketPlace.create({
                value: node.rightPlace.value,
            }).getValue(),
            leftPlace: BracketPlace.create({
                value: calculateBracketOponent(nextDeep, node.rightPlace.value),
            }).getValue(),
        }).getValue();

        node.setRight(right);

        buildBracketsBuilder(deep, node.right!, inscribed);
    }

    if (node.left == null) {
        const left = BracketNode.create({
            parent: node,
            deep: nextDeep,
            contestId: node.contestId,
            rightPlace: BracketPlace.create({
                value: calculateBracketOponent(nextDeep, node.leftPlace.value),
            }).getValue(),
            leftPlace: BracketPlace.create({
                value: node.leftPlace.value,
            }).getValue(),
        }).getValue();

        node.setLeft(left);

        buildBracketsBuilder(deep, node.left!, inscribed);
    }
}

/*
 * @param: deep
 * multiples of 2 for reach the brackets tree lenght
 *
 * @param: firstNumber
 * number of table to calculate by deep
 *
 * @return:
 * position of the oponent player
 *
 **/
function calculateBracketOponent(deep: number, firstNumber: number): number {
    return 2 ** deep + 1 - firstNumber;
}

export function calculateDeepByParticipants(participants: number): number {
    let deep = 1;
    let table = 2 ** deep;
    while (table < participants) {
        deep++;
        table = 2 ** deep;
    }
    console.log(deep, table);
    return deep;
}
