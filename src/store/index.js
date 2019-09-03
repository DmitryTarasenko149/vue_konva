import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  stage: {
    width: window.innerWidth,
    height: window.innerHeight,
    draggable: true,
  },
  seats: [{
    id: 1,
    name: 'seat 1',
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    fill: 'grey',
    stroke: 'black',
    strokeWidth: 1,
    status: 'available',
    type: 'seat',
    size: 50,
    radius: 25
  }],
};

export default new Vuex.Store({
  state,
});
