 <template>
  <div class="text-center">
    <h3 class='font-extrabold mb-6 text-3xl'>name：{{ name }}</h3>
    <input v-model="newName" type="text" class="p-2 border-gray-600 rounded border mr-2">
    <button class="text-white bg-indigo-600 p-2 rounded" @click="saveName"> summit</button>
  </div>
</template>
 
 <script>
 
 export default {
   name: 'home-page',
 };
 </script>

 <script setup>
import { computed,ref } from 'vue';
import { useStore } from 'vuex';
const store = useStore()
const name = computed(() => store.state.user.name)
const newName = ref('')
function saveName() {
  store.dispatch('saveName', newName.value)
  newName.value = ''
}
</script>
