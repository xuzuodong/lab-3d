<template>
  <div class="container">
    <q-table
      class="q-mt-xl"
      title="做过的实验"
      :data="formatKexperimentsList"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="experimentName" :props="props">
            {{ props.row.experimentName }}
          </q-td>
          <q-td key="kexperimentKtime" :props="props">
            {{ props.row.kexperimentKtime ? formatDate(props.row.kexperimentKtime) : '未完成' }}
          </q-td>
          <q-td key="duration" :props="props">
            {{
              props.row.kexperimentKtime
                ? diffData(props.row.kexperimentCtime, props.row.kexperimentKtime)
                : '未完成'
            }}
          </q-td>
          <q-td key="details" :props="props">
            <q-btn
              flat
              color="primary"
              label="点击查看"
              :disable="!props.row.kexperimentKtime"
              dense
              :to="`/${props.row.kexperimentRouter}/` + props.row.kexperimentId"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { date } from 'quasar'
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {
      columns: [
        {
          name: 'experimentName',
          label: '实验名称',
          field: 'experimentName',
          required: true,
          align: 'center',
        },
        { name: 'kexperimentKtime', align: 'center', label: '完成时间' },
        { name: 'duration', label: '持续时间', align: 'center', sortable: true },
        { name: 'details', align: 'center', label: '查看详情' },
      ],

      kexperimentsList: [],
    }
  },

  computed: {
    ...mapState('user', ['userInfo']),
    formatKexperimentsList: function () {
      const returnArr = []
      this.kexperimentsList.forEach((e, i) => {
        if (e.experimentType == 1) returnArr.push({ ...e, kexperimentRouter: 'kexperiment-details' })
        if (e.experimentType == 2) returnArr.push({ ...e, kexperimentRouter: 'real-kexperiment-details' })
      })
      return returnArr
    },
  },

  methods: {
    ...mapActions('user', ['selectMyKexperiment']),

    formatDate(stamp) {
      return date.formatDate(stamp, 'YYYY-MM-DD')
    },

    diffData(startStamp, endStamp) {
      let diff = date.getDateDiff(endStamp, startStamp, 'seconds')
      return `${parseInt(diff / 60)} 分 ${(diff % 60).toFixed(0)} 秒`
    },
  },

  created() {
    if (this.userInfo != null) {
      this.selectMyKexperiment({
        success: (res) => {
          console.log(res)
          this.kexperimentsList = res
        },
        failure: (res) => {
          console.log(res)
        },
      })
    }
  },
}
</script>