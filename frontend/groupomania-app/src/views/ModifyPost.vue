<template>
  <div class="home mx-auto md:w-2/3 xl:max-w-4xl mt-5 md:col-span-2">
    <div class=" md:mt-0">
      <!-- Formulaire pour créer un nouveau post  -->
      <form action="#" method="POST">
        <div class="sm:rounded-md sm:overflow-hidden">
          <div class="px-4 py-5 h-3/4 space-y-6 sm:p-6">
            <div class="col-span-6 sm:col-span-3">
              <!-- Titre -->
              <input
                v-model="title"
                type="text"
                name="title"
                id="title"
                placeholder="Titre"
                class="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <!-- Corps de l'article -->
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
            <!-- Retour à l'article en cas d'annulation -->
            <router-link :to="{ name: 'Post', params: { id: post.id } }">
              <button
                class=" mr-2 inline-flex item-right p-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                x Annuler
              </button>
            </router-link>
            <!-- Valide la modification -->
            <button
              @click.prevent="modifyPost"
              type="submit"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white"
              :class="{
                'bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500': hasEnteredText,
                'bg-gray-600': !hasEnteredText,
              }"
              :disabled="!hasEnteredText"
            >
              Valider la modification
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
  name: "ModifyPost",
  data() {
    return {
      post: {},
      title: "",
      body: "",
    }
  },
  computed: {
    // Permet d'activer/désactiver le bouton de publication tant que les champs concernés ne sont pas remplis:
    hasEnteredText() {
      return this.title && this.body
    },
  },
  methods: {
    async modifyPost() {
      this.error = ""
      const res = await post.modifyPost(
        this.$route.params.id,
        this.title,
        this.body
      )
      if (res.error) {
        this.error = res.error
        return
      }
      this.$router.push("/post/" + this.$route.params.id) // Renvoie à la page d'accueil après publication
    },
  },
  async created() {
    // Récupère les infos du post pour pre-remplir les champs
    const res = await post.getPost(this.$route.params.id)
    this.post = res
    this.title = this.post.title
    this.body = this.post.body
  },
}
</script>
