<template lang="it">
  <div class="container-fluid text-center">
    <div class="row"> 
      <div class="col">
        <div id="allStudentsList" class="container-list" aria-label="Elenco degli studenti della classe"> <!-- tag accessibilita': aria-label -->
            <div class="list-group">
                <li class="list-group-item list-group-item-primary">Lista studenti</li>
                <li
                  class="list-group-item" 
                  v-for="(student, index) in studentsList" 
                  :key="index"
                  tabindex="0"
                >
                <span class="nomeStudente">
                  {{index+1}}) {{student}}
                </span>
                    <span class="float-end">
                      <span class="icon-action" @click="editStudent(index)">
                        <font-awesome-icon icon="fa-solid fa-user-pen" aria-label="Modifica studente"/> <!-- tag accessibilita': aria-label -->
                      </span>
                      <span class="icon-action" @click="deleteStudent(index)">
                        <font-awesome-icon icon="fa-solid fa-trash" aria-label="Cancella studente dall'elenco"/> <!-- tag accessibilita': aria-label -->
                      </span>
                    </span>
                </li>
            </div>
        </div>
      </div>

      <div class="col-6">
        <div id="callModalityChoice" class="container-callbuttons">
            <div class="d-grid gap-3 col-30">
                <button 
                  @click="getRandomStudent()" 
                  class="btn btn-primary btn-lg" 
                  type="button" 
                  aria-label="Estrai uno studente random" 
                >
                  Estrai uno studente random
                </button> <!-- tag accessibilita': aria-label -->

                <button 
                  @click="selectStudent()" 
                  class="btn btn-info btn-lg" 
                  type="button" 
                  aria-label="Seleziona uno studente da interrogare"
                >
                  Scelta manuale
                </button> <!-- tag accessibilita': aria-label -->
            </div>
        </div>

        <div id="studentCalledAlert" class="container-callbuttons" v-if = "showCalledMessage" aria-live="polite"> <!-- tag accessibilita': aria-live -->
          <div class="d-grid gap-6 col-30">
            <div><br><br><br><br></div>
            <div class="alert alert-success alert-dismissible d-flex" role="alert" > <!-- tag accessibilita': role -->
              <span class="float-end"><font-awesome-icon icon="fa-solid fa-circle-check" /></span>
              <div style="font-size:20px; text-align:right; margin-left: 10px">
                Studente chiamato!
                <button
                  type="button"
                  class="btn-close"
                  @click="closeAlert()"
                  aria-label="Chiudi"
                ></button> 
              </div>  
            </div>
          </div>
        </div>
                
        <div id="randomCard" class="d-flex randomNumber" v-if = "showRandomCard" >
            <div id="randomNumber" class="container-randomnumber justify-content-end">
                <div class="card text-bg-light border-primary mb-3" style="width: 25rem;height: 20rem;">
                    <div class="card-body">
                        <br>
                        <!-- random card title -->
                        <h3 class="card-title text-primary"><u><strong>Studente estratto:</strong></u></h3>
                        <br>
                        
                        <!-- random number card -->
                        <div class="card border-primary mb-3 mx-auto" style="width: 10rem; height: 10rem;" aria-label="Mostra numero random"> <!-- tag accessibilita': aria-label -->
                            <div class="card-body d-flex justify-content-center">
                                <br>
                                <div class="card-text text-center" v-if = "showRandomNumber" style="font-size: 36px;">
                                  {{ randomNumber }}
                                </div>
                            </div>
                        </div>   
                    </div>
                </div>

                <div class="alert alert-primary" role="alert" style="margin-top: 50px" aria-label="Mostra nome studente estratto"> <!-- tag accessibilita': role, aria-label -->
                  <h4><u>Nome studente:</u></h4><br><h5>{{ calledStudent }}</h5>
                </div> 
            </div>
          
        </div>     
        <div id="testchoice" class="container-testchoicebuttons" v-if = "showRandomCard" aria-label="Scelta se interrogare lo studente estratto"> <!-- tag accessibilita': aria-label -->
                <br><br>
                <!-- <div class="d-grid gap-3 col-20">
                    <button 
                      @click="this.showCalledMessageRandom = true, addToTested(this.randomNumber)" 
                      class="btn btn-success btn-md" 
                      type="button" 
                      aria-label="interroga oggi lo studente estratto"
                    >
                      Interroga oggi
                    </button>  tag accessibilita': aria-label 

                    <button 
                      @click="this.showRandomNumber = false; getRandomStudent()" 
                      class="btn btn-info btn-md" 
                      type="button" 
                      aria-label="non chiamare lo studente estratto"
                    >
                      Non chiamare per oggi
                    </button> tag accessibilita': aria-label 

                    <button 
                      @click="this.showRandomCard = false; 
                      this.showCalledMessageRandom = false" 
                      class="btn btn-danger btn-md" 
                      type="button" 
                      aria-label="esci dall'estrazione random"
                    >
                      Esci
                    </button> tag accessibilita': aria-label 
                  </div> -->
              <div class="btn-group questionedBtns" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-success btn-md"  
                  aria-label="Interroga oggi lo studente estratto"
                  @click="this.showCalledMessageRandom = true, addToTested(this.randomNumber - 1)" 
                >
                Interroga</button>
                <button type="button" class="btn btn-info btn-md" 
                  aria-label="Non chiamare lo studente estratto"
                  @click="this.showRandomNumber = false; getRandomStudent()" 
                >Non chiamare</button>
                <button type="button" class="btn btn-danger btn-md"
                  @click="this.showRandomCard = false; this.showCalledMessageRandom = false" 
                  aria-label="Esci dall'estrazione random"
                >Esci</button>
              </div>
            </div>   
            
      </div>


      <div class="col">
        <div id="studentCalledAlert" class="container-testchoicebuttons d-flex" v-if = "showCalledMessageRandom" aria-live="polite"> <!-- tag accessibilita': aria-live -->
          <div class="alert alert-success alert-dismissible d-flex" role="alert">  <!-- tag accessibilita': role -->
            <span classe="float-end"><font-awesome-icon icon="fa-solid fa-circle-check" /></span>
            <div style="font-size:20px; text-align:right; margin-left: 10px">
              Studente chiamato!
              <button
                type="button"
                class="btn-close"
                @click="closeAlert()"
                aria-label="Close"
              ></button> <!-- tag accessibilita': aria-label -->
            </div>  
          </div>
        </div>

        <div id="notTestedStudents" class="container-list d-flex">
          <div class="list-group notTestedList" v-if="showNotTestedList" aria-label="Lista studenti che non interrogati"> <!-- tag accessibilita': aria-label -->
            <div class="list-group-item list-group-item-info">Lista studenti non interrogati</div>
            <button 
              @click="showCalledMessage = true, addToTested(index), selectStudent()" 
              type="button" 
              class="list-group-item list-group-item-action" 
              v-for="index in filteredNotTestedList" :key="index" 
              aria-label="Nome studente"
            >  <!-- tag accessibilita': aria-label -->
              <span class="nomeStudente" aria-label="Nome studente">
                {{ index + 1}}) {{ studentsList[index] }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <!-- Modal to edit a student -->
    <div
      class="modal fade"
      id="editStudentModal"
      tabindex="-1"
      aria-hidden="true"
      aria-labelledby="editStudentModalLabel"
      aria-live="assertive"
    > <!-- tag accessibilita': aria-hidden, aria-labelledby, aria-live -->
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="editStudentModalLabel">
              Modifica {{ nomeStudente }}
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button> <!-- tag accessibilita': aria-label -->
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
            <button type="button" class="btn btn-info" data-bs-dismiss="modal" aria-label="Annulla modifiche"> <!-- tag accessibilita': aria-label -->
              Annulla
            </button>
            <button type="button" class="btn btn-primary" @click="saveStudent(indexStudente)" aria-label="Salva modifiche"> <!-- tag accessibilita': aria-label -->
              Salva
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal to alert everyone has been tested -->
  <div
    class="modal fade"
    id="everyoneTestedModal"
    tabindex="-1"
    aria-hidden="true"
    aria-labelledby="everyoneTestedModalLabel"
    aria-live="assertive"
  > <!-- tag accessibilita': aria-hidden, aria-labelledby, aria-live -->
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <h6 class="modal-header text-center"><strong>Tutti gli studenti di questa classe sono gia' stati interrogati!</strong></h6>
        <div class="modal-body text-center">
          Vuoi <strong>cancellare</strong> la lista degli interrogati e riniziare le interrogazioni?
        </div>
        <div class="modal-footer">
          <button 
            type="button" 
            class="btn btn-success" 
            data-bs-dismiss="modal" 
            @click="clearAlreadyTested()" 
            aria-label="Cancella lista non interrogati"
          > <!-- tag accessibilita': aria-label -->
            Si
          </button>

          <button 
            type="button" 
            class="btn btn-danger" 
            data-bs-dismiss="modal" 
            @click="this.showRandomCard = false" 
            aria-label="Non cancellare lista non interrogati"
          > <!-- tag accessibilita': aria-label -->
            No
          </button>
        </div>
      </div>
    </div>
  </div>


   <!-- Modal to delete a student from the students list -->
   <div
    class="modal fade"
    id="deleteStudentModal"
    tabindex="-1"
    aria-hidden="true"
    aria-labelledby="deleteStudentModalLabel"
    aria-live="assertive"
  > <!-- tag accessibilita': aria-hidden, aria-labelledby, aria-live -->
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <h5 class="modal-header text-center"><strong>Attenzione!</strong></h5>
        <div class="modal-body text-center">
          Vuoi <strong>eliminare</strong> {{ nomeStudente }} dall'elenco?
        </div>
        <div class="modal-footer">
          <button 
            type="button" 
            class="btn btn-info" 
            data-bs-dismiss="modal" 
            @click="removeFromStudentsList(indexStudente)" 
            aria-label="Cancella studente dall'elenco"
          > <!-- tag accessibilita': aria-label -->
            Si
          </button>

          <button 
            type="button" 
            class="btn btn-primary" 
            data-bs-dismiss="modal"  
            aria-label="Non cancellare studente dall'elenco"
          > <!-- tag accessibilita': aria-label -->
            No
          </button>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  getClassByName,
  saveStudentByClass,
  addToQuestioned,
  clearQuestioned,
} from "@/modules/database.js";
import localforage from "localforage";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    // console.log("Route", JSON.stringify(route))
    if (route.params.className == undefined) {
      router.push("/");
    }
    let listaStudenti = ref([]);
    let studentiInterrogati = ref([]);
    const nomeClasse = route.params.className;
    getClassByName(nomeClasse).then((classe) => {
      if (classe !== {}) {
        listaStudenti.value = classe.students;
        studentiInterrogati.value = classe.questionedStudents;
      }
    });

    return {
      nomeClasse,
      randomNumber: ref(0),
      studentsList: listaStudenti, //lista di tutti gli studenti
      alreadyTested: studentiInterrogati, //lista studenti gia' interrogati

      //show flags
      showRandomCard: ref(false), //visualizza card num random
      showRandomNumber: ref(true), //visualizza num random
      showNotTestedList: ref(false), //visualizza lista studenti non interrogati
      showCalledMessage: ref(false), //visualizza il messaggio di chiamata
      showCalledMessageRandom: ref(false), //viene visualizzato quando viene interrogato lo studente random

      nomeStudente: ref(""),
      indexStudente: ref(0),
      studentNameInput: ref(""),
      calledStudent: ref(""), //visualizza nome studente chiamato
    };
  },

  computed: {
    //set lista degli studenti ancora non interrogati
    filteredNotTestedList() {
      let notTestedIndexes = [];
      this.studentsList.map((student, index) => {
        if (!this.alreadyTested.includes(index)) {
          notTestedIndexes.push(index);
        }
      });
      return notTestedIndexes;
    },
  },
  mounted() {
    //nota: ho commentato il codice perche' non c'e' la lista degli studenti gia' stati interrogati nel db
    //get lista studenti
    // localforage.getItem("classes").then((value) => {
    //   // const classes = localforage.getItem("classes");
    //   // const url = this.$route.path;
    //   // const className = url.split("/").pop(); //ricavo il nome della classe corrente dall'url (da correggere)
    //   // this.studentsList = value.find(c => c.name === className);
    // });
    // localforage.getItem("questionedStudents").then((alreadyTested) => {
    //   this.alreadyTested = questionedStudents;
    // });
  },

  methods: {
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    editStudent(index) {
      this.nomeStudente = this.studentsList[index];
      this.indexStudente = index;
      this.studentNameInput = "";
      $("#editStudentModal").modal("show");
    },

    deleteStudent(index) {
      this.nomeStudente = this.studentsList[index];
      this.indexStudente = index;
      $("#deleteStudentModal").modal("show");
    },

    async saveStudent(index) {
      //TODO: Salvataggio nel db
      console.log(
        "Edit studente",
        this.nomeClasse,
        index,
        this.studentNameInput
      );
      await saveStudentByClass(this.nomeClasse, index, this.studentNameInput);
      this.studentsList[index] = this.studentNameInput;
      $("#editStudentModal").modal("hide");
    },

    removeFromStudentsList(index) {
      this.studentsList.splice(index, 1);
    },

    showEveryoneTested() {
      $("#everyoneTestedModal").modal("show");
    },

    closeAlert() {
      this.showCalledMessage = false;
      this.showCalledMessageRandom = false;
    },

    // genera studente da interrogare
    getRandomStudent() {
      console.log("Estraggo studente random");
      let index = -1; // indice studente da chiamare
      this.showRandomCard = true; //show random card
      this.showRandomNumber = true; //show random number
      this.showNotTestedList = false; //hide lista non interrogati
      this.showCalledMessage = false; //hide messaggio studente interrogato
      this.showCalledMessageRandom = false; //hide messaggio studente interrogato

      if (this.alreadyTested.length != this.studentsList.length) {
        // se non sono stati interrogati tutti
        do {
          index = this.getRandomInt(1, this.studentsList.length);
          console.log("Numero estratto: ", index);
        } while (this.alreadyTested.includes(index - 1));
      } else {
        this.nomeStudente = "";
        this.showEveryoneTested(); //show modal
      }

      // estrai studente
      if (index != -1) {
        this.calledStudent = this.studentsList[index - 1]; //setta il nome dello studente chiamato per visualizzarlo
      } else {
        this.nomeStudente = ""; //clear nome studente
      }
      this.randomNumber = index; //update random number
    },

    //TODO: da sistemare, ancora non ho la lista degli studenti gia' interrogati nel db
    //aggiunge uno studente alla lista di chi e' gia' stato interrogato
    addToTested(index) {
      console.log("Aggiungo agli interrogati", index);
      this.alreadyTested.push(index); //update
      addToQuestioned(this.nomeClasse, index);
      //localforage.setItem("questionedStudents", this.alreadyTested);
    },

    // selezionare uno studente specifico da interrogare
    selectStudent() {
      //se si sceglie di non chiamare a caso
      this.showRandomCard = false; //hide card per generare random
      this.showCalledMessageRandom = false;
      this.showNotTestedList = true; //show lista persone da interrogare
      if (this.alreadyTested.length == this.studentsList.length)
        this.showEveryoneTested();
    },

    // resetta la lista degli studenti gia' interrogati
    clearAlreadyTested() {
      this.showRandomCard = false;
      this.alreadyTested = [];
      clearQuestioned(this.nomeClasse);
    },
  },
};
</script>

<style lang="scss" scoped>
.row {
  margin-top: 20px;
}

// Centra in altezza
.d-flex {
  align-items: center;
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

//container card num random
// .container-randomnumber {
//   padding-top: 50px;
//   margin-left:200px;
// }
.randomNumber {
  justify-content: center;
  margin-top: 50px;
}
//container opzioni se interrogare, non interrogare o uscire
.container-testchoicebuttons {
  text-align: center;
}

//container opzioni se chiamare random o no
.container-callbuttons {
  align-items: center;
  display: flex;
  // margin-left:200px;
  justify-content: center;
}

.questionedBtns {
  width: 100%;
}
.questionedBtns > .btn {
  width: 33.3%;
}
</style>
