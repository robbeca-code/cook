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
  initialState: {
    shares: [],
    applys: [],
    recipes: [],
  },

  reducers: {
    inputShareMark(state, id) {
      state.shares.push(id.payload);
    },

    inputApplyMark(state, id) {
      state.applys.push(id.payload);
    },

    inputRecipeMark(state, id) {
      state.recipes.push(id.payload);
    },

    deleteShareMark(state, id) {
      state.shares.splice(state.shares.indexOf(id.payload), 1);
    },

    deleteApplyMark(state, id) {
      state.applys.splice(state.applys.indexOf(id.payload), 1);
    },

    deleteRecipeMark(state, id) {
      state.recipes.splice(state.recipes.indexOf(id.payload), 1);
    },
  },
});

export let { changeEmail, changePasswd, changeName } = loginInfo.actions;

export let { setLogin } = login.actions;

export let { toggleMenuBtn, changeTarget } = clickMenu.actions;

export let {
  inputMark,
  deleteMark,
  inputShareMark,
  inputApplyMark,
  inputRecipeMark,
  deleteShareMark,
  deleteApplyMark,
  deleteRecipeMark,
} = mark.actions;

export default configureStore({
  reducer: {
    loginInfo: loginInfo.reducer,
    login: login.reducer,
    clickMenu: clickMenu.reducer,
    mark: mark.reducer,
  },
});
