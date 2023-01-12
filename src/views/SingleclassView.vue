<template lang="it">
  <div class="container-fluid text-center">
    <!-- row-cols-md-3 row-cols-1 -->
    <div class="row"> 
      <div class="col">
        <div class="container-list">
                <div class="list-group notTestedList">
                    <li class="list-group-item list-group-item-primary">Lista Studenti</li>
                    <li
                      class="list-group-item" 
                      v-for="(student, index) in studentsList" 
                      :key="index"
                    >
                    <span class="nomeStudente">
                      {{index}}) {{student}}
                    </span>
                        <span class="float-end">
                          <span class="icon-action" @click="editStudent(index)">
                            <font-awesome-icon icon="fa-solid fa-user-pen" />
                          </span>
                          <span>
                            <font-awesome-icon icon="fa-solid fa-trash" />
                          </span>
                        </span>
                    </li>
                </div>
            </div>
      </div>
      <div class="col-6">
        2
      </div>
      <div class="col">
        <div class="container-notTested" v-if="showNotTestedList">
                <div class="list-group notTestedList justify-content-end">
                    <button type="button" class="list-group-item list-group-item-action disabled" aria-disabled="true" 
                    style="background-color: #FDD231; text-align: center">
                        <strong>Studenti non interrogati</strong>
                    </button>
                    <button @click="showCalledMessage = true, addToTested()" type="button" class="list-group-item list-group-item-action" v-for="student in 20" :key="student">
                        {{student}}
                    </button>
                </div>
                <div class="testedMessage" v-if = "showCalledMessage">
                    <div class="card text-bg-info mb-3" style="max-width: 18rem;">
                        <div class="card-body">
                            Studente chiamato!
                        </div>
                    </div>
                </div>
            </div>
      </div>
    </div>


    <!-- Modal -->
    <div
      class="modal fade"
      id="editStudentModal"
      tabindex="-1"
      aria-hidden="true"
      aria-labelledby="editStudentModalLabel"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="editStudentModalLabel">
              Modifica {{nomeStudente}}
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body text-left">
            <div class="mb-3">
              <label for="className" class="form-label">Nuovo Nome</label>
              <input
                type="text"
                class="form-control"
                id="className"
                placeholder="Cognome Nome"
                v-model="studentNameInput"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-info" data-bs-dismiss="modal">
              Annulla
            </button>
            <button type="button" class="btn btn-primary" @click="saveStudent(indexStudente)">
              Salva
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import localforage from "localforage";

export default {
  data() {
    return {
      studentsList: [
        "Romeo Biancalani",
        "Diocane 1",
        "Diocane 2",
        "Diocane 3",
        "Diocane 4",
        "Diocane 5",
        "Diocane 6",
      ],
      nomeStudente: "",
      indexStudente: 0,
      studentNameInput: "",
    };
  },
  mounted() {
    //get lista studenti
    localforage.getItem("students").then((studentsList) => {
      this.studentsList = students;
    });

    //get numero studenti
    localforage.getItem("questionedNumber").then((alreadyTested) => {
      this.alreadyTested = questionedNumber;
    });

    localforage.getItem("questionedStudents").then((alreadyTested) => {
      this.alreadyTested = questionedStudents;
    });
  },
  methods: {
    getRandomStudent() {
      // genera studente da interrogare
      let index = -1; // indice studente da chiamare
      this.showRandomCard = true;
      this.showRandomNumber = true;
      this.showNotTestedList = false;
      if (alreadyTested.length != studentsList.length) {
        // se non sono stati interrogati tutti
        while (alreadyTested.includes(index)) {
          // ripete se trova uno studente che era gia' stato interrogato
          index = Math.floor(Math.random() * studentsList.length); // random index
        }
      } else {
        alert("Tutti gli studenti di questa classe sono stati interrogati!"); //TODO: sistemare messaggio
      }
      // estrai studente
      if (index != -1) {
        this.randomNumber = index;
        let student = studentsList[index];
        console.log(student); //TODO: visualizzare nome studente
      }
      return randomNumber;
    },

    editStudent(index) {
      this.nomeStudente = this.studentsList[index];
      this.indexStudente = index;
      this.studentNameInput = "";
      $("#editStudentModal").modal("show");
    },

    saveStudent(index) {
      //TODO: Salvataggio nel db
      this.studentsList[index] = this.studentNameInput;
      $("#editStudentModal").modal("hide");
    },
  },
};
</script>

<style lang="scss" scoped>
.row {
  margin-top: 20px;
}
// .container {
//   padding: 25px;
// }
.d-flex {
  align-items: center; // Centra in altezza
}

.container-list {
  width: 100%;
  .list-group-item {
    text-align: left;

    .nomeStudente {
      height: 100%;
      width: auto;
    }

    .icon-action {
      margin-right: 7px;
    }
  }
  .list-group-item-primary {
    text-align: center;
  }
}

.card-header {
  text-align: center;
  font-size: 25px;
}

.list-group-flush {
  //setta lo spazio tra le righe della card
  line-height: 2;
}

.container-randomnumber {
  //contiene card num random

  padding-top: 50px;
}

.container-testchoicebuttons {
  //contiene opzioni se interrogare, non interrogare o uscire
  text-align: center;
  padding-left: 100px;
}

.container-callbuttons {
  //contiene opzioni se chiamare random o no
  align-items: center;
  display: flex;
}

.container-notTested {
  //contiene lista studenti non ancora interrogati
  font-size: 20px;
  text-align: left;
  padding-top: 25px;
  display: flex;
  align-items: center;
}

.testedMessage {
  padding-left: 100px;
}
</style>
