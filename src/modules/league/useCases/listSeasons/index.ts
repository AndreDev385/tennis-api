import { sequelizeSeasonRepo } from '../../repositories/'
import { ListSeasons } from './listSeasons'
import { ListSeasonsController } from "./listSeasonsController"

const listSeasons = new ListSeasons(sequelizeSeasonRepo)
const listSeasonController = new ListSeasonsController(listSeasons)

export {
    listSeasonController,
}
