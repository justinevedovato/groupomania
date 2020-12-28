import api from "@/api"

export default {
  async getAllPosts() {
    return await api.get("post/", {}).json()
  },

  // async signup(firstName, lastName, email, password) {
  //   console.log(firstName, lastName, email, password)
  //   return await api
  //     .post("user/signup", {
  //       json: { firstName, lastName, email, password },
  //     })
  //     .json()
  // },
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
