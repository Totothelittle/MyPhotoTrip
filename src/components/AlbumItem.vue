<template>
        <div class="row">
            <q-item
                class="q-pa-md" 
                clickable
            >
                <q-item-section avatar>
                    <q-avatar>
                        <img src="../assets/LogoDefault.png">
                    </q-avatar>
                </q-item-section>
                <q-item-section>
                    <q-item-label>{{ title }}</q-item-label>
                    <q-item-label caption lines="1">{{ description }}</q-item-label>
                </q-item-section>

                <q-menu touch-position context-menu>
                    <q-list style="min-width: 100px">
                        <q-item clickable v-close-popup>
                             <q-item-section>Album settings</q-item-section>
                            <q-item-section avatar>
                                <q-icon name="settings" />
                             </q-item-section>
                        </q-item>
                        <q-separator inset />
                        <q-item clickable @click="emitDeleteAlbum">
                            <q-item-section>Delete</q-item-section>
                            <q-item-section avatar>
                                 <q-icon name="delete" />
                             </q-item-section>
                        </q-item>
                    </q-list>
                </q-menu>

            </q-item>
        </div>   
</template>

<script>

    export default {
        name: "AlbumItem",

        props: {
            title:
            {
                type: String,
                required: true
            },
            description:
            {
                type: String,
                required: true
            },
            logo:
            {
                type: String,
                required: true
            }
        },
        methods: {
            emitDeleteAlbum() {
                this.$emit('delete-album', { albumToDelete: this.title })
            }
        }
    }
</script>