<template>
    <div class="q-pa-md" style="max-width: 350px">
        <div class="row">
            <q-list separator>
                <q-item
                    v-for="album in albums"
                    :key= "album.title"
                    class="q-pa-md" 
                    clickable
                    v-ripple
                >
                    <q-item-section avatar>
                        <q-avatar>
                            <img src="../assets/LogoDefault.png">
                        </q-avatar>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>{{ album.title }}</q-item-label>
                        <q-item-label caption lines="1">{{ album.description }}</q-item-label>
                    </q-item-section>
                </q-item>
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

export default ({

  components: {
    
  },

  setup() {
    const $q = useQuasar()

    return { }
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
    }
  },

})
</script>
