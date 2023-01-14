<template>
    <div class="container-fluid">
        <h1>
            <strong>Aiuto</strong>
        </h1>
        <div id="helpdiv">
            <div class="helpbox">
                <h3>Come funziona?</h3>
                <p>Male</p>
            </div>
            <div class="helpbox">
                <h3>È sicuro?</h3>
                <p>HAHAHAHA</p>
            </div>
            <div class="helpbox">
                <h3>Come contribuire?</h3>
                <p>Con gli schiaffi</p>
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
    .helpbox{
        display: inline-block;
        border-style: groove;
        padding:5px;
        margin:25px;
        border-radius: 20px;
    }
</style>