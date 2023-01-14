<template>
  <div class="container-fluid row">
    <!-- Modal Eliminazione Classe -->
    <!-- TODO: Fixare il modal che non si vede -->
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="deleteModalLabel">Eliminazione classe</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Vuoi eliminare la classe {{ classNameDeleting }}?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annulla</button>
            <button type="button" class="btn btn-primary" @click="deleteClassConfirmed(classNameDeleting)">Elimina</button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="col-sm-4"
      v-for="(item, index) in classes"
      :key="index"
    >
    <div class="card m-1">
      <div class="card-body">
        <h5 class="card-title">
          <div
            class="progress"
            role="progressbar"
            style="height: 2px; margin: 2px; margin-bottom: 5px"
          >
            <div
              class="progress-bar bg-secondary"
              :style="'width: ' + item.questionedPercent + '%'"
            ></div>
          </div>

          {{ item.name }}
        </h5>
        <p class="card-text">
          Studenti interrogati: {{ item.studentsQuestioned }}/{{
            item.studentsNumber
          }}
        </p>
        <div class="buttons">
          <div class="btn-group float-right">
            <router-link class="btn btn-primary" :to="'/classi/' + item.name"
              ><font-awesome-icon icon="fa-solid fa-arrow-right-to-bracket" />
              Entra</router-link
            >
            <a class="btn btn-info" @click="deleteClass(item.name)"
              ><font-awesome-icon icon="fa-trash"/> Elimina</a
            >
          </div>
        </div>
      </div>

    </div>
    </div>
  </div>
</template>

<script>
import localforage from "localforage";
import {ref} from "vue";

export default {
  props: ['classes'],
  name: "Classes",
  async setup() {
    // let classes = [
    //   {
    //     name: "4H",
    //     studentsNumber: 25,
    //     studentsQuestioned: 16,
    //   },
    //   {
    //     name: "4Q",
    //     studentsNumber: 22,
    //     studentsQuestioned: 10,
    //   },
    // ];
    // let classes = [];
    // try {
    //   const value = await localforage.getItem("classes");
    //   // This code runs once the value has been loaded
    //   // from the offline store.
    //   console.log(value);
    //   classes = value;
    // } catch (err) {
    //   // This code runs if there were any errors.
    //   console.log(err);
    // }

    // classes.forEach((el) => {
    //   el.questionedPercent = (el.studentsQuestioned / el.studentsNumber) * 100;
    // });

    return {
      // classes,
      classNameDeleting: ref("")
    };
  },
  mounted() {
    // localforage.getItem("classes", function (err, value) {
    //   if (value == undefined) {
    //     vm.classesList = [];
    //   } else {
    //     vm.classesList = value;
    //   }
    // });
  },
  methods: {
    deleteClass: function (className) {
      this.classNameDeleting = className;
      $("#deleteModal").fadeIn(1000);
    },
    deleteClassConfirmed: async function (className) {
      
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 20px;
  padding-bottom: 20px;
}

.buttons {
  width: 100%;
}
.btn-group {
  float: right;
}
.btn {
  width: 110px;
}
</style>
