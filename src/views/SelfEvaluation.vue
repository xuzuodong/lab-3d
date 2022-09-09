<template>
  <div class="QAssume" @hide="onDialogHide">
    <q-dialog
      ref="dialog"
      seamless
      transition-show="scale"
      transition-hide="scale"
      persistent
      class="q-pa-md row items-start q-gutter-md"
    >
      <q-card class="container">
        <q-card-section class="q-pb-none">
          <q-item class="q-px-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="40" class="q-ml-md">
              <rect width="10" height="40" fill="black" />
            </svg>
            <q-item-section class="q-mx-auto">
              <div class="q-py-none text-h6">我的表现值得几颗星？</div>
            </q-item-section>
          </q-item>
          <div class="row justify-center">
            <q-rating v-model="ratingModel" size="4em" :max="5" color="" color-selected="#FFD231" />
          </div>
        </q-card-section>

        <q-card-section class="q-py-sm">
          <q-item class="q-px-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="40" class="q-ml-md">
              <rect width="10" height="40" fill="black" />
            </svg>
            <q-item-section class="q-mx-auto">
              <div class="q-py-none text-h6">本次实验难度如何？</div>
            </q-item-section>
          </q-item>
          <div class="row">
            <div class="col q-mx-sm" v-for="item in experDiff" :key="item.color" :hidden="showBut">
              <q-card style="cursor: pointer" @click="getEmotion(item.color)">
                <q-card-section class="q-px-sm justify-center row">
                  <svg
                    class="q-mb-md"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="60"
                    height="60"
                  >
                    <path :d="item.d" :fill="item.color"></path>
                  </svg>
                  <font :color="item.color">{{ item.text1 }}</font>
                  <font :color="item.color">{{ item.text2 }}</font>
                </q-card-section>
              </q-card>
            </div>
          </div>

          <div class="row justify-center q-pt-md" v-show="showBut == true">
            <svg
              class="q-mb-md q-ml-md col-2 self-center"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              :width="100"
              :height="100"
            >
              <path :d="chooseResult[0].d" :fill="chooseResult[0].color"></path>
            </svg>
            <font :color="chooseResult[0].color" class="text-h5 col-6 self-center q-ml-lg">
              {{ chooseResult[0].text1 }}{{ chooseResult[0].text2 }}
            </font>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-item class="q-px-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="40" class="q-ml-md">
              <rect width="10" height="40" fill="black" />
            </svg>
            <q-item-section class="q-mx-auto">
              <div class="q-py-none text-h6">我的实验感言？</div>
            </q-item-section>
          </q-item>
          <div class="row vertical-bottom">
            <q-input
              outlined
              rounded
              type="textarea"
              v-model="text"
              label="我的实验感言"
              class="q-ml-md col-10"
            />
            <q-btn
              class="q-ml-sm col self-end"
              style="height: 40px"
              label="提交"
              color="primary"
              @click="onOKClick()"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'SelfEvaluation',
  data() {
    return {
      ratingModel: 3,
      color: '',
      showBut: false,
      experDiff: [
        {
          color: '#e16531',
          d: 'M512 1024A512 512 0 1 1 1024 512 512 512 0 0 1 512 1024z m0-971.485316A459.485316 459.485316 0 1 0 971.47871 512 459.491923 459.491923 0 0 0 512 52.514684z m301.584516 381.192258L769.651613 515.303226l-43.932903-81.589678L644.129032 389.780645l81.589678-43.932903L769.651613 264.258065l43.932903 81.589677L895.174194 389.780645z m-13.873548-74.031897l-30.059355-55.831122-30.059355 55.831122-55.758452 30.059355 55.758452 30.059355 30.059355 55.824516 30.059355-55.824516 55.758451-30.059355zM822.503226 528.516129h19.621161c0.066065 2.206555 0.198194 4.39329 0.198194 6.606452a330.322581 330.322581 0 0 1-660.645162 0c0-2.213161 0.132129-4.399897 0.198194-6.606452h640.627613z m-310.503226 300.593548a293.167897 293.167897 0 0 0 206.517677-84.780593 265.090477 265.090477 0 0 0-416.668903-3.719432A293.002735 293.002735 0 0 0 512 829.109677zM219.268129 561.548387a291.734297 291.734297 0 0 0 60.382968 153.580181 298.050065 298.050065 0 0 1 461.460645 4.122426A292.665806 292.665806 0 0 0 804.797935 561.548387H219.268129z m35.080258-52.851613l-43.932903-81.589677L128.825806 383.174194l81.589678-43.926297L254.348387 257.651613l43.932903 81.589677L379.870968 383.174194l-81.589678 43.939509z m30.059355-155.62818l-30.059355-55.831123-30.059355 55.831123-55.758451 30.059354 55.758451 30.059355 30.059355 55.824516 30.059355-55.824516 55.758452-30.059355z',
          text1: '太简单了，',
          text2: '没有难度！',
        },
        {
          color: '#ffd231',
          d: 'M512 1024A512 512 0 1 1 1024 512 512 512 0 0 1 512 1024z m0-971.485316A459.485316 459.485316 0 1 0 971.485316 512 459.485316 459.485316 0 0 0 512 52.514684z m355.764026 413.563871a110.902503 110.902503 0 0 0-214.247226 0H617.042581a143.36 143.36 0 0 1 282.207793 0h-31.492955z m-238.743949 49.204851h31.710968a144.27169 144.27169 0 0 1-284.077419 0h36.712051a0.125523 0.125523 0 0 1 0 0.046246h215.634581zM568.154839 587.373006V541.729032h-39.63871v56.049136a108.880929 108.880929 0 0 0 39.63871-10.405162z m-46.965265 10.656207c1.407174 0 2.794529-0.09249 4.188491-0.145342h-8.370375c1.393961 0.052852 2.77471 0.145342 4.181884 0.145342zM508.696774 541.729032h-39.638709v43.014607a108.874323 108.874323 0 0 0 39.638709 12.512619V541.729032z m-59.458064 29.332645V541.729032h-24.443871a116.273548 116.273548 0 0 0 24.443871 29.332645zM587.974194 541.729032v33.540955A115.797884 115.797884 0 0 0 617.58431 541.729032H587.974194zM274.894452 383.834839A112.448413 112.448413 0 0 0 167.803871 466.052129h-36.474219a143.36 143.36 0 0 1 282.2144 0h-31.499562A112.461626 112.461626 0 0 0 274.894452 383.834839z',
          text1: '有点难度，',
          text2: '轻松掌握！',
        },
        {
          color: '#2aa515',
          d: 'M512 1024A512 512 0 1 1 1024 512 512 512 0 0 1 512 1024z m0-971.485316A459.485316 459.485316 0 1 0 971.47871 512 459.491923 459.491923 0 0 0 512 52.514684zM792.774194 469.058065v-52.851613H654.03871v-46.245162h251.045161v99.096775h-112.309677zM515.303226 636.716594a139.78591 139.78591 0 0 1-39.63871-5.774039v-38.733626a108.345806 108.345806 0 0 0 42.083097 8.548748 112.448413 112.448413 0 0 0 107.156645-82.197471h31.512774A145.566555 145.566555 0 0 1 515.303226 636.716594zM270.864516 416.206452H132.129032v-46.245162h251.045162v99.096775H270.864516v-52.851613z',
          text1: '小有挑战，',
          text2: '能够掌握！',
        },
        {
          color: '#31a7d2',
          d: 'M512 1024A512 512 0 1 1 1024 512 512 512 0 0 1 512 1024z m0-971.491923A459.491923 459.491923 0 1 0 971.47871 512 459.491923 459.491923 0 0 0 512 52.508077zM766.348387 587.974194a145.341935 145.341935 0 1 1 145.341936-145.341936 145.341935 145.341935 0 0 1-145.341936 145.341936z m0-277.517213A132.175277 132.175277 0 1 0 898.543484 442.632258 132.18849 132.18849 0 0 0 766.348387 310.456981zM512 792.774194a52.851613 52.851613 0 1 1 52.851613-52.851613 52.851613 52.851613 0 0 1-52.851613 52.851613zM257.651613 587.974194a145.341935 145.341935 0 1 1 145.341935-145.341936 145.341935 145.341935 0 0 1-145.341935 145.341936z m0-277.517213A132.175277 132.175277 0 1 0 389.84671 442.632258 132.18849 132.18849 0 0 0 257.651613 310.456981z',
          text1: '难度较高，',
          text2: '还有疑问！',
        },
        {
          color: '#b65bef',
          d: 'M512 1024A512 512 0 1 1 1024 512 512 512 0 0 1 512 1024z m0-971.485316A459.485316 459.485316 0 1 0 971.47871 512 459.485316 459.485316 0 0 0 512 52.514684z m326.490839 403.396542l-210.481549-58.301936 1.45342-5.430503-3.831742 2.180129-16.317936-28.843768 189.671226-107.916387 16.384 28.843768-152.146581 86.544516 184.055742 50.962168z m-126.513549 59.325935l21.404904 21.867355-65.139613 66.520361 1.915871 1.981936-21.603097 22.065548-68.178581-69.605574-44.593548 45.551484 1.981935 1.981935-21.669161 22.065549L447.917419 558.060181l-44.593548 45.551484 1.981935 1.981935-21.603096 22.065548-86.478452-88.262193 21.603097-22.065549 63.091613 64.399691 65.139613-66.513755 3.171096 3.210735 1.057033-1.096671 63.091613 64.399691 65.139612-66.513755 3.171097 3.210735 1.057033-1.096671 63.091612 64.399691zM394.339097 390.249703l1.453419 5.417291-210.349419 58.176412-8.720516-31.889341 183.923613-50.869678L208.631742 284.738065l16.317935-28.78431 189.539097 107.685161-16.317935 28.78431z',
          text1: '难度太大，',
          text2: '没有理解！',
        },
      ],
      chooseResult: [
        {
          color: '',
          d: '',
          text1: '',
          text2: '',
        },
      ],
      text: '',
      stopTime: '',
    }
  },

  created() {
    this.stopTime = new Date().getTime()
  },

  methods: {
    ...mapActions('user', ['submitStepInfo']),
    show() {
      this.$refs.dialog.show()
    },
    hide() {
      this.$refs.dialog.hide()
    },
    onDialogHide() {
      this.$emit('hide')
    },
    onOKClick() {
      this.submitStepInfo({
        kexperiment_id: this.$route.params.id,
        stepName: 'reflected',
        stepTime: new Date().getTime() - this.stopTime,
        stepInfo: [this.ratingModel, this.chooseResult[0].color, this.text],
        success: (res) => {
          console.log(res)
          this.$emit('ok', this.text)
          this.hide()
        },
        failure: (error) => {
          console.log(error)
        },
      })
    },
    getEmotion(count) {
      this.chooseResult[0].color = this.experDiff.find((e) => e.color == count).color
      this.chooseResult[0].d = this.experDiff.find((e) => e.color == count).d
      this.chooseResult[0].text1 = this.experDiff.find((e) => e.color == count).text1
      this.chooseResult[0].text2 = this.experDiff.find((e) => e.color == count).text2
      console.log(this.chooseResult)
      this.showBut = !this.showBut
    },
  },
  mounted() {
    this.$refs.dialog.show()
  },
}
</script>
<style scoped>
</style>