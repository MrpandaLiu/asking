import { setStore } from '../utils'

export default {
    USER_INFO(state, payload) {
        state.username = payload.username;
        state.nickname = payload.nickname;
        state.password = payload.password;
        state.profile = payload.profile;
        state.gender = payload.gender;
        state.avatar = payload.avatar;
        setStore('user',{
            username: payload.username,
            avatar: payload.avatar
        });
    },
    USER_DATA(state, payload) {
        state.coin = payload.coin;
        state.queCount = payload.queCount;
        state.ansCount = payload.ansCount;
    },
    NICKNAME(state, payload) {
        state.nickname = payload.nickname;
    },
    AVATAR(state, payload) {
        state.avatar = payload.avatar;
        window.localStorage.removeItem('user');
        setStore('user',{
            username: state.username,
            avatar: payload.avatar
        });
    },
    ADDCOIN(state) {
        state.coin+=2;
    },
    CUTCOIN(state) {
        state.coin--;
    },
    ADDQUE(state) {
        state.queCount++;
    },
    CUTQUE(state) {
        state.queCount--;
    },
    ADDANS(state) {
        state.ansCount++;
    },
    CUTANS(state) {
        state.ansCount--;
    },
    HOME_LIST(state, payload) {
        state.HomeList = payload.HomeList;
    }
}