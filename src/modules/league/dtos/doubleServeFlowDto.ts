export interface DoubleServeFlowDto {
    initialTeam: number;
    isFlowComplete: boolean;
    actualSetOrder: number;
    servingTeam: number;
    servingPlayer: number;
    returningPlayer: number;
    initialServingPlayer: number;
    initialReturningPlayer: number;
    setNextFlow: boolean;
    firstGameFlow?: Array<number>;
    secondGameFlow?: Array<number>;
    thirdGameFlow?: Array<number>;
    fourGameFlow?: Array<number>;
    order: Array<Array<number>>;
}
