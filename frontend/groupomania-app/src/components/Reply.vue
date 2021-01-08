<template>
  <div>
    <div class="flex space-between">
      <!-- Image de profil et nom utilisateur -->
      <p class="mt-3 font-semibold flex">
        <img class="h-6 mr-2" :src="imgUrl" alt="" />
        {{ reply.user.firstName }}
        {{ reply.user.lastName }}
      </p>

      <!-- Boutons Modifier et Supprimer si l'utilisateur est l'auteur du commentaire: -->
      <div
        v-if="$store.state.user.id == reply.user.id"
        class="ml-auto mt-2 text-gray-400 "
      >
        <font-awesome-icon icon="edit" class="m-1 hover:text-gray-600" />
        <font-awesome-icon
          @click="deleteReply"
          icon="trash-alt"
          class="m-1 hover:text-gray-600"
        />
      </div>
    </div>
    <!-- Corps du commentaire -->
    <p class="text-justify whitespace-pre-line">{{ reply.body }}</p>

    <!-- Date et heure -->
    <div>
      <p class="time text-xs mt-2 mb-3 text-right">{{ reply.humanTime }}</p>
    </div>
  </div>
</template>

<script>
import { DateTime } from "luxon"
import post from "@/api/post"

export default {
  name: "Reply",
  props: ["reply"],
  computed: {
    imgUrl() {
      return `http://tinygraphs.com/labs/isogrids/hexa/${this.reply.user.firstName}?theme=berrypie&numcolors=4&size=100&fmt=svg`
    },
  },
  created() {
    const d = DateTime.fromISO(this.reply.createdAt)
    this.reply.humanTime = d.setLocale("fr").toFormat("cccc d LLLL y à HH:mm")
  },
  methods: {
    async deleteReply() {
      await post.deletePost(this.reply.id)
      this.$emit("delete", this.reply.id) // Envoie l'info de suppression vers la page pour supprimer l'affichage du commentaire en question
    },
  },
}
</script>

<style scoped lang="scss">
.time::first-letter {
  text-transform: uppercase;
}
</style>
