import ky from "ky"
import store from "@/store"
import router from "@/router"

export default ky.extend({
  prefixUrl: "http://localhost:3000",
  throwHttpErrors: false,
  hooks: {
    beforeRequest: [
      (request) => {
        if (store.state.user) {
          request.headers.set(
            "Authorization",
            `Bearer ${store.state.user.token}`
          )
        }
      },
    ],
    afterResponse: [
      (req, options, res) => {
        // Pour déconnecter automatiquement l'utilisateur quand le token est expiré
        if (res.status === 401) {
          store.commit("setUser")
          router.push("/login")
        }
      },
    ],
  },
})
