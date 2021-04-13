<template>
  <div>
    <q-table :data="processList" :columns="columns" row-key="name" dense flat square />
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
          name: 'kexperimentCtime',
          label: '时间',
          field: 'kexperimentCtime',
          align: 'left',
          style: 'width:300px',
        },
        { name: 'experimentName', label: '操作', field: 'experimentName', align: 'left' },
      ],
      process: [],
      processList: [],
      eT: '',
    }
  },

  // computed: {
  //   processList() {
  //     const arr = []
  //     this.process.forEach((e, i) => {
  //       // 如果没有结束时间则未完成
  //       if (e.kexperimentCtime) {
  //         let formattedString = date.formatDate(e.kexperimentCtime, 'YYYY-MM-DD HH:mm:ss')
  //         arr.push({ ...this.process[i], kexperimentCtime: formattedString })
  //       }
  //     })
  //     return arr
  //   },
  // },
}
</script>
