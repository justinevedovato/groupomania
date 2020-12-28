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
  async signup(firstName, lastName, email, password) {
    console.log(firstName, lastName, email, password)
    return await api
      .post("user/signup", {
        json: { firstName, lastName, email, password },
      })
      .json()
  },
  async modify(firstName, lastName, email, password) {
    console.log(firstName, lastName, email, password)
    return await api
      .put("user/account", {
        json: { firstName, lastName, email, password },
      })
      .json()
  },
  async delete() {
    return await api.delete("user/account")
  },
}
