<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
      <div>
        <span class="text-success fs-3 fw-bold">{{ day }}</span>
        <span class="mx-1 fs-3">{{ month }}</span>
        <span class="mx-2 fs-4 fw-light">{{ yearDay }}</span>
      </div>

      <div>
        <input
            @change="onSelectedImage($event)"
            ref="imageSelector"
            v-show="false"
            type="file"
            accept="image/png, image/jpeg"
            name="picture"
        >
        
        <button
            v-if="entry.id"
            @click="onDeleteEntry"
            class="btn btn-danger mx-2"
        >
          Delete
          <i class="fa fa-trash-alt"></i>
        </button>

        <button
            @click="onSelectImage"
            class="btn btn-primary mx-2"
        >
          Upload Picture
          <i class="fa fa-upload"></i>
        </button>
      </div>
    </div>

    <hr>

    <div class="d-flex flex-colum px-3 h-75">
      <textarea v-model="entry.text" placeholder="¿Qué sucedió hoy?"></textarea>
    </div>
  </template>

  <Fab icon="fa-save" @on:click="saveEntry"/>

  <img
      v-if="entry.picture && !localImage"
      :src="entry.picture"
      alt="entry-picture"
      class="img-thumbnail"
  >

  <img
      v-if="localImage"
      :src="localImage"
      alt="entry-picture"
      class="img-thumbnail"
  >
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import Swal from 'sweetalert2'

import getDayMonthYear from '@/modules/daybook/helpers/getDayMonthYear'
import uploadImage from '@/modules/daybook/helpers/uploadImage'

export default {
  name: 'EntryView',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  components: {
    Fab: defineAsyncComponent(() => import('@/modules/daybook/components/Fab.vue'))
  },
  data() {
    return {
      entry: null,
      localImage: null,
      file: null
    }
  },
  computed: {
    ...mapGetters({
      getEntryById: 'journal/getEntryById'
    }),
    day() {
      const { day } = getDayMonthYear(this.entry.date)

      return day
    },
    month() {
      const { month } = getDayMonthYear(this.entry.date)

      return month
    },
    yearDay() {
      const { yearDay } = getDayMonthYear(this.entry.date)

      return yearDay
    }
  },
  methods: {
    ...mapActions('journal', ['createEntry', 'updateEntry', 'deleteEntry']),
    loadEntry() {
      let entry

      if (this.id === 'new') {
        entry = {
          text: '',
          date: new Date().getTime()
        }
      } else {
        entry = this.getEntryById(this.id)
        if (!entry) return this.$router.push({ name: 'no-entry' })
      }

      this.entry = entry
    },
    async saveEntry() {
      new Swal({
        title: 'Espere por favor',
        allowOutsideClick: false
      })
      Swal.showLoading()

      this.entry.picture = await uploadImage(this.file)

      if (this.entry.id) {
        // Actualizar
        await this.updateEntry(this.entry)
      } else {
        // Crear nueva entrada
        console.log(`Post de una nueva entrada`)

        const newEntryId = await this.createEntry(this.entry)

        this.$router.push({ name: 'entry', params: { id: newEntryId } })
      }

      this.localImage = null

      Swal.fire('Guardado', 'Entrada registrada con exito', 'success')
    },
    async onDeleteEntry() {
      const { isConfirmed } = await Swal.fire({
        title: '¿Está seguro?',
        text: 'Una vez borrado, no se puede recuperar',
        showDenyButton: true,
        confirmButtonText: 'Si, estoy seguro'
      })

      if (isConfirmed) {
        new Swal({
          title: 'Espere por favor',
          allowOutsideClick: false
        })
        Swal.showLoading()

        await this.deleteEntry(this.entry.id)

        this.$router.push({name: 'no-entry'})

        Swal.fire('Eliminado', '', 'success')
      }
    },
    onSelectedImage(event) {
      const file = event.target.files[0]

      if (!file) {
        this.localImage = null
        this.file = null
        return
      }

      this.file = file

      const fr = new FileReader()
      fr.onload = () => this.localImage = fr.result
      fr.readAsDataURL(file)
    },
    onSelectImage() {
      this.$refs.imageSelector.click()
    }
  },
  created() {
    this.loadEntry()
  },
  watch: {
    id() {
      this.loadEntry()
    }
  }
}
</script>

<style lang="scss" scoped>
textarea {
  font-size: 20px;
  border: none;
  height: 100%;
  width: 100%;

  &:focus {
    outline: none;
  }
}

img {
  width: 200px;
  position: fixed;
  bottom: 150px;
  right: 20px;
  box-shadow: 0 5px 10px rgba($color: #000000, $alpha: 0.2);
}
</style>