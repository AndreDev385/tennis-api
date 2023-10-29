import { IPropsTable } from "../GameStats"
import BallInGame from "./stats/BallInGame"
import Games from "./stats/Games"
import Points from "./stats/Points"
import Rally from "./stats/Rally"
import Return from "./stats/Return"
import Service from "./stats/Service"

const CoupleVsTable = ({tracker, mode, playerVsPlayer}: IPropsTable) => {
  return (
    <> 
      <Service tracker={tracker} mode={mode} playerVsPlayer={playerVsPlayer}/>
      <Return tracker={tracker} mode={mode} playerVsPlayer={playerVsPlayer} />
      <Points tracker={tracker} mode={mode} playerVsPlayer={playerVsPlayer}/>
      {!playerVsPlayer && <Games tracker={tracker}  mode={mode} playerVsPlayer={playerVsPlayer}/>}
      <BallInGame tracker={tracker} mode={mode} playerVsPlayer={playerVsPlayer}/>
      {!playerVsPlayer && <Rally tracker={tracker} mode={mode} playerVsPlayer={playerVsPlayer}/>}
    </>
  )
}

export default CoupleVsTable