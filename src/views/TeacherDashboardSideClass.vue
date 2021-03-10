<template>
  <q-item clickable active-class="">
    <q-item-section>Item</q-item-section>
    <q-item-section side>
      <q-btn icon="settings" size="sm" flat round />
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  props: {
    classroom: Object
  }
}
</script>

<style>
</style>