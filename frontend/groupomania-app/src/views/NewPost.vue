<template>
  <div class="home mx-auto md:w-2/3 xl:max-w-4xl mt-5 md:col-span-2">
    <div class=" md:mt-0">
      <form action="#" method="POST">
        <div class="sm:rounded-md sm:overflow-hidden">
          <div class="px-4 py-5 h-3/4 space-y-6 sm:p-6">
            <div class="col-span-6 sm:col-span-3">
              <input
                v-model="title"
                type="text"
                name="title"
                id="title"
                placeholder="Titre"
                class="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div>
              <div class="mt-1">
                <textarea
                  v-model="body"
                  id="body"
                  name="body"
                  rows="3"
                  class="shadow-sm focus:ring-red-500 focus:border-red-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Votre article ici..."
                ></textarea>
              </div>
            </div>
          </div>
          <div class="px-4 py-3 text-right sm:px-6">
            <button
              @click.prevent="newPost"
              type="submit"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white"
              :class="{
                'bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500': hasEnteredText,
                'bg-gray-600': !hasEnteredText,
              }"
              :disabled="!hasEnteredText"
            >
              Publier
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import post from "@/api/post"

export default {
  name: "NewPost",
  data() {
    return {
      title: "",
      body: "",
    }
  },
  computed: {
    // Permet d'activer/désactiver le bouton de publication si les champs sont vides ou non
    hasEnteredText() {
      return this.title && this.body
    },
  },
  methods: {
    async newPost() {
      this.error = ""
      const res = await post.createPost(this.title, this.body)
      if (res.error) {
        this.error = res.error
        return
      }
      console.log(res)
      this.$router.push("/")
    },
  },
}
</script>
