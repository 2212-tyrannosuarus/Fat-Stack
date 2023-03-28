import axios from "axios";
import { useNavigate } from "react-router-dom";

const TOKEN = "token";

const SET_AUTH = "SET_AUTH";

const setAuth = (auth) => ({ type: SET_AUTH, auth });

export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth({ isLoading: false, ...res.data }));
  }
  return dispatch(setAuth({ isLoading: false }));
};

export const authenticateUser =
  ({ username, password }) =>
  async (dispatch) => {
    try {
      const res = await axios.post(`/auth/login`, {
        username,
        password,
      });
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const createUser =
  ({ username, password, firstname, lastname, email, phone_number }) =>
  async (dispatch) => {
    try {
      const res = await axios.post(`/auth/signup`, {
        username,
        password,
        lastname,
        firstname,
        email,
        phone_number,
      });
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  window.localStorage.removeItem("cart");
  return {
    type: SET_AUTH,
    auth: {},
  };
};

export default function (
  state = {
    isLoading: true,
  },
  action
) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
