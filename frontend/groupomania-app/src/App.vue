<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/login" v-if="!user">Login</router-link>
      <a href="#" @click.prevent="$store.commit('setUser')" v-else>Logout</a>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user
    },
  },
}
</script>

<style lang="scss"></style>
