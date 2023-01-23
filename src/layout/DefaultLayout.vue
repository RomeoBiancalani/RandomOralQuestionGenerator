<template>
  <nav class="navbar navbar-expand-lg navbar-custom" role="navigation">
    <div class="container-fluid">
      <!-- {{$route.path}} -->
      <!--<router-link class="navbar-brand" to="/">{{ navbarBrand }}</router-link>-->
      <router-link class="navbar-brand" to="/"><img src="../assets/logo.png" alt="Bootstrap" width="45" height="45"></router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item" v-for="(page, index) in pages" :key="index">
            <router-link
              :class="$route.path == page.path ? 'nav-link active' : 'nav-link'"
              aria-current="page"
              :to="page.path"
              >{{ page.name }}</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {
      navbarBrand: "ROQG",
      pages: [
        {
          name: "Home",
          path: "/",
        },
        {
          name: "Aiuto",
          path: "/help",
        },
      ],
    };
  },
});
</script>

<style scoped lang="scss">
// Text Color Important Buttons rgb(49 92 253)
// Text Color Titles, Smaller Buttons rgb(12 22 61)

.navbar-custom {
  background-color: rgb(255, 255, 255);
  color: rgb(12, 22, 61);
}
</style>
