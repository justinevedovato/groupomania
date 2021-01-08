import api from "@/api"

export default {
  // Récupérer tous les posts
  async getAllPosts() {
    return await api.get("post/").json()
  },

  // Créer un nouveau post
  async createPost(title, body) {
    return await api
      .post("post/", {
        json: { title, body },
      })
      .json()
  },

  // Récupérer un post unique et ses commentaires associés
  async getPost(id) {
    return await api.get("post/" + id).json()
  },

  // Ecrire un commentaire en réponse à un post
  async replyToPost(id, body) {
    return await api
      .post("post/" + id, {
        json: { body },
      })
      .json()
  },

  // Aimer un post
  async likePost(postId) {
    return await api.post("post/" + postId + "/like").json()
  },

  async modifyPost(postId, title, body) {
    return await api
      .put("post/" + postId, {
        json: { title, body },
      })
      .json()
  },

  // Supprimer un post (ainsi que ses commentaires associés) ou un commentaire
  async deletePost(postId) {
    return await api.delete("post/" + postId)
  },
}
