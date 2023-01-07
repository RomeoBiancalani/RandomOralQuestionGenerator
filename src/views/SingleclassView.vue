<template lang="it">

    <div class="d-flex">
        <div class="container-list">
            <div class="card text-bg-light mb-3" style="width: 20rem;">
                <div class="card-header"><center>Elenco studenti</center></div> 
                
                    <div class="card-body">
                        <ul class="list-group list-group-flush text-bg-light mb-3">
                            <li class="list-group-item text-bg-light">An item</li>
                            <li class="list-group-item text-bg-light">A second item</li>
                            <li class="list-group-item text-bg-light">A third item</li>
                            <li class="list-group-item text-bg-light">An item</li>
                            <li class="list-group-item text-bg-light">A second item</li>
                            <li class="list-group-item text-bg-light">A third item</li>
                            <li class="list-group-item text-bg-light">An item</li>
                            <li class="list-group-item text-bg-light">A second item</li>
                            <li class="list-group-item text-bg-light">A third item</li>
                        </ul>
                    </div>
                </div>
            </div>
        
            <div class="d-flex justify-content-center" >
                <div class="container-randomnumber">
                    <div class="card text-bg-light border-primary mb-3" v-if = "showRandomCard" style="width: 25rem;height: 20rem;">
                        <div class="card-body">
                            <br>
                            <!-- Display the title in the card body -->
                            <h3 class="card-title text-primary"><u><strong>Studente estratto:</strong></u></h3>
                            <br>
                            
                            <!-- Display the random number in the card body -->

                            <div class="card border-primary mb-3 mx-auto" style="width: 10rem; height: 10rem;">
                                <div class="card-body d-flex justify-content-center">
                                    <br>
                                    <div class="card-text text-center" style="font-size: 36px;">{{ randomNumber }}</div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
           

            <div class="container-testchoicebuttons d-flex justify-content-center" v-if = "showRandomCard">
                    <div class="d-grid gap-2 col-20" >
                        <button @click="addToTested" class="btn btn-success btn-lg" type="button">Interroga oggi</button>
                        <button class="btn btn-warning btn-lg" type="button">Non chiamare per oggi</button>
                        <button class="btn btn-danger btn-lg" type="button">Esci</button>
                    </div>
            </div>
   
        </div>
    
           

        <div class="container-callbuttons d-flex justify-content-center">
                <div class="d-grid gap-3 col-3 ">
                    <button @click="getRandomStudent()" class="btn btn-primary btn-lg" type="button" >Chiama uno studente random</button>
                    <button class="btn btn-secondary btn-lg" type="button">Seleziona uno studente da chiamare</button>
                </div>
        </div>

       

        

        

</template>

<script>
//TODO: display quadrato per generare random solo se viene cliccato il bottone "chiama random"
//TODO: altra lista per display solo chi e' stato interrogato (navigation)      

import { defineComponent } from "vue";
import Classes from "@/components/Classes.vue";
import localforage from "localforage";

export default {
    data() {
        return {
            randomNumber: null,
            studentsList: [],
            alreadyTested: [],
            showRandomCard: false
        }
    },
    mounted() {
        localforage.getItem('students').then((studentsList) => {
            this.studentsList = students
        })

        localforage.getItem('alreadyTested').then((alreadyTested) => {
            this.alreadyTested = alreadyTested
        })
    },
    methods: {

        getRandomStudent() { //genera studente da interrogare
            this.showRandomCard = !this.showRandomCard; //display il contenitore del numero random
            let index = -1; // indice studente da chiamare

            if(alreadyTested.length != studentsList.length){ //se non sono stati interrogati tutti
                while(alreadyTested.includes(index)){ //ripete se trova uno studente che era gia' stato interrogato
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
            localforage.setItem('alreadyTested', this.alreadyTested);
        }
    }
}
</script>


<style lang="scss" scoped>
    .d-flex {
       align-items: center; // Centra in altezza
    }
 
    .container-list {
        text-align: left;
        padding-left: 50px;
        padding-top: 25px;
    }

    .container-randomnumber{
       text-align: center;
       padding-left: 198px;
    }

    .container-testchoicebuttons {
        text-align: right;
        padding-left: 200px;
    }

    .container-callbuttons {
    
        
        text-align: right;
    }
</style>
