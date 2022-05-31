<template>
    <div class="q-pa-md" style="max-width: 350px">
        <div class="row">
            <q-list separator>
                <q-item
                    v-for="album in albums"
                    :key= "album.name"
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
                        <q-item-label>{{ album.name }}</q-item-label>
                        <q-item-label caption lines="1">{{ album.decription }}</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </div>

        <div class="column items-center q-pa-md">
            <q-btn round color="primary" icon="add" dense/>
                <q-menu>
                    <p>Hello!</p>
                </q-menu>
        </div>

    </div>
</template>

<script>
export default ({
  data()
  {
    return {
      albums: [
        {
          name: 'Islande',
          decription: 'L\'album de notre lune de miel !',
          logo: 'Image'
        },
        {
          name: 'Laponie',
          decription: 'La visite du village du père Noël',
          logo: 'Image'
        },
        {
          name: 'Minorque',
          decription: 'La chaleur des îles',
          logo: 'Image'
        }
      ]
    }
  }
})
</script>
