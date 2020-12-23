<template>
  <div class="about">
    <!--
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ]
  }
  ```
-->
    <div
      class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div class="max-w-md w-full space-y-8">
        <div>
          <img
            class="mx-auto h-12 w-auto"
            src="../../public/icon-left-font-monochrome-black.svg"
            alt="logo de groupomania"
          />
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Me connecter
          </h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            Vous n'avez pas de compte?
            <a
              href="#"
              class="font-medium text-yellow-600 hover:text-yellow-500"
            >
              Créez un compte en cliquant ici
            </a>
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
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
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
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
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
                'bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500': hasEnteredCredentials,
                'bg-gray-600': !hasEnteredCredentials,
              }"
              :disabled="!hasEnteredCredentials"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import auth from "@/api/user"

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
    hasEnteredCredentials() {
      return this.email && this.password
    },
  },
  methods: {
    async login() {
      this.error = ""
      const res = await auth.login(this.email, this.password)
      if (res.error) {
        this.error = res.error
        return
      }
      console.log(res)
      this.$store.commit("setUser", res)
    },
  },
}
</script>
