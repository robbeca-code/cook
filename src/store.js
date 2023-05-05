import { configureStore, createSlice } from "@reduxjs/toolkit";

let loginInfo = createSlice({
  name: "loginInfo",
  initialState: { email: "", passwd: "", name: "" },
  reducers: {
    changeEmail(state, email) {
      state.email = email.payload;
    },

    changePasswd(state, pw) {
      state.passwd = pw.payload;
    },

    changeName(state, name) {
      state.name = name.payload;
    },
  },
});

let login = createSlice({
  name: "login",
  initialState: false,

  reducers: {
    setLogin() {
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

export let { changeEmail, changePasswd, changeName } = loginInfo.actions;

export let { setLogin } = login.actions;

export let { toggleMenuBtn, changeTarget } = clickMenu.actions;

export let { inputMark, deleteMark } = mark.actions;

export default configureStore({
  reducer: {
    loginInfo: loginInfo.reducer,
    login: login.reducer,
    clickMenu: clickMenu.reducer,
    mark: mark.reducer,
  },
});
