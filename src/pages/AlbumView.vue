<template>
    <div class="q-pa-md" style="max-width: 350px">
        <div>
            <q-list separator>
                <AlbumItem
                    v-for="album in albums"
                    :key= "album.title"
                    :title="album.title"
                    :id="album.id"
                    :description="album.description"
                    :avatar="album.avatar"
                    @delete-album="deleteAlbum"
                    @edit-album="editAlbum"
                />
            </q-list>
        </div>

        <div class="column items-center q-pa-md">
          <q-btn round color="primary" icon="add" dense @click="newAlbum"/>
        </div>

    </div>
</template>

<script>
import { useQuasar } from 'quasar'
import AlbumCreation from 'components/AlbumCreation.vue'
import AlbumSettings from 'components/AlbumSettings.vue'
import AlbumItem from 'components/AlbumItem.vue'

export default ({

  components: {
    AlbumItem
  },

  setup() {
    const $q = useQuasar()

    return {    }
  },

  data()
  {
    return {
      albums: [
        {
          title: 'Islande',
          description: 'L\'album de notre lune de miel !',
          avatar: 'AvatarDefault.png',
          id: 1,
        },
        {
          title: 'Laponie',
          description: 'La visite du village du père Noël',
          avatar: '',
          id: 2
        }
      ]
    }
  },

  methods: {
    newAlbum () {
      this.$q.dialog({
        component: AlbumCreation,

      }).onOk(data => {
          let iAlbum = this.albums.map(object => object.title).indexOf(data.album.title)
          if(iAlbum != -1)
          {
            this.$q.notify(this.albums[iAlbum].title + ' already exists.')
          }
          else
          {
            this.albums.push(data.album)
          }
        }
      )
    },
    deleteAlbum (payload) {
      this.$q.dialog({
        title: 'Warning',
        message: 'Delete album \" ' + payload.albumToDelete + ' \" ?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.albums.splice(this.albums.map(object => object.title).indexOf(payload.albumToDelete), 1);
        this.$q.notify(payload.albumToDelete + ' deleted.')
      })
    },
    editAlbum (payload) {
      let iAlbum = this.albums.map(object => object.title).indexOf(payload.albumToEdit)

      this.$q.dialog({
        component: AlbumSettings,
        componentProps: {
          title: this.albums[iAlbum].title,
          description: this.albums[iAlbum].description,
          avatar: this.albums[iAlbum].avatar
        }
      }).onOk(data => {
          this.albums[iAlbum].title = data.album.title
          this.albums[iAlbum].description = data.album.description
          this.albums[iAlbum].avatar = data.album.avatar
        }
      )
    },
  }
})
</script>
