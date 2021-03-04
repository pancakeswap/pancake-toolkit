import { Action, ProviderState } from "./types";

const reducer = (state: ProviderState, action: Action): ProviderState => {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        isFetching: true,
      };
    case "FETCH_SUCCEEDED":
      return {
        ...state,
        isFetching: false,
        translations: {
          ...state.translations,
          [action.code]: action.translations,
        },
      };
    case "SET_LANG":
      return {
        ...state,
        currentLanguage: action.language,
      };
    default:
      return state;
  }
};

export default reducer;
