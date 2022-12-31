<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-between">
      <h1>
        <strong>Benvenuto {{ name }}</strong>
      </h1>
      <button class="btn btn-primary">
        <font-awesome-icon icon="fa-plus"></font-awesome-icon>
        Nuova Classe
      </button>
    </div>
    <br />
    <h4>Le tue classi</h4>
    <classes />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Classes from "@/components/Classes.vue";

export default defineComponent({
  components: {
    Classes,
  },
  setup() {
    return {
      name: "Romeo",
    };
  },
});
</script>

<style lang="scss" scoped>
.container-fluid {
  padding: 25px;
  text-align: left;
}

.d-flex {
  align-items: center; // Centra in altezza
}
</style>
