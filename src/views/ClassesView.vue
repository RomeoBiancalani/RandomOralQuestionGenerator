<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-between">
      <h1>
        <strong>Benvenuto {{ name }}</strong>
      </h1>
      <button
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#newClassModal"
      >
        <font-awesome-icon icon="fa-plus"></font-awesome-icon>
        Nuova Classe
      </button>
    </div>

    <br />
    <h4>Le tue classi</h4>
    <classes />

    <!-- Modal Nuova classe -->
    <div
      class="modal fade"
      id="newClassModal"
      tabindex="-1"
      aria-hidden="true"
      aria-labelledby="newClassModalLabel"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="newClassModalLabel">
              Aggiungi una nuova classe
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <h5>
              Per aggiungere una nuova classe segui le istruzioni indicate qua
              sotto.
            </h5>

            <div class="mb-3">
              <label for="className" class="form-label">Nome Classe</label>
              <input
                type="text"
                class="form-control"
                id="className"
                placeholder="4H - Informatica"
              />
            </div>
            <div class="mb-3">
              <label for="classStudents" class="form-label"
                >Lista studenti</label
              >
              <textarea
                class="form-control"
                id="classStudents"
                placeholder="Diego Barbieri
Emma Visentin 
Stefania Martino 
Luca Conti 
Gaia Martinelli"
                rows="7"
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Annulla
            </button>
            <button type="button" class="btn btn-primary">Salva</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Classes from "@/components/Classes.vue";
import localforage from "localforage";

export default defineComponent({
  components: {
    Classes,
  },
  setup() {
    return {
      name: "Romeo",
    };
  },
  mounted() {
  }
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
