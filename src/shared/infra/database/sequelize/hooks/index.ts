import { UniqueEntityID } from "../../../../domain/UniqueEntityID";
import { DomainEvents } from "../../../../domain/events/DomainEvents";
import models from "../models";

export const dispatchEventsCallback = (model: any, primaryKeyField: string) => {
    const aggregateId = new UniqueEntityID(model[primaryKeyField]);
    DomainEvents.dispatchEventsForAggregate(aggregateId);
};

(async function createHooksForAggregateRoots() {
    const { UserModel, MatchModel, ClashModel, SeasonModel, PlayerModel } =
        models;

    MatchModel.addHook("afterCreate", (m: any) =>
        dispatchEventsCallback(m, "matchId")
    );
    MatchModel.addHook("afterDestroy", (m: any) =>
        dispatchEventsCallback(m, "matchId")
    );
    MatchModel.addHook("afterUpdate", (m: any) =>
        dispatchEventsCallback(m, "matchId")
    );
    MatchModel.addHook("afterSave", (m: any) =>
        dispatchEventsCallback(m, "matchId")
    );
    MatchModel.addHook("afterUpsert", (m: any) =>
        dispatchEventsCallback(m, "matchId")
    );
    MatchModel.addHook("afterBulkUpdate", (m: any) =>
        dispatchEventsCallback(m.attributes, "matchId")
    );

    ClashModel.addHook("afterCreate", (m: any) =>
        dispatchEventsCallback(m, "clashId")
    );
    ClashModel.addHook("afterDestroy", (m: any) =>
        dispatchEventsCallback(m, "clashId")
    );
    ClashModel.addHook("afterUpdate", (m: any) =>
        dispatchEventsCallback(m, "clashId")
    );
    ClashModel.addHook("afterSave", (m: any) =>
        dispatchEventsCallback(m, "clashId")
    );
    ClashModel.addHook("afterUpsert", (m: any) =>
        dispatchEventsCallback(m, "clashId")
    );
    ClashModel.addHook("afterBulkUpdate", (m: any) =>
        dispatchEventsCallback(m.attributes, "clashId")
    );

    UserModel.addHook("afterSave", (m: any, options) => {
        if (options.transaction) {
            console.log("t save");
            options.transaction.afterCommit(() => {
                console.log("after commit");
                return dispatchEventsCallback(m, "userId");
            });
        }

        return dispatchEventsCallback(m, "userId");
    });
    UserModel.addHook("afterDestroy", (m: any) =>
        dispatchEventsCallback(m, "userId")
    );
    UserModel.addHook("afterUpdate", (m: any) =>
        dispatchEventsCallback(m, "userId")
    );
    UserModel.addHook("afterUpsert", (m: any) =>
        dispatchEventsCallback(m, "userId")
    );
    UserModel.addHook("afterBulkUpdate", (m: any) =>
        dispatchEventsCallback(m.attributes, "userId")
    );

    SeasonModel.addHook("afterCreate", (m: any) =>
        dispatchEventsCallback(m, "seasonId")
    );
    SeasonModel.addHook("afterDestroy", (m: any) =>
        dispatchEventsCallback(m, "seasonId")
    );
    SeasonModel.addHook("afterUpdate", (m: any) =>
        dispatchEventsCallback(m, "seasonId")
    );
    SeasonModel.addHook("afterSave", (m: any) =>
        dispatchEventsCallback(m, "seasonId")
    );
    SeasonModel.addHook("afterUpsert", (m: any) =>
        dispatchEventsCallback(m, "seasonId")
    );
    SeasonModel.addHook("afterBulkUpdate", (m: any) =>
        dispatchEventsCallback(m.attributes, "seasonId")
    );

    PlayerModel.addHook("afterCreate", (m: any) =>
        dispatchEventsCallback(m, "playerId")
    );
    PlayerModel.addHook("afterDestroy", (m: any) =>
        dispatchEventsCallback(m, "playerId")
    );
    PlayerModel.addHook("afterUpdate", (m: any) =>
        dispatchEventsCallback(m, "playerId")
    );
    PlayerModel.addHook("afterSave", (m: any) =>
        dispatchEventsCallback(m, "playerId")
    );
    PlayerModel.addHook("afterUpsert", (m: any) =>
        dispatchEventsCallback(m, "playerId")
    );
    PlayerModel.addHook("afterBulkUpdate", (m: any) =>
        dispatchEventsCallback(m.attributes, "playerId")
    );

    console.log("[Hooks]: Sequelize hooks setup.");
})();
