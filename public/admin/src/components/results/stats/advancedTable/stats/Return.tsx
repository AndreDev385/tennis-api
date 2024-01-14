import { calculatePercentage } from '../../../../../utils/calculatePercantage';
import { IPropsTable } from '../../GameStats';
import '../../GameStats.scss';

const Return = ({ tracker }: IPropsTable) => {
  return (
    <>
      <div className='title'>
        <span>Devolución</span>
      </div>

      <tbody>
        <tr>
          <td className='text-center'>1ra devolución in</td>
          <td className='text-center'>
            <span>
              {tracker.me.firstReturnIn}/
              {tracker.me.firstReturnIn + tracker.me.firstReturnOut}(
              {calculatePercentage(
                tracker.me.firstReturnIn,
                tracker.me.firstReturnIn + tracker.me.firstReturnOut
              )}
              %)
            </span>
          </td>
          <td className='text-center'>
            <span>
              {tracker.rivalFirstReturnIn}/{tracker.me.firstServIn}(
              {calculatePercentage(tracker.rivalFirstReturnIn, tracker.me.firstServIn)}
              %)
            </span>
          </td>
        </tr>

        <tr>
          <td className='text-center'>1ra devolución ganadora</td>
          <td className='text-center'>
            <span>{tracker.me.firstReturnWon}</span>
          </td>
          <td className='text-center'>
            <span></span>
          </td>
        </tr>

        <tr>
          <td className='text-center'>Winner con primera devolución ganadora</td>
          <td className='text-center'>
            <span>{tracker.me.firstReturnWinner}</span>
          </td>
          <td className='text-center'>
            <span></span>
          </td>
        </tr>

        <tr>
          <td className='text-center'>Puntos ganados con la 1ra devolución</td>
          <td className='text-center'>
            <span>
              {tracker.me.pointsWinnedFirstReturn}/{tracker.me.firstReturnIn}(
              {calculatePercentage(
                tracker.me.pointsWinnedFirstReturn,
                tracker.me.firstReturnIn
              )}
              %)
            </span>
          </td>
          <td className='text-center'>
            <span>
              {tracker.rivalPointsWinnedFirstReturn}/{tracker.me.firstServIn}(
              {calculatePercentage(
                tracker.rivalPointsWinnedFirstReturn,
                tracker.me.firstServIn
              )}
              %)
            </span>
          </td>
        </tr>

        <tr>
          <td className='text-center'>2da devolución in</td>
          <td className='text-center'>
            <span>
              {tracker.me.secondReturnIn}/
              {tracker.me.secondReturnIn + tracker.me.secondReturnOut}(
              {calculatePercentage(
                tracker.me.secondReturnIn,
                tracker.me.secondReturnIn + tracker.me.secondReturnOut
              )}
              %)
            </span>
          </td>
          <td className='text-center'>
            <span>
              {tracker.rivalSecondReturnIn}/{tracker.me.secondServIn}(
              {calculatePercentage(tracker.rivalSecondReturnIn, tracker.me.secondServIn)}
              %)
            </span>
          </td>
        </tr>

        <tr>
          <td className='text-center'>2da devolución ganadora</td>
          <td className='text-center'>
            <span>{tracker.me.secondReturnWon}</span>
          </td>
          <td className='text-center'>
            <span></span>
          </td>
        </tr>

        <tr>
          <td className='text-center'>Winner con segunda devolución ganadora</td>
          <td className='text-center'>
            <span>{tracker.me.secondReturnWinner}</span>
          </td>
          <td className='text-center'>
            <span></span>
          </td>
        </tr>

        <tr>
          <td className='text-center'>Puntos ganados con la 2da devolución</td>
          <td className='text-center'>
            <span>
              {tracker.me.pointsWinnedSecondReturn}/
              {tracker.me.secondReturnIn + tracker.me.secondReturnOut}(
              {calculatePercentage(
                tracker.me.pointsWinnedSecondReturn,
                tracker.me.secondReturnIn + tracker.me.secondReturnOut
              )}
              %)
            </span>
          </td>
          <td className='text-center'>
            <span>
              {tracker.rivalPointsWinnedSecondReturn}/{tracker.me.secondServIn}(
              {calculatePercentage(
                tracker.rivalPointsWinnedSecondReturn,
                tracker.me.secondServIn
              )}
              %)
            </span>
          </td>
        </tr>

        <tr>
          <td className='text-center'>Break points</td>
          <td className='text-center'>
            {tracker.breakPtsWinned}/{tracker.winBreakPtsChances}
          </td>
          <td className='text-center'>
            {tracker.me.saveBreakPtsChances - tracker.me.breakPtsSaved}/
            {tracker.me.saveBreakPtsChances}
          </td>
        </tr>

        <tr>
          <td className='text-center'>Games ganados devolviendo</td>
          <td className='text-center'>{tracker.gamesWonReturning}</td>
          <td className='text-center'>{tracker.me.gamesLostServing}</td>
        </tr>
      </tbody>
    </>
  );
};

export default Return;
