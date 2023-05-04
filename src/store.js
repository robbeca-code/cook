import { configureStore, createSlice } from "@reduxjs/toolkit";

let login = createSlice({
  name: "login",
  initialState: { email: "", passwd: "", nickname: "" },
  reducers: {
    changeEmail(state, email) {
      state.email = email.payload;
    },

    changePasswd(state, pw) {
      state.passwd = pw.payload;
    },

    changeNick(state, nick) {
      state.nickname = nick.payload;
    },
  },
});

let showUser = createSlice({
  name: "showUser",
  initialState: false,

  reducers: {
    setShowUser() {
      return true;
    },
  },
});

let clickMenu = createSlice({
  name: "clickMenu",
  initialState: { status: false, target: "home" },

  reducers: {
    toggleMenuBtn(state) {
      state.status = !state.status;
    },
    changeTarget(state, target) {
      state.target = target.payload;
    },
  },
});

let mark = createSlice({
  name: "mark",
  initialState: [],

  reducers: {
    inputMark(state, id) {
      state.push(id.payload);
    },

    deleteMark(state, id) {
      state.splice(state.indexOf(id.payload), 1);
    },
  },
});

export let { changeEmail, changePasswd, changeNick } = login.actions;

export let { setShowUser } = showUser.actions;

export let { toggleMenuBtn, changeTarget } = clickMenu.actions;

export let { inputMark, deleteMark } = mark.actions;

export default configureStore({
  reducer: {
    login: login.reducer,
    showUser: showUser.reducer,
    clickMenu: clickMenu.reducer,
    mark: mark.reducer,
  },
});
