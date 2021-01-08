<template>
  <div id="post">
    <div
      v-if="loaded"
      class="bg-white rounded shadow m-8 py-4 px-5 focus:border-red-500"
    >
      <!-- Entête de l'article -->
      <div class="flex justify-between">
        <div class="flex">
          <img class="h-12 mr-5" :src="imgUrl" alt="" />

          <!-- Titre de l'article et nom d'utilisateur -->
          <div>
            <h3 class="font-bold">
              {{ post.title }}
            </h3>
            <span class="font-light text-sm  mb-3">
              Par {{ post.user.firstName }} {{ post.user.lastName }}
            </span>
          </div>
        </div>

        <!-- Bouton J'aime -->
        <div class="flex">
          <button @click="addLike">
            <img src="../../public/heart-icon.png" alt="" class="h-4 mr-2" />
          </button>
          <span class="mt-3">{{ post.likes }}</span>
        </div>
      </div>

      <!-- Corps de l'article -->
      <p class="text-justify mx-3 mt-4 mb-6 whitespace-pre-line">
        {{ post.body }}
      </p>

      <!-- Section modification/suppression & Date -->
      <div class="flex mb-5 mx-3">
        <div
          v-if="$store.state.user.id == post.userId"
          class="flex mt-2 text-gray-400 mr-auto"
        >
          <router-link :to="{ name: 'ModifyPost', params: { id: post.id } }">
            <font-awesome-icon icon="edit" class="m-1 hover:text-gray-600"
          /></router-link>
          <a href="#" @click.prevent="deletePost">
            <font-awesome-icon
              icon="trash-alt"
              class="m-1 hover:text-gray-600"
            />
          </a>
        </div>
        <div>
          <p class="time text-xs mt-2 text-right">{{ post.humanTime }}</p>
        </div>
      </div>

      <!-- Section commentaires -->
      <div class="text-sm px-4 py-3 bg-gray-50 rounded">
        <p class="font-bold mb-4">Commentaires:</p>
        <div class="divide-dotted divide-gray-200 divide-y-4">
          <!-- Commentaires ici -->
          <template v-if="post.posts.length">
            <Reply
              v-for="item in post.posts"
              :key="item.id"
              :reply="item"
              @delete="deleteReply"
            />
          </template>
          <!-- Fin de la section commentaires -->

          <div v-else>
            <!-- Si aucun commentaire: -->
            <p class="text-center italic mt-4">
              Soyez le premier à répondre en commentaires !
            </p>
          </div>
        </div>

        <!-- Formulaire "Rédigez un commentaire" -->
        <form action="#" method="POST">
          <div class="w-full py-3">
            <textarea
              v-model="replyBody"
              type="text"
              id="reply"
              rows="3"
              placeholder="Rédigez un commentaire ici..."
              class="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div class="text-right">
            <button
              @click.prevent="newReply"
              type="submit"
              class="inline-flex item-right p-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white"
              :class="{
                'bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500': replyBody,
                'bg-gray-600': !replyBody,
              }"
              :disabled="!replyBody"
            >
              Publier mon commentaire
            </button>
          </div>
        </form>
        <!-- Fin du formulaire -->
      </div>
    </div>
  </div>
</template>

<script>
import { DateTime } from "luxon"
import post from "@/api/post"
import Reply from "@/components/Reply"

export default {
  name: "OnePost",
  components: {
    Reply,
  },
  data() {
    return {
      post: {},
      loaded: false,
      replyBody: "",
    }
  },
  computed: {
    imgUrl() {
      return `http://tinygraphs.com/labs/isogrids/hexa/${this.post.user.firstName}?theme=berrypie&numcolors=4&size=100&fmt=svg`
    },
  },
  methods: {
    async newReply() {
      const res = await post.replyToPost(this.$route.params.id, this.replyBody)
      this.post.posts.push(res) // Affiche automatiquement le nouveau commentaire
      this.replyBody = "" // Vide le champ après que le commentaire soit posté
    },
    async addLike() {
      const liked = await post.likePost(this.$route.params.id)
      // "liked" renvoie true ou false, ici ++ et -- ne concernent que l'affichage direct sur la page après avoir aimé-désaimé l'article
      if (liked) {
        this.post.likes++
      } else {
        this.post.likes--
      }
    },
    deleteReply(id) {
      // Ne concerne que l'affichage: supprime le commentaire de la page,
      // La vraie suppression de la base de données se passe dans le component Reply.vue
      this.post.posts = this.post.posts.filter((p) => p.id !== id)
    },
    async deletePost() {
      await post.deletePost(this.post.id)
      this.$router.push("/") // Redirige à la page d'accueil après suppression
    },
  },
  async created() {
    const res = await post.getPost(this.$route.params.id)
    this.post = res
    this.loaded = true // Charge l'affichage seulement après que les données aient été récupérées de la BDD

    // Affiche la date et l'heure dans un format lisible
    const d = DateTime.fromISO(this.post.createdAt)
    this.post.humanTime = d.setLocale("fr").toFormat("cccc d LLLL y à HH:mm")
  },
}
</script>

<style scoped lang="scss">
.time::first-letter {
  text-transform: uppercase;
}
</style>
