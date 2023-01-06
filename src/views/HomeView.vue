<template>
  <div class="container-fluid">
    <h1>
      <strong>Benvenuto {{ name }}</strong>
    </h1>
    <br />

    <!-- Modal Inserisci Nome -->
    <!-- TODO: Fixare il vertically centered che non va con jquery -->
    <div
      class="modal modal-dialog-centered fade"
      id="insertNameModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="insertNameModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="insertNameModalLabel">
              Inserisci il tuo nome
            </h1>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="className" class="form-label">Nome</label>
              <input type="text" class="form-control" id="generalName" />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              @click="saveGlobalName"
            >
              Salva
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import localforage from "localforage";
// @ is an alias to /src
import Classes from "@/components/Classes.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    Classes,
  },
  setup() {
    return {
      name: ref(""),
    };
  },
  mounted() {
    const vm = this;
    localforage.getItem("globalName", function (err, value) {
      if (value == null) {
        $("#insertNameModal").modal("show");
      } else {
        vm.name = value;
      }
    });
  },
  methods: {
    saveGlobalName: function () {
      const vm = this;
      $("#insertNameModal").modal("hide");
      const name = $("#generalName").val();
      localforage
        .setItem("globalName", name)
        .then(function (value) {
          console.log(value);
          vm.name = name;
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },
});
</script>

<style lang="scss" scoped>
.container-fluid {
  padding: 25px;
  text-align: left;
}
</style>
