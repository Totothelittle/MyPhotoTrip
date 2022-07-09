<template>
        <div>
            <q-item
                class="q-pa-md"
                clickable
                :to="`/album/${id}`"
            >
                <q-item-section avatar>
                    <q-avatar v-if="this.avatar === ''" color="secondary" text-color="white">
                        {{ title.charAt(0) + title.charAt(1) }}
                    </q-avatar>
                    <q-avatar v-else>
                        <q-img :src="require('../../public/images/'+ this.avatar)" height="40px"/>
                    </q-avatar>
                </q-item-section>
                <q-item-section>
                    <q-item-label>{{ title }}</q-item-label>
                    <q-item-label caption lines="2">{{ description }}</q-item-label>
                </q-item-section>

                <q-menu touch-position context-menu>
                    <q-list style="min-width: 120px">
                        <q-item clickable @click="emitEditAlbum" v-close-popup>
                             <q-item-section>Album settings</q-item-section>
                            <q-item-section avatar>
                                <q-icon name="settings" />
                             </q-item-section>
                        </q-item>
                        <q-separator inset />
                        <q-item clickable @click="emitDeleteAlbum" v-close-popup>
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
            avatar:
            {
                type: String,
                required: true
            },
            id: {
              type: [String, Number],
              required: true
            }
        },
        methods: {
            emitDeleteAlbum() {
                this.$emit('delete-album', { albumToDelete: this.title })
            },
            emitEditAlbum() {
                this.$emit('edit-album', { albumToEdit: this.title })
            }
        }
    }
</script>
