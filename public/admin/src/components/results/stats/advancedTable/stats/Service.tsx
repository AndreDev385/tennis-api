import { calculatePercentage } from '../../../../../utils/calculatePercantage';
import { IPropsTable } from '../../GameStats';
import '../../GameStats.scss';

const Service = ({ tracker }: IPropsTable) => {
  return (
    <>
      <div className='title'>
        <span>Servicio</span>
      </div>

      <tbody>
        <tr>
          <td className='text-center'>Aces</td>
          <td className='text-center'>{tracker.me.aces}</td>
          <td className='text-center'>{tracker.rivalAces}</td>
        </tr>

        <tr>
          <td className='text-center'>Doble faltas</td>
          <td className='text-center'>{tracker.me.dobleFaults}</td>
          <td className='text-center'>{tracker.rivalDobleFault}</td>
        </tr>

        <tr>
          <td className='text-center'>1er Servicio In</td>
          <td className='text-center'>
            {tracker.me.firstServIn}/{tracker.me.firstServIn + tracker.me.secondServIn}(
            {calculatePercentage(
              tracker.me.firstServIn,
              tracker.me.firstServIn + tracker.me.secondServIn
            )}
            %)
          </td>
          <td className='text-center'>
            {tracker.rivalFirstServIn}/
            {tracker.rivalFirstServIn + tracker.rivalSecondServIn}(
            {calculatePercentage(
              tracker.rivalFirstServIn,
              tracker.rivalFirstServIn + tracker.rivalSecondServIn
            )}
            %)
          </td>
        </tr>

        <tr>
          <td className='text-center'>Ptos ganados con el 1er servicio</td>
          <td className='text-center'>
            {tracker.me.pointsWinnedFirstServ}/{tracker.me.firstServIn}(
            {calculatePercentage(
              tracker.me.pointsWinnedFirstServ,
              tracker.me.firstServIn
            )}
            %)
          </td>
          <td className='text-center'>
            {tracker.rivalPointsWinnedFirstServ}/{tracker.rivalFirstServIn}(
            {calculatePercentage(
              tracker.rivalPointsWinnedFirstServ,
              tracker.rivalFirstServIn
            )}
            %)
          </td>
        </tr>

        <tr>
          <td className='text-center'>Ptos ganados con el 2do servicio</td>
          <td className='text-center'>
            {tracker.me.pointsWinnedSecondServ}/{tracker.me.secondServIn}(
            {calculatePercentage(
              tracker.me.pointsWinnedSecondServ,
              tracker.me.secondServIn
            )}
            %)
          </td>
          <td className='text-center'>
            {tracker.rivalPointsWinnedSecondServ}/{tracker.rivalSecondServIn}(
            {calculatePercentage(
              tracker.rivalPointsWinnedSecondServ,
              tracker.rivalSecondServIn
            )}
            %)
          </td>
        </tr>

        <tr>
          <td className='text-center'>Games ganados con el servicio</td>
          <td className='text-center'>{tracker.me.gamesWonServing}</td>
          <td className='text-center'>{tracker.gamesLostReturning}</td>
        </tr>
      </tbody>
    </>
  );
};

export default Service;
