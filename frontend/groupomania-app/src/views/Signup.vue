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
              <div class="grid grid-cols-6 gap-4">
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

                <div class="col-span-6 mt-5">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">
                      Photo de profil
                    </label>
                    <div class="mt-2 flex items-center">
                      <span
                        class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100"
                      >
                        <svg
                          class="h-full w-full text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                      </span>
                      <button
                        type="button"
                        class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Changer
                      </button>
                    </div>
                  </div>
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
        return
      }
      console.log(res)
      this.$store.commit("setUser", res)
      this.$router.push("/")
    },
  },
}
</script>
