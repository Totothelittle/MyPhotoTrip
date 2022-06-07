<template>
    <div class="q-pa-md" style="max-width: 350px">
        <div class="row">
            <q-list separator>
                <AlbumItem
                    v-for="album in albums"
                    :key= "album.title"
                    :title="album.title"
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
          logo: 'Image'
        },
        {
          title: 'Laponie',
          description: 'La visite du village du père Noël',
          logo: 'Image'
        }
      ]
    }
  },

  methods: {
    newAlbum () {
      this.$q.dialog({
        component: AlbumCreation,

        componentProps: {

        }
      }).onOk(data => {
        this.albums.push(data.album)
      }).onCancel(() => {
        console.log('>>>> Cancel')
      }).onDismiss(() => {
        console.log('I am triggered on both OK and Cancel')
      })
    },
    deleteAlbum (payload) {
      this.albums.splice(this.albums.indexOf(payload.albumToDelete), 1);
    }
  },
})
</script>
