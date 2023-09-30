// import { ClubAction, ClubState } from "../../types/club";
// import {GET_CLUBS, SUBSCRIPTION_CLUB} from './actionTypes';

// const initialState: ClubState = {
//     clubs: []
// }

// const reducer = (
//     state: ClubState = initialState,
//     action: ClubAction
//   ): ClubState => {
//     switch (action.type) {
//       case GET_CLUBS:
        
//         return {
//           ...state,
//           clubs: action.clubs,
//         }
//       case SUBSCRIPTION_CLUB:
//         const updatedArticles: IArticle[] = state.articles.filter(
//           article => article.id !== action.article.id
//         )
//         return {
//           ...state,
//           articles: updatedArticles,
//         }
//     }
//     return state
//   }
  
//   export default reducer