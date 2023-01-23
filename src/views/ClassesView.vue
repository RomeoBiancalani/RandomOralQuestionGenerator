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
        aria-label="Inserire una nuova classe"
      >
        <!-- tag accessibilita': aria-label -->
        <font-awesome-icon icon="fa-plus"></font-awesome-icon>
        Nuova Classe
      </button>
    </div>

    <br />
    <h4>Le tue classi</h4>
    <div id="classCreatedAlert" style="display: none">
      <div
        class="alert alert-primary alert-dismissible d-flex align-items-center"
        role="alert"
      >
        <!-- tag accessibilita': role -->
        <font-awesome-icon icon="fa-solid fa-check" style="margin-right: 5px" />
        <div>
          Classe aggiunta con successo!
          <!-- <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> -->
          <button
            type="button"
            class="btn-close"
            @click="closeAlert('#classCreatedAlert')"
            aria-label="Close"
          ></button>
          <!-- tag accessibilita': aria-label -->
        </div>
      </div>
    </div>
    <suspense>
      <classes :classes.sync="classesList" />
    </suspense>

    <!-- Modal Nuova classe -->
    <div
      class="modal fade"
      id="newClassModal"
      tabindex="-1"
      aria-hidden="true"
      aria-labelledby="newClassModalLabel"
    >
      <!-- tag accessibilita': aria-hidden, aria-labelledby -->
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
            <!-- tag accessibilita': aria-label -->
          </div>
          <div class="modal-body">
            <div id="errorClass" style="display: none">
              <div
                class="alert alert-info alert-dismissible d-flex align-items-center"
                role="alert"
              >
                <!-- tag accessibilita': role -->
                <font-awesome-icon
                  icon="fa-solid fa-circle-exclamation"
                  style="margin-right: 5px"
                />
                <div>
                  {{ errorClassText }}
                  <!-- <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> -->
                  <button
                    type="button"
                    class="btn-close"
                    @click="closeAlert('#errorClass')"
                  ></button>
                </div>
              </div>
            </div>

            <h5 aria-label="Info su aggiunta classe">
              Per aggiungere una nuova classe segui le istruzioni indicate qua
              sotto.
            </h5>
            <!-- tag accessibilita': aria-label -->

            <div class="mb-3" aria-label="Input informazioni nuova classe">
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
            <button type="button" class="btn btn-info" data-bs-dismiss="modal">
              Annulla
            </button>
            <button type="button" class="btn btn-primary" @click="saveClass">
              Salva
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal eliminazione classe -->
    <div
      class="modal fade"
      id="deleteClassModal"
      tabindex="-1"
      aria-hidden="true"
      aria-labelledby="deleteClassModalLabel"
      aria-live="assertive"
    >
      <!-- tag accessibilita': aria-hidden, aria-labelledby, aria-live -->
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <h5 class="modal-header text-center"><strong>Attenzione!</strong></h5>
          <div class="modal-body text-center">
            Vuoi <strong>eliminare</strong> {{ nomeClasse }}?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-info"
              data-bs-dismiss="modal"
              @click="removeFromClassesList(indexClasse)"
              aria-label="Cancella la classe"
            >
              <!-- tag accessibilita': aria-label -->
              Si
            </button>

            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              aria-label="Non cancellare la classe"
            >
              <!-- tag accessibilita': aria-label -->
              No
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Inserisci Nome -->
    <!-- TODO: Fixare il vertically centered che non va con jquery -->
    <div
      class="modal fade"
      id="insertNameModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="insertNameModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="insertNameModalLabel">
              Inserisci il tuo nome
            </h1>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="className" class="form-label">Nome</label>
              <input type="text" class="form-control" id="generalName" />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              @click="saveGlobalName"
            >
              Salva
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import Classes from "@/components/Classes.vue";
import { insertClass, getAllClasses } from "@/modules/database.js";
import localforage from "localforage";

export default defineComponent({
  components: {
    Classes,
  },
  setup() {
    let classes = ref([]);
    // Get Lista classi
    localforage.getItem("classes").then((value, error) => {
      console.log("Classi", value, error);
      classes.value = value;
      classes.value.forEach((el) => {
        el.questionedPercent =
          (el.questionedNumber / el.studentsNumber) * 100;
      });
    });

    return {
      name: ref(""),
      classStudentsInput: "",
      classNameInput: "",
      errorClassText: ref(""),
      classesList: classes, // ref
      nomeClasse: ref(""),
    };
  },
  mounted() {
    const vm = this;
    localforage.getItem("globalName", function (err, value) {
      if (value == null) {
        $("#insertNameModal").modal("show");
      } else {
        vm.name = value;
        $("#insertNameModal").modal("hide");
      }
    });

    // Controllo quando si chiude il modal dell'aggiunta della classe per pulire le variabili
    $("#newClassModal").on("hidden.bs.modal", function (e) {
      console.log("Modal Nascosto");
      console.log("Variabili", vm.classStudentsInput, vm.classNameInput);
      vm.classStudentsInput = "";
      vm.classNameInput = "";
      console.log("Variabili", vm.classStudentsInput, vm.classNameInput);
    });
  },
  methods: {
    saveClass: async function () {
      const vm = this;
      if (vm.classNameInput == null || vm.classNameInput == "") {
        vm.errorClassText = "Il nome della classe non può essere vuoto!";
        $("#errorClass").fadeIn(1000);
        return;
      }
      if (vm.classStudentsInput == null || vm.classStudentsInput == "") {
        vm.errorClassText =
          "Almeno uno studente deve essere presente nella classe!";
        $("#errorClass").fadeIn(1000);
        return;
      }
      let err = await insertClass(vm.classNameInput, vm.classStudentsInput);
      console.log("Inserisci Classe", err);
      if (err == -1) {
        vm.errorClassText =
          "Errore durante l'aggiunta della classe! Classe già esistente!";
        $("#errorClass").fadeIn(1000);
        return;
      }

      $("#newClassModal").modal("hide");
      $("#classCreatedAlert").fadeIn(1000);

      // Aggiungo la classe allo schermo
      vm.classesList = await getAllClasses();
    },
    closeAlert(id) {
      $(id).fadeOut(1000);
    },
    saveGlobalName: function () {
      const vm = this;
      $("#insertNameModal").modal("hide");
      const name = $("#generalName").val();
      localforage
        .setItem("globalName", name)
        .then(function (value) {
          console.log(value);
          vm.name = name;
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },
  watch: {},
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
