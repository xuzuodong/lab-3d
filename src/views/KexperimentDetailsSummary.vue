<template>
  <div>
    <q-table :data="data" :columns="columns" row-key="name" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        { name: 'time', label: '时间', field: 'name' },
        { name: 'behavior', label: '操作', field: 'behavior' },
      ],
      data: [],
    }
  },
}
</script>
