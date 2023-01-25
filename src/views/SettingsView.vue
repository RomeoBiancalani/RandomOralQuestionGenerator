<template>
  <div class="container-fluid">
    <h1>
      <strong>Security</strong>
    </h1>
    <br />
    <div class="accordion" id="settingsList">
      <div class="accordion-item">
        <h2 class="accordion-header" id="exportSettings">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            Esporta le classi
          </button>
        </h2>
        <div
          id="collapseOne"
          class="accordion-collapse collapse show"
          aria-labelledby="exportSettings"
          data-bs-parent="#settingsList"
        >
          <div class="accordion-body">
            <strong>Esporta tutte le tue classi in un file!</strong><br />
            Puo essere necessario esportare tutte le classi che hai creato se
            hai intenzione di accedere a questo sito cambiando pc oppure se vuoi
            semplicemente creare un backup ripristinabile! Cliccando sul bottone
            qui sotto scaricherai un file salvataggio.
            <br />
            <button
              class="btn btn-primary"
              aria-label="Scarica salvataggio"
              @click="exportDB()"
            >
              <font-awesome-icon icon="fa-solid fa-download" />
              Scarica salvataggio
            </button>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="importSave">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            Importa un salvataggio
          </button>
        </h2>
        <div
          id="collapseTwo"
          class="accordion-collapse collapse"
          aria-labelledby="importSave"
          data-bs-parent="#settingsList"
        >
          <div class="accordion-body">
            <strong>Importa tutte le tue classi da un file!</strong><br />
            Se hai esportato precedentemente tutte le tue classi e vuoi
            ripristinarle, allora clicca sul bottone qui sotto e carica il file
            di salvataggio scaricato.
            <br />
            <button
              class="btn btn-primary"
              aria-label="Importa salvataggio"
              @click="openFileImport()"
            >
              <font-awesome-icon icon="fa-solid fa-upload" />
              Importa salvataggio
            </button>
            <input
              type="file"
              id="importFile"
              @change="importDB()"
              style="display: none"
            />
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="clearDB">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseThree"
            aria-expanded="false"
            aria-controls="collapseThree"
          >
            Eliminazione Totale
          </button>
        </h2>
        <div
          id="collapseThree"
          class="accordion-collapse collapse"
          aria-labelledby="clearDB"
          data-bs-parent="#settingsList"
        >
          <div class="accordion-body">
            <strong
              >Hai bisogno di pulire le tue classi per ripartire da 0?</strong
            >
            <br />
            Attenzione: Questa opzione e' irreversibile! Se non hai un backup e
            intendi ripristinare le tue classi piu tardi allora provvedi subito
            a creare un backup. Cliccando sul bottone qua sotto eliminerai tutte
            le tue classi.
            <br />
            <button
              class="btn btn-primary"
              aria-label="Elimina classi"
              @click="clearDB()"
            >
              <font-awesome-icon icon="fa-solid fa-trash" />
              Elimina classi
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Messaggi -->
    <div
      class="modal fade"
      id="messagesSettingsModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="messagesSettingsModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="messagesSettingsModalLabel">
              Informazioni operazione
            </h1>
          </div>
          <div class="modal-body">
            {{ modalText }}
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              @click="closeModalSettings()"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import localforage from "localforage";
import { saveAs } from "file-saver";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Settings",
  setup() {
    return {
      modalText: ref(""),
    };
  },
  mounted() {},
  methods: {
    exportDB: function () {
      const vm = this;

      localforage.getItem("classes").then((value) => {
        let JSONClasses = null;
        if (value != null) {
          JSONClasses = JSON.stringify(value);
        } else {
          JSONClasses = JSON.stringify([]);
        }
        // console.log("value", value, JSONClasses);
        var blob = new Blob([JSONClasses], {
          type: "text/plain;charset=utf-8",
        });
        saveAs(blob, "salvataggioTeacherHub.json");
        vm.modalText = "Esportazione eseguita con successo!";
        $("#messagesSettingsModal").modal("show");
      });
    },
    importDB: function () {
      const vm = this;
      let files = $("#importFile")[0].files;
      console.log("Files", files);
      var file = files[0];
      var reader = new FileReader();
      reader.onload = async function (e) {
        // parse string to json
        const classes = JSON.parse(e.target.result);
        console.log(classes);
        await localforage.setItem("classes", classes);
        vm.modalText = "Caricamento eseguito con successo!";
        $("#messagesSettingsModal").modal("show");
      };
      reader.readAsText(file);
    },
    openFileImport: function () {
      $("#importFile").click();
    },
    clearDB: function () {
      localforage.clear();
      this.modalText = "Classi eliminate con successo!";
      $("#messagesSettingsModal").modal("show");
    },
    closeModalSettings: function () {
      $("#messagesSettingsModal").modal("hide");
    },
  },
});
</script>

<style scoped>
.container-fluid {
  padding: 25px;
  text-align: left;
}
</style>
