interface Bookmark {
  id: string
  auth: {
    user: {
      _id: string,
      first_name: string,
      last_name: string,
      email: string,
      bookmarks: string
    },
    access_token: string
  }
}