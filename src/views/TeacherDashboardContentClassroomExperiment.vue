<template>
  <q-table :data="experimentsList" :columns="experimentsColumns" :loading="loading" row-key="name" flat>
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="realName" :props="props">
          {{ props.row.realName || props.row.userName }}
        </q-td>
        <q-td key="experimentName" :props="props">
          {{ props.row.experimentName }}
        </q-td>
        <q-td key="duration" :props="props">
          {{ props.row.duration }}
        </q-td>
        <q-td key="finalScore" :props="props">
          {{ props.row.finalScore }}
        </q-td>
        <q-td key="button" :props="props">
          <q-btn
            :to="'/dashboard'+`/${props.row.kexperimentRouter}/` + props.row.kexperimentId"
            style="font-size: 14px"
            :disable = "props.row.kexperimentKtime == 0"
            color="primary"
            label="查看详情"
            flat
          />
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
import { mapActions } from 'vuex'
import { date } from 'quasar'

export default {
  data() {
    return {
      experimentsColumns: [
        { name: 'realName', required: true, label: '姓名', align: 'left', sortable: true },
        { name: 'experimentName', align: 'left', label: '实验名称', sortable: true },
        { name: 'duration', label: '实验时间', field: 'eTime', align: 'left', sortable: true },
        { name: 'finalScore', label: '成绩', field: 'score', align: 'center', sortable: true },
        { name: 'button', label: '详情', field: 'other', align: 'center' },
      ],
      experiments: [],
      loading: true,
    }
  },

  computed: {
    experimentsList() {
      const arr = []
      this.experiments.forEach((e, i) => {
        // 如果没有结束时间则未完成
        if (e.kexperimentKtime) {
          let duration = date.getDateDiff(e.kexperimentKtime, e.kexperimentCtime, 'seconds')
          if (e.experimentType == 1)
            arr.push({
              ...e,
              kexperimentRouter: 'kexperiment-details',
              duration: `${(duration / 60).toFixed(0)}分${duration % 60}秒`,
            })
          if (e.experimentType == 2)
            arr.push({
              ...e,
              kexperimentRouter: 'real-kexperiment-details',
              duration: `${(duration / 60).toFixed(0)}分${duration % 60}秒`,
            })
        } else {
          if (e.experimentType == 1)
            arr.push({
              ...e,
              kexperimentRouter: 'kexperiment-details',
              duration: '未完成',
            })
          if (e.experimentType == 2)
            arr.push({
              ...e,
              kexperimentRouter: 'real-kexperiment-details',
              duration: '未完成',
            })
        }
      })
      return arr
    },
  },

  methods: {
    ...mapActions('user', ['selectKexperimentByClass']),
  },

  created() {
    this.selectKexperimentByClass({
      classId: this.$route.params.id,
      success: (experiments) => {
        this.experiments = experiments
        console.log(experiments)
        this.loading = false
      },
      failure: (res) => {
        this.loading = false
        console.log(res)
      },
    })
  },
  watch: {
    $route() {
      this.selectKexperimentByClass({
        classId: this.$route.params.id,
        success: (experiments) => {
          this.experiments = experiments
          this.loading = false
        },
        failure: (res) => {
          this.loading = false
          console.log(res)
        },
      })
    },
  },
}
</script>

<style>
</style>