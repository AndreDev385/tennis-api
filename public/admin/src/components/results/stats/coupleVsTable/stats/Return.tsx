import { calculatePercentage } from '../../../../../utils/calculatePercantage';
import { IPropsTable } from '../../GameStats';
import '../../GameStats.scss';

const Return = ({ tracker, playerVsPlayer }: IPropsTable) => {
  return (
    <>
      <div className='title'>
        <span>Devolución</span>
      </div>

      {tracker.partner && (
        <tbody>
          <tr>
            <td className='text-center'>1ra devolución in</td>
            <td className='text-center'>
              {playerVsPlayer ? (
                <span>
                  {tracker.me.firstReturnIn}/
                  {tracker.me.firstReturnIn + tracker.me.firstReturnOut}(
                  {calculatePercentage(
                    tracker.me.firstReturnIn,
                    tracker.me.firstReturnIn + tracker.me.firstReturnOut
                  )}
                  %)
                </span>
              ) : (
                <span>
                  {tracker.me.firstReturnIn + tracker.partner.firstReturnIn}/
                  {tracker.rivalFirstServIn}(
                  {calculatePercentage(
                    tracker.me.firstReturnIn + tracker.partner.firstReturnIn,
                    tracker.rivalFirstServIn
                  )}
                  %)
                </span>
              )}
            </td>
            <td className='text-center'>
              {playerVsPlayer ? (
                <span>
                  {tracker.partner.firstReturnIn}/
                  {tracker.partner.firstReturnIn + tracker.partner.firstReturnOut}(
                  {calculatePercentage(
                    tracker.partner.firstReturnIn,
                    tracker.partner.firstReturnIn + tracker.partner.firstReturnOut
                  )}
                  %)
                </span>
              ) : (
                <span>
                  {tracker.rivalFirstReturnIn}/
                  {tracker.me.firstServIn + tracker.partner.firstServIn}(
                  {calculatePercentage(
                    tracker.rivalFirstReturnIn,
                    tracker.me.firstServIn + tracker.partner.firstServIn
                  )}
                  %)
                </span>
              )}
            </td>
          </tr>

          <tr>
            <td className='text-center'>1ra devolución ganadora</td>
            <td className='text-center'>
              {playerVsPlayer ? (
                <span>{tracker.me.firstReturnWon}</span>
              ) : (
                <span>{tracker.me.firstReturnWon + tracker.partner.firstReturnWon}</span>
              )}
            </td>
            <td className='text-center'>
              {playerVsPlayer ? (
                <span>{tracker.partner.firstReturnWon}</span>
              ) : (
                <span></span>
              )}
            </td>
          </tr>

          <tr>
            <td className='text-center'>Winner con primera devolución ganadora</td>
            <td className='text-center'>
              {playerVsPlayer ? (
                <span>{tracker.me.firstReturnWinner}</span>
              ) : (
                <span>
                  {tracker.me.firstReturnWinner + tracker.partner.firstReturnWinner}
                </span>
              )}
            </td>
            <td className='text-center'>
              {playerVsPlayer ? (
                <span>{tracker.partner.firstReturnWinner}</span>
              ) : (
                <span></span>
              )}
            </td>
          </tr>

          <tr>
            <td className='text-center'>Puntos ganados con la 1ra devolución</td>
            <td className='text-center'>
              {playerVsPlayer ? (
                <span>
                  {tracker.me.pointsWinnedFirstReturn}/{tracker.me.firstReturnIn}(
                  {calculatePercentage(
                    tracker.me.pointsWinnedFirstReturn,
                    tracker.me.firstReturnIn
                  )}
                  %)
                </span>
              ) : (
                <span>
                  {tracker.me.pointsWinnedFirstReturn +
                    tracker.partner.pointsWinnedFirstReturn}
                  /{tracker.rivalFirstServIn}(
                  {calculatePercentage(
                    tracker.me.pointsWinnedFirstReturn +
                      tracker.partner.pointsWinnedFirstReturn,
                    tracker.rivalFirstServIn
                  )}
                  %)
                </span>
              )}
            </td>
            <td className='text-center'>
              {playerVsPlayer ? (
                <span>
                  {tracker.partner.pointsWinnedFirstReturn}/
                  {tracker.partner.firstReturnIn}(
                  {calculatePercentage(
                    tracker.partner.pointsWinnedFirstReturn,
                    tracker.partner.firstReturnIn
                  )}
                  %)
                </span>
              ) : (
                <span>
                  {tracker.rivalPointsWinnedFirstReturn}/
                  {tracker.me.firstServIn + tracker.partner.firstServIn}(
                  {calculatePercentage(
                    tracker.rivalPointsWinnedFirstReturn,
                    tracker.me.firstServIn + tracker.partner.firstServIn
                  )}
                  %)
                </span>
              )}
            </td>
          </tr>

          <tr>
            <td className='text-center'>2da devolución in</td>
            <td className='text-center'>
              {playerVsPlayer ? (
                <span>
                  {tracker.me.secondReturnIn}/
                  {tracker.me.secondReturnIn + tracker.me.secondReturnOut}(
                  {calculatePercentage(
                    tracker.me.secondReturnIn,
                    tracker.me.secondReturnIn + tracker.me.secondReturnOut
                  )}
                  %)
                </span>
              ) : (
                <span>
                  {tracker.me.secondReturnIn + tracker.partner.secondReturnIn}/
                  {tracker.rivalSecondServIn}(
                  {calculatePercentage(
                    tracker.me.secondReturnIn + tracker.partner.secondReturnIn,
                    tracker.rivalSecondServIn
                  )}
                  %)
                </span>
              )}
            </td>
            <td className='text-center'>
              {playerVsPlayer ? (
                <span>
                  {tracker.partner.secondReturnIn}/
                  {tracker.partner.secondReturnIn + tracker.partner.secondReturnOut}(
                  {calculatePercentage(
                    tracker.partner.secondReturnIn,
                    tracker.partner.secondReturnIn + tracker.partner.secondReturnOut
                  )}
                  %)
                </span>
              ) : (
                <span>
                  {tracker.rivalSecondReturnIn}/
                  {tracker.me.secondServIn + tracker.partner.secondServIn}(
                  {calculatePercentage(
                    tracker.rivalSecondReturnIn,
                    tracker.me.secondServIn + tracker.partner.secondServIn
                  )}
                  %)
                </span>
              )}
            </td>
          </tr>

          <tr>
            <td className='text-center'>2da devolución ganadora</td>
            <td className='text-center'>
              {playerVsPlayer ? (
                <span>{tracker.me.secondReturnWon}</span>
              ) : (
                <span>
                  {tracker.me.secondReturnWon + tracker.partner.secondReturnWon}
                </span>
              )}
            </td>
            <td className='text-center'>
              {playerVsPlayer ? (
                <span>{tracker.partner.secondReturnWon}</span>
              ) : (
                <span></span>
              )}
            </td>
          </tr>

          <tr>
            <td className='text-center'>Winner con segunda devolución ganadora</td>
            <td className='text-center'>
              {playerVsPlayer ? (
                <span>{tracker.me.secondReturnWinner}</span>
              ) : (
                <span>
                  {tracker.me.secondReturnWinner + tracker.partner.secondReturnWinner}
                </span>
              )}
            </td>
            <td className='text-center'>
              {playerVsPlayer ? (
                <span>{tracker.partner.secondReturnWinner}</span>
              ) : (
                <span></span>
              )}
            </td>
          </tr>

          <tr>
            <td className='text-center'>Puntos ganados con la 2da devolución</td>
            <td className='text-center'>
              {playerVsPlayer ? (
                <span>
                  {tracker.me.pointsWinnedSecondReturn}/
                  {tracker.me.secondReturnIn + tracker.me.secondReturnOut}(
                  {calculatePercentage(
                    tracker.me.pointsWinnedSecondReturn,
                    tracker.me.secondReturnIn + tracker.me.secondReturnOut
                  )}
                  %)
                </span>
              ) : (
                <span>
                  {tracker.me.pointsWinnedSecondReturn +
                    tracker.partner.pointsWinnedSecondReturn}
                  /{tracker.rivalSecondReturnIn}(
                  {calculatePercentage(
                    tracker.me.pointsWinnedSecondReturn +
                      tracker.partner.pointsWinnedSecondReturn,
                    tracker.rivalSecondReturnIn
                  )}
                  %)
                </span>
              )}
            </td>
            <td className='text-center'>
              {playerVsPlayer ? (
                <span>
                  {tracker.partner.pointsWinnedSecondReturn}/
                  {tracker.partner.secondReturnIn + tracker.partner.secondReturnOut}(
                  {calculatePercentage(
                    tracker.partner.pointsWinnedSecondReturn,
                    tracker.partner.secondReturnIn + tracker.partner.secondReturnOut
                  )}
                  %)
                </span>
              ) : (
                <span>
                  {tracker.rivalPointsWinnedSecondReturn}/
                  {tracker.me.secondServIn + tracker.partner.secondServIn}(
                  {calculatePercentage(
                    tracker.rivalPointsWinnedSecondReturn,
                    tracker.me.secondServIn + tracker.partner.secondServIn
                  )}
                  %)
                </span>
              )}
            </td>
          </tr>

          {!playerVsPlayer && (
            <tr>
              <td className='text-center'>Break points</td>
              <td className='text-center'>
                {tracker.breakPtsWinned}/{tracker.winBreakPtsChances}
              </td>
              <td className='text-center'>
                {tracker.me.saveBreakPtsChances +
                  tracker.partner.saveBreakPtsChances -
                  (tracker.me.breakPtsSaved + tracker.partner.breakPtsSaved)}
                /{tracker.me.saveBreakPtsChances + tracker.partner.saveBreakPtsChances}
              </td>
            </tr>
          )}

          {!playerVsPlayer && (
            <tr>
              <td className='text-center'>Games ganados devolviendo</td>
              <td className='text-center'>{tracker.gamesWonReturning}</td>
              <td className='text-center'>
                {tracker.me.gamesLostServing + tracker.partner.gamesLostServing}
              </td>
            </tr>
          )}
        </tbody>
      )}
    </>
  );
};

export default Return;
