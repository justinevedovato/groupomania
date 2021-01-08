<template>
  <div class="h-screen flex items-center justify-center bg-gray-200 p-4">
    <div class="max-w-md w-full space-y-8 p-6 shadow rounded-lg bg-gray-50">
      <img
        class="lg:block h-auto mx-auto mb-10 mt-2 w-3/4 sm:w-2/3"
        src="../../public/icon-left-font-monochrome-black.svg"
        alt="logo de groupomania"
      />
      <div class="text-center">
        <h2 class="text-2xl font-extrabold mb-8 text-gray-900">
          Me connecter
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Vous n'avez pas de compte?
          <router-link
            to="/signup"
            class="font-medium text-red-600 hover:text-red-500"
          >
            Créez un compte en cliquant ici
          </router-link>
        </p>
      </div>
      <form class="mt-8 space-y-6" action="#" method="POST">
        {{ error }}
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              v-model="email"
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              v-model="password"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>

        <div>
          <button
            @click.prevent="login"
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white  "
            :class="{
              'bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500': hasEnteredCredentials,
              'bg-gray-600': !hasEnteredCredentials,
            }"
            :disabled="!hasEnteredCredentials"
          >
            Me connecter
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import user from "@/api/user"

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      error: "",
    }
  },
  computed: {
    // Permet d'activer/désactiver le bouton de validation du formulaire selon si les champs sont remplis ou non
    hasEnteredCredentials() {
      return this.email && this.password
    },
  },
  methods: {
    async login() {
      this.error = ""
      const res = await user.login(this.email, this.password)
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
