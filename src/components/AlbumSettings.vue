<template>
    <q-dialog ref="dialog" @hide="onDialogHide" persistent>

            <q-card class="q-dialog-plugin" style="min-width: 200px" flat>                    
                <q-card-section >
                    <div class="text-h6">Album settings</div>
                </q-card-section>
                    <q-carousel
                        v-model="slide"
                        animated
                        arrows
                        height="170px"
                        control-color="primary"
                        class="q-pt-none"
                    >
                        <q-carousel-slide name="title" class="q-pt-none">
                            <q-card-section class="q-pt-none">
                                <q-input
                                    label="Name"
                                    v-model="editedTitle"
                                    lazy-rules
                                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                                />        
                            </q-card-section>

                            <q-card-section>
                                <q-input
                                    label="Description"
                                    v-model="editedDesc"
                                />  
                            </q-card-section>
                        </q-carousel-slide>
                        <q-carousel-slide name="avatar" class="column no-wrap flex-center">
                            <div class="q-mt-sm text-center text-subtitle1">
                                <p>Avatar</p>
                                <div v-if="editedAvatar !== ''">
                                  <q-img 
                                    :src="require('../../public/images/' + editedAvatar)"
                                    spinner-color="white"
                                    style="height: 100px; width: 100px"
                                    class="rounded-borders"
                                    @click="updateAvatar"
                                  />
                                </div>
                                <div v-else>
                                  <q-avatar size="100px" rounded color="secondary" text-color="white" @click="updateAvatar">
                                    {{ editedTitle.charAt(0) + editedTitle.charAt(1) }}
                                  </q-avatar>
                                </div>
                            </div>
                        </q-carousel-slide>
                    </q-carousel>

                <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Cancel" @click="onCancelClick" />
                    <q-btn flat label="OK" @click="onOKClick(editedTitle, editedDesc, editedAvatar)" />
                </q-card-actions>
            </q-card>
    </q-dialog>

</template>

<script>
export default {
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
        }
  },

  data()
  {
    return {
        editedTitle:this.title,
        editedDesc:this.description,
        editedAvatar:this.avatar,
        slide:'title'
    }
  },

  emits: [
    // REQUIRED
    'ok', 'hide'
  ],

  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show () {
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    onOKClick (title, description, avatar) {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      if( title === "")
      {
        this.$q.notify('Album name can not be empty.')
      }
      else
      {
        this.$emit('ok', {album : {title, description, avatar}})
        // or with payload: this.$emit('ok', { ... })

        // then hiding dialog
        this.hide()
      }
    },

    onCancelClick () {
      // we just need to hide the dialog
      this.hide()
    },

    updateAvatar () {
      console.log("I should update avatar, but still do not have any backend")
    }

  }
}
</script>