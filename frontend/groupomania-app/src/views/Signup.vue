<template>
  <div class="bg-gray-200">
    <div class="h-screen flex items-center align-middle mg m-auto max-w-xl">
      <div class="w-full">
        <form
          action="#"
          method="POST"
          class="bg-gray-50 p-5 space-y-5 rounded-lg shadow"
        >
          <img
            class="lg:block h-auto mx-auto mb-12 mt-2 w-3/4 sm:w-2/3"
            src="../../public/icon-left-font-monochrome-black.svg"
            alt="logo de groupomania"
          />
          <div class="sm:rounded-md">
            <div class="pb-5">
              <h2
                class="mt-1 text-center text-2xl font-extrabold mb-10 text-gray-900"
              >
                M'inscrire
              </h2>
              <p v-if="error" class="text-red-600 text-sm mb-3">
                {{ error }}
              </p>
              <div class="grid grid-cols-6 gap-4">
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="first_name"
                    class="block text-sm font-medium text-gray-700"
                    >Prénom</label
                  >
                  <input
                    v-model="firstName"
                    type="text"
                    name="first_name"
                    id="first_name"
                    autocomplete="given-name"
                    class="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="last_name"
                    class="block text-sm font-medium text-gray-700"
                    >Nom</label
                  >
                  <input
                    v-model="lastName"
                    type="text"
                    name="last_name"
                    id="last_name"
                    autocomplete="family-name"
                    class="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="email_address"
                    class="block text-sm font-medium text-gray-700"
                    >E-mail</label
                  >
                  <input
                    v-model="email"
                    type="text"
                    name="email_address"
                    id="email_address"
                    autocomplete="email"
                    class="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="password"
                    class="block text-sm font-medium text-gray-700"
                    >Mot de passe</label
                  >
                  <input
                    v-model="password"
                    type="password"
                    name="password"
                    id="password"
                    autocomplete="password"
                    class="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            <div class="px-4 pb-3 bg-gray-50 text-right sm:px-6">
              <button
                @click.prevent="signup"
                type="submit"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white"
                :class="{
                  'bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500': hasEnteredCredentials,
                  'bg-gray-600': !hasEnteredCredentials,
                }"
                :disabled="!hasEnteredCredentials"
              >
                Créer mon compte
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import user from "@/api/user"

export default {
  name: "Signup",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      error: "",
    }
  },
  computed: {
    // Permet d'activer/désactiver le bouton de validation du formulaire selon si les champs sont remplis ou non
    hasEnteredCredentials() {
      return this.firstName && this.lastName && this.email && this.password
    },
  },
  methods: {
    async signup() {
      this.error = ""
      const res = await user.signup(
        this.firstName,
        this.lastName,
        this.email,
        this.password
      )
      if (res.error) {
        this.error = res.error
        return // Affiche le message d'erreur en cas d'email invalide (par ex)
      }
      this.$store.commit("setUser", res) // Enregistre les données de l'utilisateur dans le store (qui gère le localStorage)
      this.$router.push("/") // Renvoie à la page d'accueil
    },
  },
}
</script>
