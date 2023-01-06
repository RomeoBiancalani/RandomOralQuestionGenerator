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
    <div id="classCreatedAlert" style="display: none;">
      <div class="alert alert-primary alert-dismissible d-flex align-items-center" role="alert">
        <font-awesome-icon icon="fa-solid fa-check" style="margin-right: 5px;" />
        <div>
          Classe aggiunta con successo!
          <!-- <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> -->
          <button type="button" class="btn-close" @click="closeAlert('#classCreatedAlert')" aria-label="Close"></button>
        </div>
      </div>
    </div>
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
            <div id="errorClass" style="display: none;">
              <div class="alert alert-info alert-dismissible d-flex align-items-center" role="alert">
              <font-awesome-icon icon="fa-solid fa-circle-exclamation" style="margin-right: 5px;" />
                <div>
                  {{ errorClassText }}
                  <!-- <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> -->
                  <button type="button" class="btn-close" @click="closeAlert('#errorClass')"></button>
                </div>
              </div>
            </div>

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
                v-model="classNameInput"
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
                v-model="classStudentsInput"
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-info"
              data-bs-dismiss="modal"
            >
              Annulla
            </button>
            <button type="button" class="btn btn-primary" @click="saveClass">Salva</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import Classes from "@/components/Classes.vue";
import {insertClass, getAllClasses} from "@/modules/database.js";
import localforage from "localforage";

export default defineComponent({
  components: {
    Classes,
  },
  setup() {
    return {
      name: ref(""),
      classStudentsInput: "",
      classNameInput: "",
      errorClassText: ref("")
    };
  },
  mounted() {
    const vm = this;
    localforage.getItem("globalName", function (err, value) {
      vm.name = value;
    });

    // Controllo quando si chiude il modal dell'aggiunta della classe per pulire le variabili
    $('#newClassModal').on('hidden.bs.modal', function (e) {
      console.log("Modal Nascosto")
      console.log("Variabili", vm.classStudentsInput, vm.classNameInput)
      vm.classStudentsInput = "";
      vm.classNameInput = "";
      console.log("Variabili", vm.classStudentsInput, vm.classNameInput)
    })
  },
  methods: {
    saveClass: async function () {
      const vm = this;
      if (vm.classNameInput == null || vm.classNameInput == "") {
        vm.errorClassText = "Il nome della classe non può essere vuoto!"
        $("#errorClass").fadeIn(1000);
        return;
      }
      if (vm.classStudentsInput == null || vm.classStudentsInput == "") {
        vm.errorClassText = "Almeno uno studente deve essere presente nella classe!"
        $("#errorClass").fadeIn(1000);
        return;
      }
      let err = await insertClass(vm.classNameInput, vm.classStudentsInput);
      console.log("Inserisci Classe", err);
      if (err == -1) {
        vm.errorClassText = "Errore durante l'aggiunta della classe! Classe già esistente!";
        $("#errorClass").fadeIn(1000);
        return;
      }
      
      $("#newClassModal").modal("hide");
      $("#classCreatedAlert").fadeIn(1000);
      
    },
    closeAlert(id) {
      $(id).fadeOut(1000);
    }
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
