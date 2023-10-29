import { IPropsTable } from "../../GameStats"
import '../../GameStats.scss'

const Service = ({tracker, playerVsPlayer}: IPropsTable) => {
    
    return (
        <>
            <div className="title">
                <span>
                Servicio
                </span>
            </div>

            {tracker.partner && <tbody>
                <tr>
                    <td className="text-center">
                        Aces
                    </td>
  
                    <td className="text-center">
                        {playerVsPlayer?
                            tracker.me.aces:
                            tracker.me.aces + tracker.partner.aces}
                    </td>

                    <td className="text-center">
                        {playerVsPlayer?
                            tracker.partner.aces:
                            tracker.rivalAces}
                    </td>
                </tr>
                
                <tr>
                    <td className="text-center">
                        Doble faltas
                    </td>
                    <td className="text-center">
                        {playerVsPlayer?
                            tracker.me.dobleFaults:
                            tracker.me.dobleFaults + tracker.partner.dobleFaults}
                    </td>

                    <td className="text-center">
                        {playerVsPlayer?
                            tracker.partner.dobleFaults:
                            tracker.rivalDobleFault}
                    </td>
                </tr>

                <tr>
                    <td className="text-center">
                        1er Servicio In
                    </td>

                    <td className="text-center">
                        {playerVsPlayer? 
                            <span>
                                {tracker.me.firstServIn}/
                                {tracker.me.firstServIn + tracker.me.secondServIn}
                                ({Math.floor(tracker.me.firstServIn/(tracker.me.firstServIn + tracker.me.secondServIn)*100)}%)
                            </span>:
                            <span>
                                {tracker.me.firstServIn + tracker.partner.firstServIn}/
                                {tracker.me.firstServIn + tracker.partner.firstServIn + tracker.me.secondServIn + tracker.partner.secondServIn}
                                ({Math.floor((tracker.me.firstServIn + tracker.partner.firstServIn)/(tracker.me.firstServIn + tracker.partner.firstServIn + tracker.me.secondServIn + tracker.partner.secondServIn)*100)}%)
                            </span>
                        }
                    </td>

                    <td className="text-center">
                        {playerVsPlayer? 
                            <span>
                                {tracker.partner.firstServIn}/
                                {tracker.partner.firstServIn + tracker.partner.secondServIn}
                                ({Math.floor(tracker.partner.firstServIn/(tracker.partner.firstServIn + tracker.partner.secondServIn)*100)}%)
                            </span>:
                            <span>
                                {tracker.rivalFirstServIn}/
                                {tracker.rivalFirstServIn + tracker.rivalSecondServIn}
                                ({Math.floor(tracker.rivalFirstServIn/(tracker.rivalFirstServIn + tracker.rivalSecondServIn)*100)}%)
                            </span>
                        }
                    </td>
                </tr>

                <tr>
                    <td className="text-center">
                    Ptos ganados con el 1er servicio
                    </td>
                    <td className="text-center">
                        {playerVsPlayer? 
                            <span>
                                {tracker.me.pointsWinnedFirstServ}/
                                {tracker.me.firstServIn}
                                ({Math.floor((tracker.me.pointsWinnedFirstServ)/
                                (tracker.me.firstServIn)*100)}%)
                            </span>:
                            <span>
                                {tracker.me.pointsWinnedFirstServ + tracker.partner.pointsWinnedFirstServ}/
                                {tracker.me.firstServIn + tracker.partner.firstServIn}
                                ({Math.floor((tracker.me.pointsWinnedFirstServ + tracker.partner.pointsWinnedFirstServ)/
                                (tracker.me.firstServIn + tracker.partner.firstServIn)*100)}%)
                            </span>
                        }
                    </td>
                    <td className="text-center">
                        {playerVsPlayer? 
                            <span>
                                {tracker.partner.pointsWinnedFirstServ}/
                                {tracker.partner.firstServIn}
                                ({Math.floor((tracker.partner.pointsWinnedFirstServ)/
                                (tracker.partner.firstServIn)*100)}%)
                            </span>:
                            <span>
                                {tracker.rivalPointsWinnedFirstServ}/
                                {tracker.rivalFirstServIn}
                                ({Math.floor(tracker.rivalPointsWinnedFirstServ/(tracker.rivalFirstServIn)*100)}%)
                            </span>
                        }
                    </td>
                </tr>

                <tr>
                    <td className="text-center">
                    Ptos ganados con el 2do servicio
                    </td>
                    <td className="text-center">
                        {playerVsPlayer? 
                            <span>
                                {tracker.me.pointsWinnedSecondServ}/
                                {tracker.me.secondServIn}
                                ({Math.floor((tracker.me.pointsWinnedSecondServ)/
                                (tracker.me.secondServIn)*100)}%)
                            </span>:
                            <span>
                                {tracker.me.pointsWinnedSecondServ + tracker.partner.pointsWinnedSecondServ}/
                                {tracker.me.secondServIn + tracker.partner.secondServIn}
                                ({Math.floor((tracker.me.pointsWinnedSecondServ + tracker.partner.pointsWinnedSecondServ)/
                                (tracker.me.secondServIn + tracker.partner.secondServIn)*100)}%)
                            </span>
                        }
                    </td>
                    <td className="text-center">
                        {playerVsPlayer? 
                            <span>
                                 {tracker.partner.pointsWinnedSecondServ}/
                                {tracker.partner.secondServIn}
                                ({Math.floor((tracker.partner.pointsWinnedSecondServ)/
                                (tracker.partner.secondServIn)*100)}%)
                            </span>:
                            <span>
                                {tracker.rivalPointsWinnedSecondServ}/
                                {tracker.rivalSecondServIn}
                                ({Math.floor(tracker.rivalPointsWinnedSecondServ/(tracker.rivalSecondServIn)*100)}%)
                            </span>
                        }
                    </td>
                </tr>

                {playerVsPlayer && 
                <tr>
                    <td className="text-center">
                        Break points salvados
                    </td>
                    <td className="text-center">
                        {tracker.me.breakPtsSaved}/{tracker.me.saveBreakPtsChances}
                    </td>
                    <td className="text-center">
                        {tracker.partner.breakPtsSaved}/{tracker.partner.saveBreakPtsChances}
                    </td>
                </tr>}

                <tr>
                    <td className="text-center">
                        Games ganados con el servicio
                    </td>
                    <td className="text-center">
                        {playerVsPlayer? 
                            <span>
                                {tracker.me.gamesWonServing}/{tracker.me.gamesWonServing + tracker.me.gamesLostServing}
                            </span>:
                            <span>
                                {tracker.me.gamesWonServing + tracker.partner.gamesWonServing}
                            </span>
                        }
                    </td>
                    <td className="text-center">
                        {playerVsPlayer? 
                            <span>
                                {tracker.partner.gamesWonServing}/{tracker.partner.gamesWonServing + tracker.partner.gamesLostServing}
                            </span>:
                            <span>
                                {tracker.gamesLostReturning}
                            </span>
                        }
                    </td>
                </tr>
            </tbody>}
        </>
    )
}

export default Service