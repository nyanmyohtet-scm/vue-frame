import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

axios.defaults.baseURL = process.env.VUE_APP_SERVER;

export default new Vuex.Store({
    state: {
        user: null,
    },
    mutations: {
        setUserData(state, userData) {
            state.user = userData.user;
            state.user.access_token = userData.accessToken
        },
    },
    actions: {
        login({ commit }, credentials) {
            return axios.post("/login", credentials).then(({ data }) => {
                commit("setUserData", data);
            });
        },
        logout({ commit }, credentials) {
            return axios.post("/logout", credentials).then(() => {
                commit("setUserData", null);
            });
        },
    },
    getters: {
        isLoggedIn: (state) => !!state.user,
        userType: (state) => {
            if (state.user && "type" in state.user) {
                return state.user.type;
            }
            return 1;
        },
        userId: (state) => {
            if (state.user && state.user.id) {
                return state.user.id;
            }
        },
        userName: (state) => {
            if (state.user && state.user.name) {
                return state.user.name;
            }
        },
    },
    plugins: [createPersistedState()],
});
