<template>
  <div>
    <q-splitter v-model="splitterModel" disable :separator-style="{ backgroundColor: 'transparent' }">
      <template v-slot:before>
        <div class="q-py-lg q-pr-md q-pl-lg">
          <q-card style="border-radius: 30px; height: 600px">
            <q-card-section class="q-pb-sm">
              <div class="row">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="52" class="q-ml-md">
                  <rect width="10" height="32" fill="black" />
                </svg>
                <div class="text-h5 vertical-middle">我的To Do List</div>
              </div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <q-input
                color="warning"
                outlined
                v-model="text"
                label="我的任务"
                @keyup.enter.native="addNewMemo"
              >
                <template v-slot:append>
                  <q-btn round dense flat icon="add" @click="addNewMemo" />
                </template>
              </q-input>
              <div class="q-pa-md">
                <q-list bordered separator>
                  <q-item v-for="item in list" :key="item.num">
                    <q-checkbox v-model="item.val" @input="strikethrough(item)" />
                    <q-item-section :class="item.decorate">
                      {{ item.text }}
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </template>

      <template v-slot:after>
        <div class="q-pt-lg q-pb-md q-px-lg">
          <q-card style="border-radius: 30px; height: 300px">
            <q-card-section class="q-pb-sm">
              <div class="row">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="52" class="q-ml-md">
                  <rect width="10" height="32" fill="black" />
                </svg>
                <div class="text-h5 vertical-middle">我的反思词云</div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <q-splitter v-model="splitterModel" disable :separator-style="{ backgroundColor: 'transparent' }">
          <template v-slot:before>
            <div class="q-pa-lg">
              <q-card style="border-radius: 30px; height: 260px">
                <q-card-section class="row justify-center">
                  <div class="col-auto self-center" style="display: inline">
                    <svg
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="75"
                      height="75"
                    >
                      <path :d="d1" fill="#000000"></path>
                      <path :d="d2" fill="#000000"></path>
                      <path :d="d3" fill="#000000"></path>
                    </svg>
                  </div>
                  <div class="text-h5 col-auto q-ml-sm self-center" style="display: inline">答疑解惑</div>
                </q-card-section>
                <q-card-section class="row justify-center">
                  <q-btn
                    unelevated
                    rounded
                    color="black"
                    size="25px"
                    label="我的教师"
                    to="/classrooms-list"
                  />
                </q-card-section>
              </q-card>
            </div>
          </template>
          <template v-slot:after>
            <div class="q-pa-lg">
              <q-card style="border-radius: 30px; height: 260px">
                <q-card-section class="row justify-center">
                  <div class="col-auto self-center" style="display: inline">
                    <svg
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="75"
                      height="75"
                      style="padding: 6.675px"
                    >
                      <path :d="d4" fill="#000000"></path>
                      <!-- <path :d="d5" fill="#000000"></path> -->
                    </svg>
                  </div>
                  <div class="text-h5 col-auto q-ml-sm self-center" style="display: inline">查看同伴</div>
                </q-card-section>
                <q-card-section class="row justify-center">
                  <q-btn
                    unelevated
                    rounded
                    color="black"
                    size="25px"
                    label="我的班级"
                    to="/classrooms-list"
                  />
                </q-card-section>
              </q-card>
            </div>
          </template>
        </q-splitter>
      </template>
    </q-splitter>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      splitterModel: 50,
      text: '',
      list: [],
      d1: 'M808.35715 213.332736c-164.707272-164.709319-432.683537-164.709319-597.333504 0-164.709319 164.649967-164.709319 432.624185 0 597.333504 164.649967 164.709319 432.626231 164.709319 597.333504 0C973.067492 645.956921 973.067492 377.982704 808.35715 213.332736zM765.48983 767.767198c-141.075039 141.077086-370.609783 141.077086-511.627517 0-141.078109-141.017734-141.078109-370.520755 0-511.596817 141.017734-141.017734 370.552477-141.077086 511.627517 0C906.506541 397.188114 906.506541 626.750487 765.48983 767.767198z',
      d2: 'M500.686838 686.040848c-20.432355 0.061398-37.063127 16.692171-37.063127 37.095873 0 20.458961 16.630772 37.090756 37.092803 37.090756 20.432355 0 37.066197-16.631796 37.066197-37.151132C537.781688 702.672644 521.147846 686.040848 500.686838 686.040848z',
      d3: 'M505.832022 265.144776c-72.362075 0-136.290059 41.640376-158.933779 103.683431-5.26491 14.508435-9.813506 38.620599-5.26491 58.753125 3.048429 13.81975 17.709337 22.974247 31.320333 19.863397 14.117532-3.171226 23.0029-17.23043 19.832697-31.290657-1.556449-7.210215-0.060375-20.132526 3.350304-29.435403 12.533454-34.342156 51.27378-69.043493 109.60735-69.043493 68.681242 0 116.635417 35.091216 116.635417 85.375459 0 37.572734-23.302729 51.1561-64.525596 72.034617-37.303604 18.847254-83.761706 42.241057-83.761706 101.289917L474.092134 629.981065c0 14.478759 11.784394 26.2652 26.204825 26.2652 14.449084 0 26.235524-11.786441 26.235524-26.2652l0-53.606919c0.060375-25.605168 18.936281-36.317137 55.042617-54.504358 41.6107-20.968567 93.421716-47.025013 93.421716-118.820176C674.997839 321.862545 605.418135 265.144776 505.832022 265.144776z',
      d4: 'M380.432167 456.699661a189.498674 189.498674 0 1 0-190.216083-189.464511 191.001818 191.001818 0 0 0 190.216083 189.464511z m-148.333016 29.311315a260.89803 260.89803 0 0 1-117.757694-219.937347 266.056548 266.056548 0 0 1 532.147258 0 260.89803 260.89803 0 0 1-117.757694 219.937347 376.230196 376.230196 0 0 1 232.099151 348.456188v75.567165a114.546431 114.546431 0 0 1-114.341457 113.897346H114.341457A114.546431 114.546431 0 0 1 0 910.034329V834.603813a377.391716 377.391716 0 0 1 232.099151-348.456188z m414.389564 462.421859a38.808454 38.808454 0 0 0 38.500993-38.330181V834.603813a304.557541 304.557541 0 0 0-609.115081 0v75.567166a38.808454 38.808454 0 0 0 38.500992 38.33018z m78.129344-851.531269a208.390465 208.390465 0 0 1 129.065439 371.071678 298.271664 298.271664 0 0 1 173.237385 272.923185v75.567165a114.546431 114.546431 0 0 1-114.341457 113.897346h-56.607049a38.842616 38.842616 0 0 1-38.500993-38.330181 38.091044 38.091044 0 0 1 38.500993-38.33018h56.607049a38.842616 38.842616 0 0 0 38.500992-38.364343v-75.567166a226.90647 226.90647 0 0 0-226.428197-226.701496h-2.254716a38.842616 38.842616 0 0 1-38.500993-38.330181 38.091044 38.091044 0 0 1 38.500993-38.364343h2.254716a133.233248 133.233248 0 0 0 0-266.193197h-2.254716a38.330181 38.330181 0 1 1 0-76.694524h2.254716z',
      d5: 'M967.111111 890.538667c0 26.567111-20.935111 48.128-46.734222 48.128h-135.822222c7.452444-10.752 11.889778-23.808 11.889777-37.916445V711.111111c0-19.911111-3.754667-38.741333-9.130666-56.888889h39.623111C904.362667 654.222222 967.111111 718.876444 967.111111 798.634667v91.904zM782.222222 568.888889c-26.282667 0-50.688-7.964444-70.997333-21.560889-0.768-0.540444-1.450667-1.137778-2.218667-1.649778A127.715556 127.715556 0 0 1 654.222222 440.888889a128 128 0 1 1 128 128zM398.222222 483.555556a199.111111 199.111111 0 1 1 0-398.222223 199.111111 199.111111 0 0 1 0 398.222223z m170.666667 85.333333a170.666667 170.666667 0 0 1 170.666667 170.666667v142.222222a56.888889 56.888889 0 0 1-56.888889 56.888889H113.777778a56.888889 56.888889 0 0 1-56.888889-56.888889v-142.222222a170.666667 170.666667 0 0 1 170.666667-170.666667h341.333333z',
    }
  },

  created() {
    this.getUserMemoById({
      success: (res) => {
        for (let i = 0; i < res.length; i++) {
          this.list.push({ num: res[i].memo_id, val: false, decorate: '', text: res[i].memo_content })
        }
        console.log(res)
      },
      failure: (err) => {
        console.log(err)
      },
    })
  },

  methods: {
    ...mapActions('user', ['startNewMemo', 'deleteMemoById', 'getUserMemoById']),
    strikethrough(item) {
      if (item.val == true) {
        item.decorate = 'text-strike text-grey'
      }
      if (item.val == false) item.decorate = ''
      console.log(this.list.find((e) => e.num == item.num).num)
    },

    addNewMemo() {
      if (this.text != '') {
        this.startNewMemo({
          memo_content: this.text,
          success: (res) => {
            this.list.push({ num: res.memoId, val: false, decorate: '', text: this.text })
            this.text = ''
            console.log(this.list)
            console.log(res)
          },
          failure: (err) => {
            console.log(err)
          },
        })
      }
    },

    deleteMemo() {
      if (this.list.find((e) => e.val == true)) {
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].val == true) {
            this.deleteMemoById({
              memo_id: this.list[i].num,
              success: (res) => {
                console.log(res)
              },
              failure: (err) => {
                console.log(err)
              },
            })
          }
        }
      }
    },
  },

  mounted() {
    window.onbeforeunload = () => {
      this.deleteMemo()
      return ''
    }
  },
  beforeDestroy() {
    window.onbeforeunload = null
    this.deleteMemo()
  },
}
</script>