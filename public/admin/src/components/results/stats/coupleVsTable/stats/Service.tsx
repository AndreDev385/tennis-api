import { calculatePercentage } from '../../../../../utils/calculatePercantage';
import { IPropsTable } from '../../GameStats';
import '../../GameStats.scss';

const Service = ({ tracker, playerVsPlayer }: IPropsTable) => {
  return (
    <>
      <div className='title'>
        <span>Servicio </span>
      </div>

      {tracker.partner && (
        <tbody>
          <tr>
            <td className='text-center'>Aces</td>

            <td className='text-center'>
              {playerVsPlayer ? tracker.me.aces : tracker.me.aces + tracker.partner.aces}
            </td>

            <td className='text-center'>
              {playerVsPlayer ? tracker.partner.aces : tracker.rivalAces}
            </td>
          </tr>

          <tr>
            <td className='text-center'>Doble faltas</td>
            <td className='text-center'>
              {playerVsPlayer
                ? tracker.me.dobleFaults
                : tracker.me.dobleFaults + tracker.partner.dobleFaults}
            </td>

            <td className='text-center'>
              {playerVsPlayer ? tracker.partner.dobleFaults : tracker.rivalDobleFault}
            </td>
          </tr>

          <tr>
            <td className='text-center'>1er Servicio In</td>

            <td className='text-center'>
              {playerVsPlayer ? (
                <span>
                  {tracker.me.firstServIn}/
                  {tracker.me.firstServIn +
                    tracker.me.secondServIn +
                    tracker.me.dobleFaults}
                  (
                  {calculatePercentage(
                    tracker.me.firstServIn,
                    tracker.me.firstServIn +
                      tracker.me.secondServIn +
                      tracker.me.dobleFaults
                  )}
                  %)
                </span>
              ) : (
                <span>
                  {tracker.me.firstServIn + tracker.partner.firstServIn}/
                  {tracker.me.firstServIn +
                    tracker.partner.firstServIn +
                    tracker.me.secondServIn +
                    tracker.partner.secondServIn +
                    tracker.me.dobleFaults +
                    tracker.partner.dobleFaults}
                  (
                  {calculatePercentage(
                    tracker.me.firstServIn + tracker.partner.firstServIn,
                    tracker.me.firstServIn +
                      tracker.partner.firstServIn +
                      tracker.me.secondServIn +
                      tracker.partner.secondServIn +
                      tracker.me.dobleFaults +
                      tracker.partner.dobleFaults
                  )}
                  %)
                </span>
              )}
            </td>

            <td className='text-center'>
              {playerVsPlayer ? (
                <span>
                  {tracker.partner.firstServIn}/
                  {tracker.partner.firstServIn +
                    tracker.partner.secondServIn +
                    tracker.partner.dobleFaults}
                  (
                  {calculatePercentage(
                    tracker.partner.firstServIn,
                    tracker.partner.firstServIn +
                      tracker.partner.secondServIn +
                      tracker.partner.dobleFaults
                  )}
                  %)
                </span>
              ) : (
                <span>
                  {tracker.rivalFirstServIn}/
                  {tracker.rivalFirstServIn +
                    tracker.rivalSecondServIn +
                    tracker.rivalDobleFault}
                  (
                  {calculatePercentage(
                    tracker.rivalFirstServIn,
                    tracker.rivalFirstServIn +
                      tracker.rivalSecondServIn +
                      tracker.rivalDobleFault
                  )}
                  %)
                </span>
              )}
            </td>
          </tr>

          <tr>
            <td className='text-center'>1er saque ganador</td>

            <td className='text-center'>
              {playerVsPlayer ? (
                <span>{tracker.me.firstServWon}</span>
              ) : (
                <span>{tracker.me.firstServWon + tracker.partner.firstServWon}</span>
              )}
            </td>

            <td className='text-center'>
              {playerVsPlayer ? (
                <span>{tracker.partner.firstServWon}</span>
              ) : (
                <span>{tracker.rivalFirstServWon}</span>
              )}
            </td>
          </tr>

          <tr>
            <td className='text-center'>Ptos ganados con el 1er servicio</td>
            <td className='text-center'>
              {playerVsPlayer ? (
                <span>
                  {tracker.me.pointsWinnedFirstServ}/{tracker.me.firstServIn}(
                  {calculatePercentage(
                    tracker.me.pointsWinnedFirstServ,
                    tracker.me.firstServIn
                  )}
                  %)
                </span>
              ) : (
                <span>
                  {tracker.me.pointsWinnedFirstServ +
                    tracker.partner.pointsWinnedFirstServ}
                  /{tracker.me.firstServIn + tracker.partner.firstServIn}(
                  {calculatePercentage(
                    tracker.me.pointsWinnedFirstServ +
                      tracker.partner.pointsWinnedFirstServ,
                    tracker.me.firstServIn + tracker.partner.firstServIn
                  )}
                  %)
                </span>
              )}
            </td>
            <td className='text-center'>
              {playerVsPlayer ? (
                <span>
                  {tracker.partner.pointsWinnedFirstServ}/{tracker.partner.firstServIn}(
                  {calculatePercentage(
                    tracker.partner.pointsWinnedFirstServ,
                    tracker.partner.firstServIn
                  )}
                  %)
                </span>
              ) : (
                <span>
                  {tracker.rivalPointsWinnedFirstServ}/{tracker.rivalFirstServIn}(
                  {calculatePercentage(
                    tracker.rivalPointsWinnedFirstServ,
                    tracker.rivalFirstServIn
                  )}
                  %)
                </span>
              )}
            </td>
          </tr>

          <tr>
            <td className='text-center'>2do Servicio In</td>

            <td className='text-center'>
              {playerVsPlayer ? (
                <span>
                  {tracker.me.secondServIn}/
                  {tracker.me.secondServIn + tracker.me.dobleFaults}(
                  {calculatePercentage(
                    tracker.me.secondServIn,
                    tracker.me.secondServIn + tracker.me.dobleFaults
                  )}
                  %)
                </span>
              ) : (
                <span>
                  {tracker.me.secondServIn + tracker.partner.secondServIn}/
                  {tracker.me.secondServIn +
                    tracker.partner.secondServIn +
                    tracker.me.dobleFaults +
                    tracker.partner.dobleFaults}
                  (
                  {calculatePercentage(
                    tracker.me.secondServIn + tracker.partner.secondServIn,
                    tracker.me.secondServIn +
                      tracker.partner.secondServIn +
                      tracker.me.dobleFaults +
                      tracker.partner.dobleFaults
                  )}
                  %)
                </span>
              )}
            </td>

            <td className='text-center'>
              {playerVsPlayer ? (
                <span>
                  {tracker.partner.firstServIn}/
                  {tracker.partner.firstServIn +
                    tracker.partner.secondServIn +
                    tracker.partner.dobleFaults}
                  (
                  {calculatePercentage(
                    tracker.partner.firstServIn,
                    tracker.partner.firstServIn +
                      tracker.partner.secondServIn +
                      tracker.partner.dobleFaults
                  )}
                  %)
                </span>
              ) : (
                <span>
                  {tracker.rivalFirstServIn}/
                  {tracker.rivalFirstServIn +
                    tracker.rivalSecondServIn +
                    tracker.rivalDobleFault}
                  (
                  {calculatePercentage(
                    tracker.rivalFirstServIn,
                    tracker.rivalFirstServIn +
                      tracker.rivalSecondServIn +
                      tracker.rivalDobleFault
                  )}
                  %)
                </span>
              )}
            </td>
          </tr>

          <tr>
            <td className='text-center'>2do saque ganador</td>

            <td className='text-center'>
              {playerVsPlayer ? (
                <span>{tracker.me.secondServWon}</span>
              ) : (
                <span>{tracker.me.secondServWon + tracker.partner.secondServWon}</span>
              )}
            </td>

            <td className='text-center'>
              {playerVsPlayer ? (
                <span>{tracker.partner.secondServWon}</span>
              ) : (
                <span>{tracker.rivalSecondServIn}</span>
              )}
            </td>
          </tr>

          <tr>
            <td className='text-center'>Ptos ganados con el 2do servicio</td>
            <td className='text-center'>
              {playerVsPlayer ? (
                <span>
                  {tracker.me.pointsWinnedSecondServ}/{tracker.me.secondServIn}(
                  {calculatePercentage(
                    tracker.me.pointsWinnedSecondServ,
                    tracker.me.secondServIn
                  )}
                  %)
                </span>
              ) : (
                <span>
                  {tracker.me.pointsWinnedSecondServ +
                    tracker.partner.pointsWinnedSecondServ}
                  /{tracker.me.secondServIn + tracker.partner.secondServIn}(
                  {calculatePercentage(
                    tracker.me.pointsWinnedSecondServ +
                      tracker.partner.pointsWinnedSecondServ,
                    tracker.me.secondServIn + tracker.partner.secondServIn
                  )}
                  %)
                </span>
              )}
            </td>
            <td className='text-center'>
              {playerVsPlayer ? (
                <span>
                  {tracker.partner.pointsWinnedSecondServ}/{tracker.partner.secondServIn}(
                  {calculatePercentage(
                    tracker.partner.pointsWinnedSecondServ,
                    tracker.partner.secondServIn
                  )}
                  %)
                </span>
              ) : (
                <span>
                  {tracker.rivalPointsWinnedSecondServ}/{tracker.rivalSecondServIn}(
                  {calculatePercentage(
                    tracker.rivalPointsWinnedSecondServ,
                    tracker.rivalSecondServIn
                  )}
                  %)
                </span>
              )}
            </td>
          </tr>

          {playerVsPlayer && (
            <tr>
              <td className='text-center'>Break points salvados</td>
              <td className='text-center'>
                {tracker.me.breakPtsSaved}/{tracker.me.saveBreakPtsChances}
              </td>
              <td className='text-center'>
                {tracker.partner.breakPtsSaved}/{tracker.partner.saveBreakPtsChances}
              </td>
            </tr>
          )}

          <tr>
            <td className='text-center'>Games ganados con el servicio</td>
            <td className='text-center'>
              {playerVsPlayer ? (
                <span>
                  {tracker.me.gamesWonServing}/
                  {tracker.me.gamesWonServing + tracker.me.gamesLostServing}
                </span>
              ) : (
                <span>
                  {tracker.me.gamesWonServing + tracker.partner.gamesWonServing}
                </span>
              )}
            </td>
            <td className='text-center'>
              {playerVsPlayer ? (
                <span>
                  {tracker.partner.gamesWonServing}/
                  {tracker.partner.gamesWonServing + tracker.partner.gamesLostServing}
                </span>
              ) : (
                <span>{tracker.gamesLostReturning}</span>
              )}
            </td>
          </tr>
        </tbody>
      )}
    </>
  );
};

export default Service;
