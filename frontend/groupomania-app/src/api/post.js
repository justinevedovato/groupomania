import api from "@/api"

export default {
  async getAllPosts() {
    return await api.get("post/", {}).json()
  },

  async createPost(title, body) {
    console.log(title, body)
    return await api
      .post("post/", {
        json: { title, body },
      })
      .json()
  },
  // async modify(firstName, lastName, email, password) {
  //   console.log(firstName, lastName, email, password)
  //   return await api
  //     .put("user/account", {
  //       json: { firstName, lastName, email, password },
  //     })
  //     .json()
  // },
  // async delete() {
  //   return await api.delete("user/account")
  // },
}
