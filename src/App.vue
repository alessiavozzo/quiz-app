<script>
import AppMain from "./components/AppMain.vue";
//import {state} from "./assets/js/state.js";

export default {
  name: "App",
  components:{
    AppMain
  },
  data(){
      return{
        //state: state
      }
  },
  mounted(){
      //state.getQuestions();
  }
}

</script>

<template>
  <AppMain />
</template>

<style scoped>

</style>
