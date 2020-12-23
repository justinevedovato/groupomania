import api from "@/api"

export default {
  async login(email, password) {
    console.log(email, password)
    return await api
      .post("user/login", {
        json: { email, password },
      })
      .json()
  },
}
