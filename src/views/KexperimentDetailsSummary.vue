<template>
  <div id="KexperimentDetailsSummary">
    <q-table
      :data="processList"
      :columns="columns"
      :rows-per-page-options="[0]"
      row-key="name"
      dense
      flat
      square
    />
  </div>
</template>

<script>
import { date } from 'quasar'
export default {
  props: {
    behaviorInfo: Array,
  },
  data() {
    return {
      columns: [
        {
          name: 'ctime',
          label: '时间',
          field: 'ctime',
          align: 'left',
          style: 'width:300px',
        },
        { name: 'behaviorName', label: '操作', field: 'behaviorName', align: 'left' },
      ],
      process: [],
      eT: '',
    }
  },

  computed: {
    processList() {
      const arr = []
      this.behaviorInfo.forEach((e, i) => {
        if (e.ctime) {
          let formattedString = date.formatDate(e.ctime, 'YYYY-MM-DD HH:mm:ss')
          arr.push({ ...this.behaviorInfo[i], ctime: formattedString })
        }
      })
      return arr
    },
  },
}
</script>
