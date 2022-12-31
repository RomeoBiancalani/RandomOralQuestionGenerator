<template>
  <div class="container-fluid">
    <h1><strong>Benvenuto {{name}}</strong></h1>
    <br>
    
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// @ is an alias to /src
import Classes from "@/components/Classes.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    Classes
  },
  setup() 
    {
    return {
      name: "Romeo"
    }
  }
});
</script>

<style lang="scss" scoped>
.container-fluid
{
  padding: 25px;
  text-align: left;
}
</style>
