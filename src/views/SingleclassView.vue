<template lang="it">
  <div class="container-fluid text-center">
    <!-- row-cols-md-3 row-cols-1 -->
    <div class="row"> 
      <div class="col">
        <div class="container-list">
            <div class="list-group">
                <li class="list-group-item list-group-item-primary">Lista Studenti</li>
                <li
                  class="list-group-item" 
                  v-for="(student, index) in studentsList" 
                  :key="index"
                >
                <span class="nomeStudente">
                  {{index+1}}) {{student}}
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
        <div class="container-callbuttons">
            <div class="d-grid gap-3 col-30 ">
                <button @click="getRandomStudent()" class="btn btn-primary btn-lg" type="button" >Chiama uno studente random</button>
                <button @click="selectStudent()" class="btn btn-info btn-lg" type="button">Seleziona uno studente da chiamare</button>
            </div>
        </div>
        <div class="container-callbuttons" v-if = "showCalledMessage">
          <div class="alert alert-success d-flex "  role="alert" style="margin-top: 200px; width: 25rem">
             
            <span><font-awesome-icon icon="fa-solid fa-circle-check" /></span>  
            <div class="mx-auto" style="font-size:20px">Studente chiamato!</div>   
          </div>
        </div>
        

        
                
        <div class="d-flex" v-if = "showRandomCard" >
            <div class="container-randomnumber justify-content-end">
                <div class="card text-bg-light border-primary mb-3" style="width: 25rem;height: 20rem;">
                    <div class="card-body">
                        <br>
                        <!-- Display titolo -->
                        <h3 class="card-title text-primary"><u><strong>Studente estratto:</strong></u></h3>
                        <br>
                        
                        <!-- Display num random -->
                        <div class="card border-primary mb-3 mx-auto" style="width: 10rem; height: 10rem;">
                            <div class="card-body d-flex justify-content-center">
                                <br>
                                <div class="card-text text-center" v-if = "showRandomNumber" style="font-size: 36px;">
                                  {{ randomNumber + 1}}
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div class="alert alert-primary" role="alert" style="margin-top: 50px">
                  <h4><u>Nome studente:</u></h4><br><h5>{{ calledStudent }}</h5>
                </div>
              
            </div>
           
            <div class="container-testchoicebuttons">
                <br><br>
                <div class="d-grid gap-3 col-20">
                    <button @click="this.showCalledMessageRandom = true; addToTested()" class="btn btn-success btn-lg" type="button">Interroga oggi</button>
                    <button @click="this.showRandomNumber = false; getRandomStudent()" class="btn btn-info btn-lg" type="button">Non chiamare per oggi</button> <!-- clear card random number -->
                    <button @click="this.showRandomCard = false; this.showCalledMessageRandom = false" class="btn btn-danger btn-lg" type="button">Esci</button>
                </div>
            </div>
        </div>  
       
       
               
      </div>
      <div class="col">
        <div class="container-testchoicebuttons">
          <br><br>
          <div class="alert alert-success d-flex"   v-if = "showCalledMessageRandom" role="alert"> 
            <span><font-awesome-icon icon="fa-solid fa-circle-check" /></span>  
            <div class="mx-auto" style="font-size:20px">Studente chiamato!</div>   
          </div>
        </div>
    
        <div class="container-list">
          <div class="list-group notTestedList" v-if="showNotTestedList">
            <div class="list-group-item list-group-item-info justidy-content-end">Lista studenti non interrogati</div>
            <button @click="showCalledMessage = true, addToTested()" type="button" class="list-group-item list-group-item-action" v-for="index in alreadyTested" :key="index">
              <span class="nomeStudente">
                {{ index+1 }}) {{ studentsList[index] }}
              </span>
            </button>
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
      randomNumber: 0,
      studentsList: ["stud 1", "stud 2","stud 3"],
      studentsNumber: 0,
      alreadyTested: [],
      showRandomCard: false, //visualizza card num random
      showRandomNumber: true, //visualizza num random
      showNotTestedList: false, //visualizza lista studenti non interrogati
      showCalledMessage: false, //visualizza il messaggio di chiamata
      showCalledMessageRandom: false, //viene visualizzato quando viene interrogato lo studente random
      showEverybodyTestedAlert: false,
      nomeStudente: "",
      indexStudente: 0,
      studentNameInput: "",
      calledStudent: "", //visualizza nome studente chiamato
      
    };
  },
  //TODO: correggere il ricavo dati dal db
  mounted() { //nota: ho commentato il codice perche' non c'e' la lista degli studenti gia' stati interrogati nel db
    //get lista studenti
    localforage.getItem("classes").then((value) => {
      // const classes = localforage.getItem("classes");
      // const url = this.$route.path;
      // const className = url.split("/").pop(); //ricavo il nome della classe corrente dall'url (da correggere)
      // this.studentsList = value.find(c => c.name === className);
    });
  

    // localforage.getItem("questionedStudents").then((alreadyTested) => {
    //   this.alreadyTested = questionedStudents;
    // });
  },
  methods: {
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


    getRandomStudent() {
      // genera studente da interrogare
      let index = -1; // indice studente da chiamare
      this.showRandomCard = true;
      this.showRandomNumber = true;
      this.showNotTestedList = false;
      this.showCalledMessage = false;
      this.showCalledMessageRandom = false;
      
    
      if (this.alreadyTested.length != this.studentsList.length) {
        // se non sono stati interrogati tutti
        do {
          index = Math.floor(Math.random() * (this.studentsList.length-1)); // random index
        } while(this.alreadyTested.includes(index)); // ripete se trova uno studente che era gia' stato interrogato
      } else {
        alert("Tutti gli studenti di questa classe sono stati interrogati!"); //TODO: sistema alert
        this.showEverybodyTestedAlert = true;
        
      }
      // estrai studente
      if (index != -1) {
        this.calledStudent = this.studentsList[index]; //setta il nome dello studente chiamato per visualizzarlo
      }
      this.randomNumber = index;
    },
    

    //TODO: da sistemare, ancora non ho la lista degli studenti gia' interrogati nel db
    addToTested() { 
      //aggiunge uno studente alla lista di chi e' gia' stato interrogato
      alreadyTested.push(index); //update
      localforage.setItem("questionedStudents", this.alreadyTested);
      //show messaggio
      
    },
    //funzioni per selezionare uno studente specifico da interrogare
    selectStudent() {
      //se si sceglie di non chiamare a caso
      this.showRandomCard = false; //non far vedere la card per generare random
      this.showNotTestedList = true; //display lista persone da interrogare
      this.showCalledMessageRandom = false;
      
    },

  },
};
</script>

<style lang="scss" scoped>
.row {
  margin-top: 20px;
}

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
  margin-left:200px;
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
  margin-left:200px;
}



.testedMessage {
  padding-left: 100px;
}
</style>
