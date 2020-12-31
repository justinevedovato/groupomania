<template>
  <div id="post" class="hello">
    <div class="bg-white rounded shadow m-8 py-4 px-5 focus:border-red-500">
      <div class="flex justify-between">
        <div>
          <h3 class="font-bold">
            {{ post.title }}
          </h3>
          <span class="font-light text-sm  mb-3">
            <template v-if="post.user">
              Par {{ post.user.firstName }} {{ post.user.lastName }}
            </template>
            <template v-else>
              Par
              <span class="italic">Utilisateur supprimé</span>
            </template>
          </span>
        </div>
        <span>Likes: {{ post.likes }}</span>
      </div>
      <p class="text-justify mt-4 mb-6">
        {{ post.body }}
      </p>
      <div>
        <p class="time text-xs mt-2 text-right">{{ post.humanTime }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { DateTime } from "luxon"

export default {
  name: "Post",
  props: ["post"],
  created() {
    const d = DateTime.fromISO(this.post.createdAt)
    this.post.humanTime = d.setLocale("fr").toFormat("cccc d LLLL y à HH:mm")
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.time::first-letter {
  text-transform: uppercase;
}
// ul {
//   list-style-type: none;
//   padding: 0;
// }
// li {
//   display: inline-block;
//   margin: 0 10px;
// }
// a {
//   color: #42b983;
// }
</style>
