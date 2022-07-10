<template>
    <q-dialog ref="dialog" @hide="onDialogHide" persistent>
      <q-card class="q-dialog-plugin" style="min-width: 200px" flat>
        <q-card-section>
          <div class="text-h6">New album</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
            <q-input
              dense 
              v-model.string="title"
              label=Name
              :rules="[ val => val && val.length > 0 || 'Please type something', val => val && /[a-zA-Z]/.test(val[0]) || 'Title must begin with a letter']"
              autofocus 
              @keyup.enter="newAlbum = false"
            />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense 
            v-model.string="description"
            label=Description
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" @click="onCancelClick" />
          <q-btn flat label="OK" @click="onOKClick(title, description, avatar)" />
        </q-card-actions>
      </q-card>
    </q-dialog>

</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const title = ref('')
    const description = ref('')
    const avatar = ref('')

    return {
      title,
      description,
      avatar
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
      if( title === "" )
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
    }
  }
}
</script>
