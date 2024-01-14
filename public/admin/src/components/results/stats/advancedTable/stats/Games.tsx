import { IPropsTable } from '../../GameStats';
import '../../GameStats.scss';

const Games = ({ tracker }: IPropsTable) => {
  return (
    <>
      <div className='title'>
        <span>Games</span>
      </div>

      <tbody>
        <tr>
          <td className='text-center'>Games ganados con el servicio</td>
          <td className='text-center'>
            <span>
              {tracker.me.gamesWonServing}/
              {tracker.me.gamesWonServing + tracker.me.gamesLostServing}
            </span>
          </td>
          <td className='text-center'>
            <span>
              {tracker.gamesLostReturning}/
              {tracker.gamesLostReturning + tracker.gamesWonReturning}
            </span>
          </td>
        </tr>

        <tr>
          <td className='text-center'>Games ganados con la devolución</td>
          <td className='text-center'>
            {tracker.gamesWonReturning}/
            {tracker.gamesWonReturning + tracker.gamesLostReturning}
          </td>
          <td className='text-center'>
            {tracker.me.gamesLostServing}/
            {tracker.me.gamesLostServing + tracker.me.gamesWonServing}
          </td>
        </tr>

        <tr>
          <td className='text-center'>Games ganados en total</td>
          <td className='text-center'>
            {tracker.me.gamesWonServing + tracker.gamesWonReturning}/
            {tracker.me.gamesWonServing +
              tracker.me.gamesLostServing +
              tracker.gamesWonReturning +
              tracker.gamesLostReturning}
          </td>
          <td className='text-center'>
            {tracker.me.gamesLostServing + tracker.gamesLostReturning}/
            {tracker.me.gamesWonServing +
              tracker.me.gamesLostServing +
              tracker.gamesWonReturning +
              tracker.gamesLostReturning}
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default Games;
