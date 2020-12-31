<template>
  <div class="home mx-auto lg:w-2/3 xl:max-w-4xl" v-if="loadedData">
    <template v-if="allPosts.length">
      <Post v-for="item in allPosts" :key="item.id" :post="item" />
    </template>
    <div v-else>
      <p class="text-center italic mt-4">
        Soyez le premier à poster un article !
      </p>
    </div>
  </div>
</template>

<script>
// // @ is an alias to /src
import post from "@/api/post"
import Post from "@/components/Post"
// import user from "@/api/user"

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
      // this.error = this.post = null
      const res = await post.getAllPosts()
      this.loadedData = true
      this.allPosts = res
    },
  },
  created() {
    this.getAll()
  },
}
</script>
