<template>
  <main>
    <div class="px-4 py-5 my-5 text-center home">
      <img class="d-block mx-auto mb-4" alt="Vue logo" src="../assets/logo.png">
      <h1 class="display-5 fw-bold">Local Vue App</h1>
      <div class="col-lg-6 mx-auto">
        <p class="lead mb-4">Application to keep track of a diary, all worked with OptionsAPI and Vuex</p>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <button @click="goToDaybook" type="button" class="btn btn-outline-primary btn-lg px-4 gap-3">Daybook Module</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'HomeView',
  components: {},
  methods: {
    goToDaybook() {
      this.$router.push({name: 'no-entry'})
    }
  }
}
</script>

<style scoped>
</style>
