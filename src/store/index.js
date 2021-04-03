import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    images: [],
    ratio: 'stretch',
    ratioTypes: {
      stretch: 'Stretch to canvas size',
      keepSize: 'Keep own size',
      fit: 'Fit one of side',
      fitH: 'Fit vertically',
      fitW: 'Fit horizontally',
      square: '1:1',
    },
  },
  getters: {
    numOfImages(state) {
      return state.images.length;
    },
  },
  mutations: {
    addImage(state, payload) {
      state.images.push(payload);
    },
    setImages(state, payload) {
      state.images = payload;
    },
    removeImages(state) {
      state.images.splice(0, state.images.length);
    },
    setRatio(state, payload) {
      state.ratio = payload;
      sessionStorage.setItem('ratio', payload);
    },
  },
  actions: {},
  modules: {},
});
