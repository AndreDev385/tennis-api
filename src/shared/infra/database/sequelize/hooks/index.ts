import models from '../models';
import { UniqueEntityID } from '../../../../domain/UniqueEntityID';
import { DomainEvents } from '../../../../domain/events/DomainEvents';
import { MatchModel } from '../models/Match';
import { ClashModel } from '../models/ClubClash';
import { SeasonModel } from '../models/Season';

const dispatchEventsCallback = (model: any, primaryKeyField: string) => {
    const aggregateId = new UniqueEntityID(model[primaryKeyField]);
    DomainEvents.dispatchEventsForAggregate(aggregateId);
}

(async function createHooksForAggregateRoots() {
    const { UserModel } = models;

    UserModel.addHook('afterCreate', (m: any) => dispatchEventsCallback(m, 'userId'));
    UserModel.addHook('afterDestroy', (m: any) => dispatchEventsCallback(m, 'userId'));
    UserModel.addHook('afterUpdate', (m: any) => dispatchEventsCallback(m, 'userId'));
    UserModel.addHook('afterSave', (m: any) => dispatchEventsCallback(m, 'userId'));
    UserModel.addHook('afterUpsert', (m: any) => dispatchEventsCallback(m, 'userId'));

    MatchModel.addHook('afterCreate', (m: any) => dispatchEventsCallback(m, 'matchId'));
    MatchModel.addHook('afterDestroy', (m: any) => dispatchEventsCallback(m, 'matchId'));
    MatchModel.addHook('afterUpdate', (m: any) => dispatchEventsCallback(m, 'matchId'));
    MatchModel.addHook('afterSave', (m: any) => dispatchEventsCallback(m, 'matchId'));
    MatchModel.addHook('afterUpsert', (m: any) => dispatchEventsCallback(m, 'matchId'));

    ClashModel.addHook('afterCreate', (m: any) => dispatchEventsCallback(m, 'clashId'));
    ClashModel.addHook('afterDestroy', (m: any) => dispatchEventsCallback(m, 'clashId'));
    ClashModel.addHook('afterUpdate', (m: any) => dispatchEventsCallback(m, 'clashId'));
    ClashModel.addHook('afterSave', (m: any) => dispatchEventsCallback(m, 'clashId'));
    ClashModel.addHook('afterUpsert', (m: any) => dispatchEventsCallback(m, 'clashId'));

    SeasonModel.addHook('afterCreate', (m: any) => dispatchEventsCallback(m, 'seasonId'));
    SeasonModel.addHook('afterDestroy', (m: any) => dispatchEventsCallback(m, 'seasonId'));
    SeasonModel.addHook('afterUpdate', (m: any) => dispatchEventsCallback(m, 'seasonId'));
    SeasonModel.addHook('afterSave', (m: any) => dispatchEventsCallback(m, 'seasonId'));
    SeasonModel.addHook('afterUpsert', (m: any) => dispatchEventsCallback(m, 'seasonId'));

    console.log('[Hooks]: Sequelize hooks setup.')
})();

