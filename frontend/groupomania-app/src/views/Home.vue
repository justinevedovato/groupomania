<template>
  <div class="home mx-auto lg:w-2/3 xl:max-w-4xl" v-if="loadedData">
    <!-- Récupère les posts s'il y en a (-> si allPosts.length est 'true') -->
    <template v-if="allPosts.length">
      <Post
        v-for="item in allPosts"
        :key="item.id"
        :post="item"
        @delete="deletePost"
      />
    </template>
    <!-- S'il n'y a aucun post à afficher, affiche ce message: -->
    <div v-else>
      <p class="text-center italic mt-4">
        Soyez le premier à poster un article !
      </p>
    </div>
  </div>
</template>

<script>
import post from "@/api/post"
import Post from "@/components/Post"

export default {
  name: "Home",
  components: {
    Post,
  },
  data() {
    return {
      allPosts: [],
      loadedData: false,
    }
  },
  methods: {
    async getAll() {
      const res = await post.getAllPosts()
      this.loadedData = true // Permet de charger le contenu après que l'API ait renvoyé une réponse (les posts) pour éviter une erreur au chargement de la page
      this.allPosts = res
    },
    deletePost(id) {
      this.allPosts = this.allPosts.filter((p) => p.id !== id) // L'article supprimé est immédiatement supprimé de l'affichage de la page (sans avoir besoin de refresh)
    },
  },
  created() {
    this.getAll()
  },
}
</script>
