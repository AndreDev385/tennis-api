import { IPropsTable } from '../../GameStats';
import '../../GameStats.scss';

const Rally = ({ tracker }: IPropsTable) => {
  const totalShortRally = tracker.shortRallyWon + tracker.shortRallyLost;
  const totalMediumRally = tracker.mediumRallyWon + tracker.mediumRallyLost;
  const totalLongRally = tracker.longRallyWon + tracker.longRallyLost;

  const calculatePercentage = (a: number, b: number): number => {
    if (b === 0) return 0;
    return Math.floor((a / b) * 100);
  };

  return (
    <>
      <div className='title'>
        <span>Rally</span>
      </div>
      <tbody>
        <tr>
          <td className='text-center'>Puntos ganados con rally corto</td>
          <td className='text-center'>
            {tracker.shortRallyWon}/{totalShortRally}(
            {calculatePercentage(tracker.shortRallyWon, totalShortRally)}%)
          </td>
          <td className='text-center'>
            {tracker.shortRallyLost}/{totalShortRally}(
            {calculatePercentage(tracker.shortRallyLost, totalShortRally)}%)
          </td>
        </tr>

        <tr>
          <td className='text-center'>Puntos ganados con rally medio</td>
          <td className='text-center'>
            {tracker.mediumRallyWon}/{totalMediumRally}(
            {calculatePercentage(tracker.mediumRallyWon, totalMediumRally)}%)
          </td>
          <td className='text-center'>
            {tracker.mediumRallyLost}/{totalMediumRally}(
            {calculatePercentage(tracker.mediumRallyLost, totalMediumRally)}%)
          </td>
        </tr>

        <tr>
          <td className='text-center'>Puntos ganados con rally largo</td>
          <td className='text-center'>
            {tracker.longRallyWon}/{totalLongRally}(
            {calculatePercentage(tracker.longRallyWon, totalLongRally)}%)
          </td>
          <td className='text-center'>
            {tracker.longRallyLost}/{totalLongRally}(
            {calculatePercentage(tracker.longRallyLost, totalLongRally)}%)
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default Rally;
