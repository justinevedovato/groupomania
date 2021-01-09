<template>
  <div>
    <div
      class="align-middle mg m-auto my-10 sm:my-24 max-w-xl w-full space-y-8"
    >
      <form action="#" method="POST">
        <div class="overflow-hidden sm:rounded-md">
          <div class="py-2 px-4">
            <h2
              class="mt-1 text-center text-3xl font-extrabold mb-10 text-gray-900"
            >
              Modifier mes informations
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
                  autocomplete="family-name"
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
            </div>
          </div>
          <div class="px-4 py-4  text-right sm:px-6">
            <button
              @click.prevent="deleteUser"
              class="inline-flex justify-center py-2 px-4 mx-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              <span class="mr-4">x</span> Supprimer mon compte</button
            ><button
              @click.prevent="modify"
              type="submit"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white"
              :class="{
                'bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500': hasEnteredCredentials,
                'bg-gray-600': !hasEnteredCredentials,
              }"
              :disabled="!hasEnteredCredentials"
            >
              Modifier
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import user from "@/api/user"

export default {
  name: "Account",
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
    hasEnteredCredentials() {
      return this.firstName && this.lastName && this.email && this.password
    },
  },
  methods: {
    async modify() {
      this.error = ""
      const res = await user.modify(
        this.firstName,
        this.lastName,
        this.email,
        this.password
      )
      if (res.error) {
        this.error = res.error
        return // Affiche le message d'erreur en cas d'email invalide
      }
      this.$store.commit("setUser", res) // Remplace les données utilisateur dans le store
      this.$router.push("/")
    },

    // Suppression du compte
    async deleteUser() {
      this.error = ""
      const res = await user.delete()
      if (!res.ok) {
        this.error = "Une erreur a été rencontrée lors de la suppression"
        return
      }
      this.$store.commit("setUser") // Supprime les données utilisateur du store
      this.$router.push("/signup")
    },
  },
  created() {
    // Pour pré-remplir les champs du formulaire
    const user = this.$store.state.user // Récupère les données dans le store
    this.firstName = user.firstName
    this.lastName = user.lastName
    this.email = user.email
  },
}
</script>
