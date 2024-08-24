// // src/hooks/useGlobalState.ts
// import create from 'zustand';

// interface AppState {
//   favoriteItems: string[];
//   addFavorite: (item: string) => void;
// }

// export const useGlobalState = create<AppState>(set => ({
//   favoriteItems: [],
//   addFavorite: item =>
//     set(state => ({
//       favoriteItems: [...state.favoriteItems, item],
//     })),
// }));
