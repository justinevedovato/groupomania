<template>
  <!-- Dans le cas de l'affichage d'un commentaire, s'il n'est PAS en mode édition -->
  <div v-if="!editingMode">
    <div class="flex space-between">
      <!-- Image de profil et nom utilisateur -->
      <p class="mt-3 font-semibold flex capitalize">
        <img class="h-6 mr-2" :src="imgUrl" alt="" />
        {{ reply.user.firstName }}
        {{ reply.user.lastName }}
      </p>

      <!-- Boutons Modifier et Supprimer si l'utilisateur est l'auteur du commentaire: -->
      <div
        v-if="$store.state.user.id == reply.user.id"
        class="ml-auto mt-2 text-gray-400"
      >
        <font-awesome-icon
          @click="openEditMode"
          icon="edit"
          class="m-1 hover:text-gray-600"
        />
        <font-awesome-icon
          @click="deleteReply"
          icon="trash-alt"
          class="m-1 hover:text-gray-600"
        />
      </div>
    </div>
    <!-- Corps du commentaire -->
    <p class="text-justify whitespace-pre-line break-words">{{ reply.body }}</p>

    <!-- Date et heure -->
    <div>
      <p class="time text-xs mt-2 mb-3 text-right">{{ reply.humanTime }}</p>
    </div>
  </div>
  <!-- Sinon, quand le mode édition est activé, pour modifier un commentaire -->
  <div v-else>
    <form action="#" method="POST">
      <div class="w-full py-3">
        <textarea
          v-model="replyBody"
          type="text"
          id="reply"
          rows="3"
          placeholder="Modifiez votre commentaire..."
          class="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div class="text-right mb-2">
        <button
          @click.prevent="editingMode = false"
          class=" mr-2 inline-flex item-right p-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          x Annuler
        </button>
        <button
          @click.prevent="modifyReply"
          type="submit"
          class="inline-flex item-right p-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white"
          :class="{
            'bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500': replyBody,
            'bg-gray-600': !replyBody,
          }"
          :disabled="!replyBody"
        >
          Modifier
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { DateTime } from "luxon"
import post from "@/api/post"

export default {
  name: "Reply",
  data() {
    return {
      editingMode: false,
      replyBody: "",
    }
  },
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
    async modifyReply() {
      const res = await post.modifyPost(this.reply.id, null, this.replyBody)
      this.reply.body = res.body
      this.editingMode = false
    },
    openEditMode() {
      this.replyBody = this.reply.body
      this.editingMode = true
    },
  },
}
</script>

<style scoped lang="scss">
.time::first-letter {
  text-transform: uppercase;
}
</style>
