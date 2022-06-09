<template>
    <q-dialog ref="dialog" @hide="onDialogHide" persistent>
      <q-card class="q-dialog-plugin" style="min-width: 200px">
        <q-card-section>
          <div class="text-h6">Album settings</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
            <p>Name</p>
            <q-input dense v-model.string="title" autofocus @keyup.enter="newAlbum = false" />
        </q-card-section>

        <q-card-section class="q-pt-none">
            <p>Description</p>
          <q-input dense v-model.string="description"/>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" @click="onCancelClick" />
          <q-btn flat label="OK" @click="onOKClick(title, description, logo)" />
        </q-card-actions>
      </q-card>
    </q-dialog>

</template>

<script>
export default {
  props: {

  },

  data() {
	return {
		title: '',
		description: '',
        logo: ''
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
      this.$emit('ok', {album : {title, description, logo}})
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()
    },

    onCancelClick () {
      // we just need to hide the dialog
      this.hide()
    }
  }
}
</script>