import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {
    avatarUrl: "",
    selectedCategories: [],
    flashCards: [],
  },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    updateAvatar: (state, action) => {
      state.user.avatarUrl = action.payload;
    },
    rdx_setSelectedCategories: (state, action) => {
      state.user.selectedCategories = action.payload;
    },
    rdx_setFlashCards: (state, action) => {
      state.user.flashCards = action.payload;
    }
  }
})

export const { setUser, updateAvatar, rdx_setSelectedCategories, rdx_setFlashCards } = userSlice.actions;

export default userSlice.reducer