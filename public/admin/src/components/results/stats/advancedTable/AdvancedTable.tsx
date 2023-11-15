import { IPropsTable } from "../GameStats"
import BallInGame from "./stats/BallInGame"
import Games from "./stats/Games"
import Points from "./stats/Points"
import Rally from "./stats/Rally"
import Return from "./stats/Return"
import Service from "./stats/Service"

const AdvancedTable = ({tracker, playerVsPlayer}: IPropsTable) => {
  return (
    <> 
      <Service tracker={tracker} playerVsPlayer={playerVsPlayer}/>
      <Return tracker={tracker} playerVsPlayer={playerVsPlayer} />
      <Points tracker={tracker} playerVsPlayer={playerVsPlayer}/>
      <Games tracker={tracker}  playerVsPlayer={playerVsPlayer}/>
      <BallInGame tracker={tracker} playerVsPlayer={playerVsPlayer}/>
      <Rally tracker={tracker} playerVsPlayer={playerVsPlayer}/>
    </>
  )
}

export default AdvancedTable