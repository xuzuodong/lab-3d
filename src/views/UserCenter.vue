<template>
  <div>
    <div class="row bg-grey-4" style="padding: 25px 0 25px 15%">
      <q-avatar size="75px" class="q-mr-md">
        <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
      </q-avatar>
      <div class="column justify-center">
        <div class="text-h5 col-md-5">{{ userName }}</div>
        <div class="col-md-auto q-mt-sm">{{ slogan }}</div>
      </div>
      <q-btn
        style="height: fit-content"
        flat
        dense
        class="q-mt-sm"
        color="grey-14"
        @click="openInformationCenter"
      >
        编辑
      </q-btn>
    </div>
    <div style="height: max-content">
      <q-splitter v-model="splitterModel" disable>
        <template v-slot:before>
          <div class="q-pa-md column items-center justify-center" style="height: 300px">
            <div class="col column justify-center" v-for="item in items" :key="item.name">
              <q-btn
                color="white"
                class="q-px-md q-py-sm"
                text-color="black"
                rounded
                :label="item.label"
                @click="tabChange(item.num)"
                :flat="tab != item.num"
              />
            </div>
          </div>
        </template>

        <template v-slot:after>
          <div class="q-pa-md">
            <div v-if="tab == 1">
              <user-center-plan-design-vue></user-center-plan-design-vue>
            </div>
            <div v-else-if="tab == 2">
              <user-center-achieve-record-vue></user-center-achieve-record-vue>
            </div>
            <div v-else-if="tab == 3">
              <user-center-reflect-vue></user-center-reflect-vue>
            </div>
          </div>
        </template>
      </q-splitter>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import InformationCenterVue from './InformationCenter.vue'
import UserCenterPlanDesignVue from './UserCenterPlanDesign.vue'
import UserCenterAchieveRecordVue from './UserCenterAchieveRecord.vue'
import UserCenterReflectVue from './UserCenterReflect.vue'
export default {
  components: { UserCenterAchieveRecordVue, UserCenterPlanDesignVue, UserCenterReflectVue },
  data() {
    return {
      userName: '',
      slogan: '',
      splitterModel: 20,
      items: [
        {
          num: 1,
          name: 'UserCenterPlanDesign',
          label: '计划制定',
        },
        {
          num: 2,
          name: 'UserCenterAchieveRecord',
          label: '成就记录',
        },
        {
          num: 3,
          name: 'UserCenterReflect',
          label: '反思探讨',
        },
      ],
      tab: 1,
      isFlat: true,
    }
  },
  created() {
    this.updateUserInfo()
  },

  methods: {
    ...mapActions('user', ['getUserInfo']),
    openInformationCenter() {
      this.$q
        .dialog({
          component: InformationCenterVue,
          parent: this,
        })
        .onOk(() => {
          this.updateUserInfo()
        })
        .onCancel(() => {})
        .onDismiss(() => {})
    },
    tabChange(num) {
      this.tab = num
    },
    updateUserInfo() {
      this.getUserInfo({
        success: (res) => {
          this.userName = res.realname
          this.slogan = res.slogan
        },
        failure: (err) => {
          console.log(err)
        },
      })
    },
  },
}
</script>
