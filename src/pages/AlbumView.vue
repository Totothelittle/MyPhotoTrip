<template>
    <div class="q-pa-md" style="max-width: 350px">
        <div class="row">
            <q-list separator>
                <AlbumItem
                    v-for="album in albums"
                    :key= "album.title"
                    :title="album.title"
                    :id="album.id"
                    :description="album.description"
                    :logo="album.logo"
                    @delete-album="deleteAlbum"
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
          logo: 'Image',
          id: 1,
        },
        {
          title: 'Laponie',
          description: 'La visite du village du père Noël',
          logo: 'Image',
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
          console.log(iAlbum)
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
        console.log(this.albums.map(object => object.title).indexOf(payload.albumToDelete));
        this.albums.splice(this.albums.indexOf(payload.albumToDelete));
        this.$q.notify(payload.albumToDelete + ' deleted.')
      })
    }
  }
})
</script>
