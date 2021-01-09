<template>
  <div id="app" class="flex flex-col">
    <nav class="bg-gray-800" v-if="user">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <!-- Bouton du menu pour version mobile -->
            <button
              @click="$store.commit('setMenu', !isMenuOpen)"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
            >
              <span class="sr-only">Ouvrir le menu</span>

              <!-- Icône du menu mobile -->
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
            </button>
          </div>

          <div
            class="text-gray-300 flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
          >
            <!-- Logo page d'accueil -->
            <router-link to="/" class="flex-shrink-0 flex items-center">
              <img
                class="block h-8 w-auto"
                src="../public/icon-left-font-monochrome-white.svg"
                alt="logo de groupomania"
              />
            </router-link>

            <!-- Menu de navigation version desktop -->
            <div class="hidden sm:block">
              <div id="nav" class="flex ml-6 space-x-6">
                <router-link
                  to="/"
                  class="hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >Accueil
                </router-link>
                <router-link
                  to="/new"
                  class="hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >Ecrire
                </router-link>
              </div>
            </div>
          </div>
          <!-- Menu dropdown utilisateur -->
          <div class="hidden sm:block ml-3 relative">
            <div>
              <button
                @click="$store.commit('setMenu', !isMenuOpen)"
                class="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              ></button>
            </div>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div
                v-show="isMenuOpen"
                class="dropdown-menu origin-top-right absolute right-0 mt-16 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
                id="user-menu"
                aria-haspopup="true"
              >
                <router-link
                  to="/account"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >Mon compte
                </router-link>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  @click.prevent="logout"
                  >Déconnexion
                </a>
              </div>
            </transition>

            <!-- Message de bienvenue + bouton du menu utilisateur -->
            <div
              class=" hidden sm:flex items-center gap-2 text-gray-300 px-3 py-2 rounded-md text-sm italic"
            >
              <span>
                Bonjour
                <span class="font-medium capitalize">{{ user.firstName }}</span>
                !
              </span>
              <img class="h-8 w-8" :src="imgUrl" alt="" />
              <a
                href="#"
                @click.prevent="$store.commit('setMenu', !isMenuOpen)"
              >
                <!-- Icône chevron up/down selon si le menu est ouvert ou fermé: -->
                <font-awesome-icon :icon="menuIcon" />

                <span class="sr-only">Ouvrir le menu utilisateur</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Menu version mobile -->
      <div
        class="sm:hidden text-gray-300 "
        :class="{ hidden: !isMenuOpen, block: isMenuOpen }"
      >
        <div class="px-2 pt-2 pb-3 space-y-1">
          <router-link
            to="/"
            class="hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >Accueil
          </router-link>
          <router-link
            to="/new"
            class="hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >Ecrire
          </router-link>
          <router-link
            to="/account"
            class="hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >Mon compte
          </router-link>
          <a
            href="#"
            class="hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            @click.prevent="logout"
            >Déconnexion
          </a>
        </div>
      </div>
      <!-- Fin du menu mobile -->
    </nav>
    <!-- Corps de la page -->
    <main class="flex-grow">
      <router-view />
    </main>
    <!-- Footer -->
    <footer class="h-10 bg-gray-800 flex">
      <div class="flex mx-auto text-sm text-gray-300">
        <a
          href="#"
          @click.prevent
          class="hover:bg-gray-700 hover:text-white px-3 py-1 my-auto rounded-md font-medium"
        >
          Mentions légales
        </a>
        <span class="my-auto">•</span>
        <a
          href="#"
          @click.prevent
          class="hover:bg-gray-700 hover:text-white px-3 py-1 my-auto rounded-md font-medium"
        >
          Nous contacter
        </a>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user // Récupère les données du store pour afficher le message de bienvenue
    },
    isMenuOpen() {
      return this.$store.state.isMenuOpen
    },
    imgUrl() {
      return `http://tinygraphs.com/labs/isogrids/hexa/${this.user.firstName}?theme=berrypie&numcolors=4&size=100&fmt=svg`
    },
    menuIcon() {
      return this.isMenuOpen ? "chevron-up" : "chevron-down"
    },
  },
  methods: {
    logout() {
      this.$store.commit("setUser") // Supprime l'utilisateur du store
      this.$router.push("/login")
    },
  },
}
</script>

<style lang="scss">
body,
#app {
  // Style appliqué à toute l'appli:
  @apply bg-gray-200 min-h-screen;
}
</style>
