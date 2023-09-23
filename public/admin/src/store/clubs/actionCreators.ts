// import { ClubAction, IClub } from "../../types/club"
// import * as actionTypes from "./actionTypes"

// export function getClubs(article: IClub) {
//   const action: ClubAction = {
//     type: actionTypes.ADD_ARTICLE,
//     article,
//   }

//   return simulateHttpRequest(action)
// }

// export function removeArticle(article: IArticle) {
//   const action: ClubAction = {
//     type: actionTypes.REMOVE_ARTICLE,
//     article,
//   }
//   return simulateHttpRequest(action)
// }

// export function simulateHttpRequest(action: ClubAction) {
//   return (dispatch: DispatchType) => {
//     setTimeout(() => {
//       dispatch(action)
//     }, 500)
//   }
// }