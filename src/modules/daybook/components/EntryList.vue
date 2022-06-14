<template>
  <div class="entry-list-container">
    <div class="p-2">
      <input type="text" name="" id="" class="form-control" placeholder="Buscar entrada">
    </div>

    <div class="entry-scroll-area">
      <Entry v-for="item in 100" :key="item" />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'EntryList',
  components: {
    Entry: defineAsyncComponent(() => import('@/modules/daybook/components/Entry.vue'))
  }
}
</script>

<style lang="scss" scoped>
.entry-list-container {
  border-right: 1px solid #2c3e50;
  height: calc(100vh - 56px);
}

.entry-scroll-area {
  height: calc(100vh - 110px);
  overflow: scroll;
}
</style>