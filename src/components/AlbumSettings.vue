<template>
    <q-dialog ref="dialog" @hide="onDialogHide" persistent>

            <q-card class="q-dialog-plugin" style="min-width: 200px" flat>                    
                <q-card-section>
                    <div class="text-h6">Album settings</div>
                </q-card-section>

                    <q-carousel
                        v-model="slide"
                        swipeable
                        animated
                        arrows
                        height="200px"
                        control-color="primary"
                    >
                        <q-carousel-slide name="title" >
                            <q-card-section class="q-pt-none">
                                <q-input
                                    label="Name"
                                    v-model="editedTitle"
                                    lazy-rules
                                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                                />        
                            </q-card-section>

                            <q-card-section class="q-pt-none">
                                <q-input
                                    label="Description"
                                    v-model="editedDesc"
                                />  
                            </q-card-section>
                        </q-carousel-slide>
                        <q-carousel-slide name="logo" class="column no-wrap flex-center">
                            <q-icon name="live_tv" size="56px" />
                            <div class="q-mt-md text-center">
                                <p>Il n'y a rien ici pour le moment</p>
                            </div>
                        </q-carousel-slide>
                    </q-carousel>

                <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Cancel" @click="onCancelClick" />
                    <q-btn flat label="OK" @click="onOKClick(editedTitle, editedDesc, logo)" />
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
        logo:
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
        editedLogo:this.logo,
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

    onOKClick (title, description, logo) {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      if( title === "")
      {
        this.$q.notify('Album name can not be empty.')
      }
      else
      {
        this.$emit('ok', {album : {title, description, logo}})
        // or with payload: this.$emit('ok', { ... })

        // then hiding dialog
        this.hide()
      }
    },

    onCancelClick () {
      // we just need to hide the dialog
      this.hide()
    }
  }
}
</script>