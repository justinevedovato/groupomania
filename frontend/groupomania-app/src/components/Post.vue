<template>
  <div id="post">
    <div class="bg-white rounded shadow m-8 py-4 px-5 focus:border-red-500">
      <div class="flex justify-between">
        <div class="flex">
          <img class="h-12 mr-5" :src="imgUrl" alt="" />
          <div>
            <!-- Le titre de l'article redirige vers la page de l'article en question: -->
            <router-link :to="{ name: 'Post', params: { id: post.id } }">
              <h3 class="font-bold">
                {{ post.title }}
              </h3>
            </router-link>
            <span class="font-light text-sm  mb-3">
              Par {{ post.user.firstName }} {{ post.user.lastName }}
            </span>
          </div>
        </div>

        <!-- Bouton "J'aime" -->
        <div class="flex">
          <button @click="addLike">
            <img src="../../public/heart-icon.png" alt="" class="h-4 mr-2" />
          </button>
          <span class="mt-3">{{ post.likes }}</span>
        </div>
      </div>

      <!-- Corps de l'article  -->
      <p class="text-justify mt-4 mb-6 whitespace-pre-line">
        {{ post.body }}
      </p>
      <div>
        <!-- Boutons Modifier et Supprimer si l'utilisateur est l'auteur du post -->
        <div
          v-if="$store.state.user.id == post.userId"
          class="ml-auto flex mt-2 text-gray-400"
        >
          <router-link :to="{ name: 'ModifyPost', params: { id: post.id } }">
            <font-awesome-icon icon="edit" class="m-1 hover:text-gray-600" />
          </router-link>
          <a href="#" @click.prevent="deletePost">
            <font-awesome-icon
              icon="trash-alt"
              class="m-1 hover:text-gray-600"
            />
          </a>
        </div>

        <!-- Date et heure -->
        <p class="time text-xs mt-2 text-right">{{ post.humanTime }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { DateTime } from "luxon"
import post from "@/api/post"

export default {
  name: "Post",
  props: ["post"],
  created() {
    const d = DateTime.fromISO(this.post.createdAt)
    this.post.humanTime = d.setLocale("fr").toFormat("cccc d LLLL y à HH:mm")
  },
  computed: {
    imgUrl() {
      return `http://tinygraphs.com/labs/isogrids/hexa/${this.post.user.firstName}?theme=berrypie&numcolors=4&size=100&fmt=svg`
    },
  },
  methods: {
    async addLike() {
      const liked = await post.likePost(this.post.id)
      // "liked" renvoie true ou false, ici ++ et -- ne concernent que l'affichage direct sur la page après avoir aimé-désaimé l'article
      if (liked) {
        this.post.likes++
      } else {
        this.post.likes--
      }
    },
    async deletePost() {
      await post.deletePost(this.post.id)
      this.$emit("delete", this.post.id) // Envoie l'info de suppression vers la page pour supprimer l'affichage du post en question
    },
  },
}
</script>

<style scoped lang="scss">
.time::first-letter {
  text-transform: uppercase;
}
</style>
