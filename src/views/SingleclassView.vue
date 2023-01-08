<template lang="it">
    <div class="d-flex align-items-baseline" >
        <div class="container-list">
            <div class="card text-bg-light mb-3" style="width: 25rem;">
                <div class="card-header"><strong>Elenco studenti</strong></div> 
                <div class="card-body">
                    <p class="d-flex">
                        <ol class="list-group-flush text-bg-light mb-3">
                            <li v-for="student in studentsList" :key="student">
                                {{student}}
                            </li>   
                        </ol>
                    </p>
                </div>
            </div>
        </div>
        <div class="align-items-center" style="padding-left:200px;"> 
            <!--seleziona se chiamare random o specifico studente-->
            <div class="container-callbuttons">
                <div class="d-grid gap-3 col-30 ">
                    <button @click="getRandomStudent()" class="btn btn-primary btn-lg" type="button" >Chiama uno studente random</button>
                    <button @click="selectStudent()" class="btn btn-info btn-lg" type="button">Seleziona uno studente da chiamare</button>
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
                                    <div class="card-text text-center" v-if = "showRandomNumber" style="font-size: 36px;">{{ randomNumber }}</div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div class="container-testchoicebuttons">
                    <br><br>
                    <div class="d-grid gap-3 col-20">
                        <button @click="addToTested()" class="btn btn-success btn-lg" type="button">Interroga oggi</button>
                        <button @click="this.showRandomNumber = false" class="btn btn-info btn-lg" type="button">Non chiamare per oggi</button> <!-- clear card random number -->
                        <button @click="this.showRandomCard = false" class="btn btn-danger btn-lg" type="button">Esci</button>
                    </div>
                </div>
            </div>  
            <br>
            <div class="container-notTested" v-if = "showNotTestedList">
                <div class="list-group notTestedList justify-content-end">
                    <button type="button" class="list-group-item list-group-item-action disabled" aria-disabled="true" style="background-color: #FDD231; color: #0C163D; text-align: center">
                        <strong>Studenti non interrogati</strong>
                    </button>
                    <button @click="showCalledMessage = true, addToTested()" type="button" class="list-group-item list-group-item-action" v-for="student in studentsList" :key="student">
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
</template>

<script>
import { defineComponent } from "vue";
import localforage from "localforage";

export default {
  data() {
    return {
      randomNumber: null,
      studentsList: [],
      studentsNumber: 0,
      alreadyTested: [],
      showRandomCard: false,
      showRandomNumber: true,
      showNotTestedList: false,
      showCalledMessage: false,
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

    addToTested() {
      //aggiunge uno studente alla lista di chi e' gia' stato interrogato
      alreadyTested.push(index); //update
      localforage.setItem("questionedStudents", this.alreadyTested);
    },

    //funzioni per selezionare uno studente specifico da interrogare
    selectStudent() {
      //se si sceglie di non chiamare a caso
      this.showRandomCard = false; //non far vedere la card per generare random
      this.showNotTestedList = true; //display lista persone da interrogare
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 25px;
}
.d-flex {
  align-items: center; // Centra in altezza
}

.container-list {
  //contiene lista studenti
  font-size: 20px;
  text-align: left;
  padding: 25px;
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

.notTestedList {
  width: 25rem;
}

.testedMessage {
  padding-left: 100px;
}
</style>
