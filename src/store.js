import {configureStore, createSlice} from '@reduxjs/toolkit';

let login = createSlice({
  name: 'login',
  initialState: {email: '', passwd: '', nickname: ''},
  reducers: {
    changeEmail(state, email) {
      state.email = email.payload;
    },

    changePasswd(state, pw) {
      state.passwd = pw.payload;
    },

    changeNick(state, nick) {
      state.nickname = nick.payload;
    }
  }
});

let mark = createSlice({
  name: 'mark',
  initialState: [''],

  inputMark(state, id) {
    return state.push(id);
  },

  deleteMark(state, i) {
    return state.slice(i, 1);
  }
});

export let {changeEmail, changePasswd, changeNick} = login.actions;

export let {inputMark, deleteMark} = mark.actions;

export default configureStore({
  reducer: {
    login: login.reducer,
    mark: mark.reducer
  }
});