<template>
    <div class="container-fluid">
        <h1>
            <strong>Aiuto</strong>
        </h1>
        <div id="helpdiv" style="display:flex">
            <div class="helpbox">
                <h3>Come funziona?</h3>
                <p>Teacher HUB è un potente tool per istruttori ed insegnanti per gestire test ed esami. Può organizzare un gran numero di classi e operare con facilità aiutando a mantenere organizzati i test. Puoi aggiungere nuove classi dalla schermata home.</p>
            </div>
            <div class="helpbox">
                <h3>È sicuro?</h3>
                <p>Sia il web server che la web app sono stati testati secondo i più alti standard di verifica delle vulnerabilità. Il database è cifrato secondo la crittografia AES e tutti i tentativi di accesso vengono registrati su una base dati esterna. Puoi consultare i <router-link to="/security">report</router-link> dei nostri test.</p>
            </div>
            <div class="helpbox">
                <h3>Come contribuire?</h3>
                <p>Il progetto è open source, tutti possono contribuire suggerendo modifiche tramite la <a href="https://github.com/RomeoBiancalani/RandomOralQuestionGenerator/" target="_blank">pagina Github ufficiale</a>.</p>
            </div>
        </div>
    </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
    name: "Help", 
    setup() {
        return {

        }
    },
    mounted() {
        
    }
});
</script>

<style scoped>
    h1{
        padding:25px;
        text-align:left;
    }
    #helpdiv{
        display: flex;
    }
    .helpbox{
        flex: 1;
        display: inline-block;
        border-style: groove;
        padding:5px;
        margin:25px;
        border-radius: 20px;
        width: 300px;
        height: 300px;
    }
</style>