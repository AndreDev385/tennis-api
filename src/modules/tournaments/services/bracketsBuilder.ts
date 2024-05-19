import { BracketNode, BracketPlace } from "../domain/brackets";
import { Inscribed } from "../domain/inscribed";

/**
 * @param node
 * root tree node for tournament's brackets on first call
 *
 * @param deep
 * multiples of 2 for reach the brackets tree lenght
 *
 * @param inscribed
 * teams, couples or participants, needed for setting places inside the brackets
 */
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
            node.rightPlace.setInscribed(
                rightP.participant,
                rightP.couple,
                rightP.team
            );
        }

        const leftP = inscribed.find((i) => i.position == node.leftPlace.value);
        if (leftP) {
            node.leftPlace.setInscribed(
                leftP.participant,
                leftP.couple,
                leftP.team
            );
        }

        if (!!rightP === true && !leftP) {
            const isRightChildren = node.parent?.right?.equals(node);
            if (isRightChildren) {
                node.parent?.rightPlace.setInscribed(
                    rightP.participant,
                    rightP.couple,
                    rightP.team
                );
            } else {
                node.parent?.leftPlace.setInscribed(
                    rightP.participant,
                    rightP.couple,
                    rightP.team
                );
            }
        }

        if (!!leftP === true && !rightP) {
            const isRightChildren = node.parent?.right?.equals(node);
            if (isRightChildren) {
                node.parent?.rightPlace.setInscribed(
                    leftP.participant,
                    leftP.couple,
                    leftP.team
                );
            } else {
                node.parent?.leftPlace.setInscribed(
                    leftP.participant,
                    leftP.couple,
                    leftP.team
                );
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
            phase: node.phase,
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
            phase: node.phase,
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

/**
 * @param deep
 * multiples of 2 for reach the brackets tree lenght
 *
 * @param firstNumber
 * number of table to calculate by deep
 *
 * @returns {number}
 * position of the oponent player
 */
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
    return deep;
}
