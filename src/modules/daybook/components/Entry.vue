<template>
  <div @click="$router.push({ name: 'entry', params: { id: entry.id } })" class="entry-container mb-3 pointer p-2">
    <div class="entry-title d-flex">
      <span class="text-success fs-5 fw-bold">{{ day }}</span>
      <span class="mx-1 fs-5">{{ month }}</span>
    </div>

    <div class="entry-description">
      {{ shortText }}
    </div>
  </div>
</template>

<script>
import getDayMonthYear from '@/modules/daybook/helpers/getDayMonthYear'

export default {
  name: 'DaybookEntry',
  props: {
    entry: {
      type: Object,
      required: true
    }
  },
  computed: {
    shortText() {
      return (this.entry.text.length > 130)
          ? this.entry.text.substring(0, 130) + '...'
          : this.entry.text
    },
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
  }
}
</script>

<style lang="scss" scoped>
.entry-container {
  border-bottom: 1px solid #2c3e50;
  transition: 0.2s all ease-in;

  &:hover {
    background-color: lighten($color: grey, $amount: 45);
    transition: 0.2s all ease-in;
  }

  .entry-description {
    font-size: 12px;
  }
}
</style>
