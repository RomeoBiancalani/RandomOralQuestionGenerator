<template>
  <div class="container row">
    <div
      class="card col-sm-4 m-1"
      v-for="(item, index) in classes"
      :key="index"
    >
      <div class="card-body">
        <h5 class="card-title">
          <div
            class="progress"
            role="progressbar"
            style="height: 2px; margin:2px; margin-bottom:5px"
          >
            <div class="progress-bar bg-secondary" :style="'width: ' + item.questionedPercent + '%'"></div>
          </div>

          {{ item.name }}
        </h5>
        <p class="card-text">
          Studenti interrogati: {{ item.studentsQuestioned }}/{{
            item.studentsNumber
          }}
        </p>
        <div class="buttons">
          <div class="btn-group float-right">
            <a href="#" class="btn btn-primary"><font-awesome-icon icon="fa-solid fa-arrow-right-to-bracket" /> Entra</a>
            <a href="#" class="btn btn-info"><font-awesome-icon icon="fa-trash" /> Elimina</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Classes",
  setup() {
    let classes = [
      {
        name: "4H",
        studentsNumber: 25,
        studentsQuestioned: 16,
      },
      {
        name: "4Q",
        studentsNumber: 22,
        studentsQuestioned: 10,
      },
    ];

    classes.forEach((el) => {
        el.questionedPercent = (el.studentsQuestioned/el.studentsNumber) * 100;
    });

    return {
        classes
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 20px;
  padding-bottom: 20px;
}

.buttons {
  width: 100%;
}
.btn-group {
  float: right;
}
.btn {
  width: 110px;
}
</style>
