import ky from "ky"
import store from "@/store"

export default ky.extend({
  prefixUrl: "http://localhost:3000",
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
  },
})
