<template lang="it">

    <div class="d-flex align-items-baseline">
    
        <div class="container-list">
            <div class="card text-bg-light mb-3" style="width: 25rem;">
                <div class="card-header"><center>Elenco studenti</center></div> 
                
                    <div class="card-body">
                        <ol class="list-group list-group-flush text-bg-light mb-3">
                          
                                <li class="list-group-item text-bg-light">An item</li>
                                <li class="list-group-item text-bg-light">A second item</li>
                                <li class="list-group-item text-bg-light">A third item</li>
                                <li class="list-group-item text-bg-light">An item</li>
                                <li class="list-group-item text-bg-light">A second item</li>
                                <li class="list-group-item text-bg-light">A third item</li>
                                <li class="list-group-item text-bg-light">An item</li>
                                <li class="list-group-item text-bg-light">A second item</li>
                                <li class="list-group-item text-bg-light">A third item</li>
                                <li class="list-group-item text-bg-light">An item</li>
                                <li class="list-group-item text-bg-light">A second item</li>
                                <li class="list-group-item text-bg-light">A third item</li>
                                <li class="list-group-item text-bg-light">An item</li>
                                <li class="list-group-item text-bg-light">A second item</li>
                                <li class="list-group-item text-bg-light">A third item</li>
                                <li class="list-group-item text-bg-light">An item</li>
                                <li class="list-group-item text-bg-light">A second item</li>
                                <li class="list-group-item text-bg-light">A third item</li>
                                <li class="list-group-item text-bg-light">An item</li>
                                <li class="list-group-item text-bg-light">A second item</li>
                                <li class="list-group-item text-bg-light">A third item</li>
                                <li class="list-group-item text-bg-light">An item</li>
                                <li class="list-group-item text-bg-light">A second item</li>
                                <li class="list-group-item text-bg-light">A third item</li>
                                <li class="list-group-item text-bg-light">An item</li>
                                <li class="list-group-item text-bg-light">A second item</li>
                                <li class="list-group-item text-bg-light">A third item</li>
                        </ol>
                    </div>
            </div>
        </div>

        <div class="align-items-start"> 
            <!--seleziona se chiamare random o specifico studente-->
            <div class="container-callbuttons d-flex">
                <div class="d-grid gap-3 col-30 ">
                    <button @click="getRandomStudent()" class="btn btn-primary btn-lg" type="button" >Chiama uno studente random</button>
                    <button class="btn btn-secondary btn-lg" type="button">Seleziona uno studente da chiamare</button>
                </div>
            </div>
            
            <div class="d-flex" v-if = "showRandomCard" >
                <div class="container-randomnumber">
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
                                    <div class="card-text text-center" style="font-size: 36px;">{{ randomNumber }}</div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                
                <div class="container-testchoicebuttons ">
                    <br><br><br><br>
                    <div class="d-grid gap-2 col-20" >
                        <button @click="addToTested" class="btn btn-success btn-lg" type="button">Interroga oggi</button>
                        <button class="btn btn-warning btn-lg" type="button">Non chiamare per oggi</button>
                        <button class="btn btn-danger btn-lg" type="button">Esci</button>
                    </div>
                </div>
            </div>  
        </div>
    </div>

</template>

<script>    

import { defineComponent } from "vue";
import Classes from "@/components/Classes.vue";
import localforage from "localforage";

export default {
    data() {
        return {
            randomNumber: null,
            studentsList: [],
            studentsNumber: 0,
            alreadyTested: [],
            showRandomCard: false
        }
    },
    mounted() {
        //get lista studenti
        localforage.getItem('students').then((studentsList) => {
            this.studentsList = students
        })

        //get numero studenti
        localforage.getItem('questionedNumber').then((alreadyTested) => {
            this.alreadyTested = questionedNumber
        })

        localforage.getItem('questionedStudents').then((alreadyTested) => {
            this.alreadyTested = questionedStudents
        })
    },
    methods: {

        getRandomStudent() { // genera studente da interrogare
            this.showRandomCard = !this.showRandomCard; // display il contenitore del numero random
            let index = -1; // indice studente da chiamare

            if(alreadyTested.length != studentsList.length){ // se non sono stati interrogati tutti
                while(alreadyTested.includes(index)){ // ripete se trova uno studente che era gia' stato interrogato
                    index = Math.floor(Math.random() * studentsList.length); // random index
                }
            }

            // estrai studente
            if(index != -1){
                this.randomNumber = index;
                let student = studentsList[index];
                console.log(student);
            }
            
        },

        
        addToTested: function() { //aggiunge uno studente alla lista di chi e' gia' stato interrogato
            alreadyTested.push(index); //update
            localforage.setItem('questionedStudents', this.alreadyTested);
        }
    }
}
</script>


<style lang="scss" scoped>
    .d-flex {
       align-items: center; // Centra in altezza
    }
 
    .container-list { //contiene lista studenti
        text-align: left;
        padding-left: 50px;
        padding-top: 25px;
    }

    .container-randomnumber{ //contiene card num random
       text-align: center;
       padding-left: 200px;
       padding-top: 100px;
    }

    .container-testchoicebuttons { //contiene opzioni se interrogare, non interrogare o uscire
        text-align: right;
        padding-left: 100px;
        
    }

    .container-callbuttons { //contiene opzioni se chiamare random o no
        text-align: right;
        padding-left: 200px;
    }
</style>
