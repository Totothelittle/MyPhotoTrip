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
import { useAlbumStore } from '../stores/albums'

import AlbumCreation from 'components/AlbumCreation.vue'
import AlbumSettings from 'components/AlbumSettings.vue'
import AlbumItem from 'components/AlbumItem.vue'

export default ({

  components: {
    AlbumItem
  },

  setup() {
    const $q = useQuasar()
    const albumStore = useAlbumStore()

    const newAlbum = () => {
      $q.dialog({
        component: AlbumCreation,

      }).onOk(data => {
          let iAlbum = albumStore.getIndexFromTitle(data.album.title)
          if(iAlbum != -1)
          {
            $q.notify(albumStore.albums[iAlbum].title + ' already exists.')
          }
          else
          {
            albumStore.addAlbum(data.album)
          }
        }
      )
    }

    const deleteAlbum = (payload) => {
      $q.dialog({
        title: 'Warning',
        message: 'Delete album \" ' + payload.albumToDelete + ' \" ?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        albumStore.deleteAlbum(payload.albumToDelete)
        $q.notify(payload.albumToDelete + ' deleted.')
      })
    }

    const editAlbum = (payload) => {
      let iAlbum = albumStore.getIndexFromTitle(payload.albumToEdit)

      $q.dialog({
        component: AlbumSettings,
        componentProps: {
          title: albumStore.albums[iAlbum].title,
          description: albumStore.albums[iAlbum].description,
          avatar: albumStore.albums[iAlbum].avatar
        }
      }).onOk(data => {
          albumStore.updateAlbum(iAlbum, data.album)
        }
      )
    }

    return { 
      newAlbum,
      deleteAlbum, 
      editAlbum,
      albums: albumStore.albums,
    }
  }
})
</script>
