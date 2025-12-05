import { reactive } from 'vue';
import { applyPatches } from 'immer';

export default reactive({
  state: {
    power: {
      MAIN: 0,
      PROG: 0,
    },
  },
  updateState(data) {
    const { patches } = data;
    if (!patches) {
      this.state = data;
      return;
    }
    this.state = applyPatches(this.state, patches);
    console.log(this.state);
  },
});
