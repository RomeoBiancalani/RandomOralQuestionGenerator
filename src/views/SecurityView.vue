<template>
    <div class="container-fluid">
        <h1>
            <strong>Security</strong>
        </h1>
        <h3 id="title">Report di sicurezza: </h3>
        <div id="securitydiv" style=" display: flex; padding: auto;">
            <div id="reportbox">
                <h3>02/01/2023</h3>
                <a href="../assets/2023-02-01_SecurityReport.txt" download><button type="button" class="btn btn-link"><font-awesome-icon icon="fa-solid fa-circle-down fa-lg" aria-label="Download"/></button></a>
            </div>
            <div id="reportbox">
                <h3>10/01/2023</h3>
                <a href="../assets/2023-02-10_SecurityReport.txt" download><button type="button" class="btn btn-link"><font-awesome-icon icon="fa-solid fa-circle-down fa-lg" aria-label="Download"/></button></a>
            </div>
            <div id="reportbox">
                <h3>23/01/2023</h3>
                <a href="../assets/2023-02-20_SecurityReport.txt" download><button type="button" class="btn btn-link"><font-awesome-icon icon="fa-solid fa-circle-down fa-lg" aria-label="Download"/></button></a>
            </div>
            <div id="reportbox">
                <h3>20/01/2023</h3>
                <a href="../assets/2023-02-23_SecurityReport.txt" download><button type="button" class="btn btn-link"><font-awesome-icon icon="fa-solid fa-circle-down fa-lg" aria-label="Download"/></button></a>
            </div>
        </div>

    </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
    name: "Security", 
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
    #title{
        margin-bottom: 30px;
    }
    #reportbox{
        border-radius: 20px;
        border-style: solid;
        border-color: dimgray;
        padding: 20px;
        display: flex;
        margin: 5px;
    }
    #securitydiv{
        display: flex;
        padding: auto;
    }
    button{
        margin-left: 5px;
        color:black;
    }
</style>