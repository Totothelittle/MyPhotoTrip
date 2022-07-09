import { defineStore } from 'pinia';

export const useAlbumStore = defineStore('albumStore', {
  state: () => ({
    albums: [
      {
        title: 'Islande',
        description: 'L\'album de notre lune de miel !',
        avatar: 'AvatarDefault.png',
        id: 0,
      },
      {
        title: 'Laponie',
        description: 'La visite du village du père Noël',
        avatar: '',
        id: 1
      }
    ],
    nextId: 2,
  }),
  getters: {
    getIndexFromTitle: (state) => {
       return (title) => state.albums.map(object => object.title).indexOf(title)
    },
  },
  actions: {
    addAlbum(album) {
      this.albums.push(album)
    },
    deleteAlbum(title) {
      this.albums.splice(this.getIndexFromTitle(title), 1)
    },
    updateAlbum(iAlbum, album) {
      this.albums[iAlbum].title = album.title
      this.albums[iAlbum].description = album.description
      this.albums[iAlbum].avatar = album.avatar
    }
  },
});
