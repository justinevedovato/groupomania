<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div id="app">
    <nav class="bg-gray-800" v-if="user">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <!-- Mobile menu button-->
            <button
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <!-- Icon when menu is closed. -->
              <!--
            Heroicon name: menu

            Menu open: "hidden", Menu closed: "block"
          -->
              <svg
                class="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <!-- Icon when menu is open. -->
              <!--
            Heroicon name: x

            Menu open: "block", Menu closed: "hidden"
          -->
              <svg
                class="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div
            class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
          >
            <div class="flex-shrink-0 flex items-center">
              <img
                class="block lg:hidden h-8 w-auto"
                src="../public/icon-left-font-monochrome-white.svg"
                alt="logo de groupomania"
              />
              <img
                class="hidden lg:block h-8 w-auto"
                src="../public/icon-left-font-monochrome-white.svg"
                alt="logo de groupomania"
              />
            </div>
            <div class="hidden sm:block sm:ml-6">
              <div id="nav" class="flex ml-8 space-x-6">
                <router-link
                  to="/"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >Accueil</router-link
                >
                <router-link
                  to="/account"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >Mon compte</router-link
                >
                <a
                  href="#"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  @click.prevent="logout"
                  >Logout</a
                >
              </div>
            </div>
          </div>
          <p
            class="hidden md:block text-gray-300 px-3 py-2 rounded-md text-sm italic"
          >
            Bonjour <span class="font-medium">{{ user.firstName }}</span> !
          </p>
        </div>
      </div>

      <!--
    Mobile menu, toggle classes based on menu state.

    Menu open: "block", Menu closed: "hidden"
  -->
      <div class="hidden sm:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
          <router-link
            to="/"
            class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
            >Accueil</router-link
          >
          <router-link
            to="/account"
            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >Mon compte</router-link
          >
          <a
            href="#"
            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            @click.prevent="logout"
            >Logout</a
          >
        </div>
      </div>
    </nav>
    <router-view />
  </div>

  <!-- <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/login" v-if="!user">Login</router-link>
      <a href="#" @click.prevent="$store.commit('setUser')" v-else>Logout</a>
    </div>
    <router-view />
  </div> -->
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  methods: {
    logout() {
      this.$store.commit("setUser")
      this.$router.push("/login")
    },
  },
}
</script>

<style lang="scss">
body,
#app {
  @apply bg-gray-200 min-h-screen;
}
</style>
