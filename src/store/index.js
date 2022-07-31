import { createStore } from "vuex";
import user from '../store/modules/user'
import loading from "../store/modules/loading";
import getters from './getter'
const store = createStore({
  modules: {
    user, loading,
  }, getters
})
export default store
