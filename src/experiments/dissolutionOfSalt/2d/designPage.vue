<template>
  <div>
    <q-dialog ref="dialog" seamless @hide="onDialogHide" full-width>
      <q-splitter v-model="splitterModel" class="dialogStyle whiteStyle" disable>
        <template v-slot:before>
          <div class="q-pa-md" color="primary">
            <q-toolbar class="bg-primary text-white shadow-2 q-my-md" style="text-align: center">
              <q-toolbar-title>选项</q-toolbar-title>
            </q-toolbar>
            <q-list bordered separator>
              <q-item
                clickable
                v-ripple
                v-for="item in datas"
                :key="item.message"
                style="text-align: center"
                @click="passdata(item.message)"
              >
                <q-item-section>{{ item.message }}</q-item-section>
              </q-item>
            </q-list>
          </div>
        </template>

        <template v-slot:after>
          <q-stepper v-model="step" vertical color="primary" animated>
            <q-step :name="1" :title="optionValue1" icon="settings" :done="step > 1">
              <q-list bordered>
                <q-item v-ripple style="text-align: center">
                  <q-item-section>{{ optionValue1 }}</q-item-section>
                </q-item>
              </q-list>
              <q-stepper-navigation>
                <q-btn @click="step = 2" color="primary" label="继续" />
              </q-stepper-navigation>
            </q-step>

            <q-step :name="2" :title="optionValue2" icon="create_new_folder" :done="step > 2">
              <q-list bordered>
                <q-item v-ripple style="text-align: center">
                  <q-item-section>{{ optionValue2 }}</q-item-section>
                </q-item>
              </q-list>
              <q-stepper-navigation>
                <q-btn @click="step = 3" color="primary" label="继续" />
                <q-btn flat @click="step = 1" color="primary" label="退后" class="q-ml-sm" />
              </q-stepper-navigation>
            </q-step>

            <q-step :name="3" :title="optionValue3" icon="create_new_folder" :done="step > 3">
              <q-list bordered>
                <q-item v-ripple style="text-align: center">
                  <q-item-section>{{ optionValue3 }}</q-item-section>
                </q-item>
              </q-list>
              <q-stepper-navigation>
                <q-btn @click="step = 4" color="primary" label="继续" />
                <q-btn flat @click="step = 2" color="primary" label="退后" class="q-ml-sm" />
              </q-stepper-navigation>
            </q-step>

            <q-step :name="4" :title="optionValue4" icon="create_new_folder" :done="step > 4">
              <q-list bordered>
                <q-item v-ripple style="text-align: center">
                  <q-item-section>{{ optionValue4 }}</q-item-section>
                </q-item>
              </q-list>
              <q-stepper-navigation>
                <q-btn @click="step = 5" color="primary" label="继续" />
                <q-btn flat @click="step = 3" color="primary" label="退后" class="q-ml-sm" />
              </q-stepper-navigation>
            </q-step>

            <q-step :name="5" :title="optionValue5" icon="add_comment">
              <q-list bordered>
                <q-item v-ripple style="text-align: center">
                  <q-item-section>{{ optionValue5 }}</q-item-section>
                </q-item>
              </q-list>
              <q-stepper-navigation>
                <q-btn color="primary" label="完成" @click="hide"/>
                <q-btn flat @click="step = 4" color="primary" label="退后" class="q-ml-sm" />
              </q-stepper-navigation>
            </q-step>
          </q-stepper>
        </template>
      </q-splitter>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      step: 1,
      coin: false,
      splitterModel: 55,
      datas: this.data,
      optionValue1: '点击左侧选项即可填入答案',
      optionValue2: '点击左侧选项即可填入答案',
      optionValue3: '点击左侧选项即可填入答案',
      optionValue4: '点击左侧选项即可填入答案',
      optionValue5: '点击左侧选项即可填入答案',
    }
  },
  props: {
    data: Array,
  },
  methods: {
    show() {
      this.$refs.dialog.show()
    },
    hide() {
      this.$refs.dialog.hide()
    },
    onDialogHide() {
      this.$emit('hide')
    },
    passdata(option) {
      switch (this.step) {
        case 1:
          this.optionValue1 = option
          break
        case 2:
          this.optionValue2 = option
          break
        case 3:
          this.optionValue3 = option
          break
        case 4:
          this.optionValue4 = option
          break
        case 5:
          this.optionValue5 = option
          break
      }
      console.log(option)
      console.log(this.step)
    },
  },
}
</script>
<style scoped>
.dialogStyle {
  height: 90%;
  width: 90%;
}
.whiteStyle {
  background-color: #fff;
}
</style>