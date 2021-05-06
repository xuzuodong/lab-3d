<template>
  <div class="QTest">
    <q-dialog
      ref="dialog"
      @hide="onDialogHide"
      seamless
      transition-show="slide-left"
      transition-hide="slide-right"
      class="top-right-dialog"
    >
      <q-card class="bg-secondary text-white" style="width: 455px">
        <q-card-section>
          <q-badge class="text-h6" color="secondary">改变地面材质</q-badge>
          <q-badge class="q-ml-xl" color="secondary">当前地面材质：{{ landName }}</q-badge>
          <div class="row">
            <q-btn
              v-for="matItem in matItems"
              :key="matItem.id"
              :class="{ active: mat_index == matItem.id, inactive: mat_index != matItem.id }"
              class="q-mx-auto q-my-sm col-5"
              @click="mat(matItem)"
              :icon="'img:' + matItem.iconPath"
              :label="matItem.labelName"
            />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <q-badge class="text-h6" color="secondary">改变木块与地面的接触面积</q-badge>
          <q-badge class="q-ml-sm" color="secondary">当前放置状态：{{ areaName }}</q-badge>
          <div class="row q-my-sm bg-secondary text-white">
            <q-btn
              v-for="areaItem in areaItems"
              :key="areaItem.id"
              :class="{ active: area_index == areaItem.id, inactive: area_index != areaItem.id }"
              class="q-mx-sm q-my-sm col"
              @click="area(areaItem)"
              :icon="'img:' + areaItem.iconPath"
              :label="areaItem.labelName"
            />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <q-badge class="text-h6 q-mb-md" color="secondary">改变木块质量</q-badge>
          <q-badge class="text-h7" color="secondary">当前质量：{{ gravityData }}kg</q-badge>
          <q-slider
            v-model="gravityData"
            color="white"
            markers
            :min="25"
            :max="100"
            :step="25"
            label
            label-always
            label-color="secondary"
            label-text-color="white"
            style="width: 90%"
            class="q-mx-auto"
          />
        </q-card-section>
        <q-card-section class="row q-pt-none">
          <div class="col"></div>
          <q-btn
            style="background-color: #dcc987"
            label="确定"
            class="col-8"
            @click="dataPast"
            :disable="disTestPage"
          />
          <div class="col"></div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import storeData from './storeData'
import wastelandIcon from '../2d/assets/wastelandIcon.png'
import grassIcon from '../2d/assets/grassIcon.png'
import woodIcon from '../2d/assets/woodIcon.png'
import iceIcon from '../2d/assets/iceIcon.png'
import smlPlace from '../2d/assets/smlPlace.png'
import midPlace from '../2d/assets/midPlace.png'
import larPlace from '../2d/assets/larPlace.png'
export default {
  name: 'testPage',
  props: {
    disTestPage: Boolean,
  },
  data() {
    return {
      mat_index: 0,
      area_index: 0,
      isActive: true,
      gravityData: 100,
      landName: '荒地',
      areaName: '侧躺放置',
      areaItems: [
        { id: 0, iconPath: midPlace, labelName: '侧躺放置' },
        { id: 1, iconPath: larPlace, labelName: '平躺放置' },
        { id: 2, iconPath: smlPlace, labelName: '竖向放置' },
      ],
      matItems: [
        { id: 0, iconPath: wastelandIcon, labelName: '荒地(较为粗糙)' },
        { id: 1, iconPath: grassIcon, labelName: '草地(非常粗糙)' },
        { id: 2, iconPath: woodIcon, labelName: '木板(较为光滑)' },
        { id: 3, iconPath: iceIcon, labelName: '冰面(非常光滑)' },
      ],
      data: { mat: '荒地', area: '侧躺放置', mass: 100 },
    }
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
    onOKClick() {
      this.$emit('ok')
      this.hide()
    },

    mat(matItem) {
      this.mat_index = matItem.id
      this.landName = matItem.labelName.substr(0, 2)
    },
    area(areaItem) {
      this.area_index = areaItem.id
      this.areaName = areaItem.labelName.substr(0, 4)
    },

    exchange() {
      switch (this.mat_index) {
        case 0:
          this.data.mat = '荒地'
          break
        case 1:
          this.data.mat = '草地'
          break
        case 2:
          this.data.mat = '木板'
          break
        case 3:
          this.data.mat = '冰面'
          break
      }
      switch (this.area_index) {
        case 0:
          this.data.area = '侧躺放置'
          break
        case 1:
          this.data.area = '平躺放置'
          break
        case 2:
          this.data.area = '竖向放置'
          break
      }
      this.data.mass = this.gravityData
    },

    dataPast() {
      this.exchange()
      console.log(this.data)
      storeData.splice(0, storeData.length)
      storeData.push(this.data)
      this.$emit('ok', this.data)
      this.hide()
    },
  },
  created() {
    this.wastelandIcon = wastelandIcon
    this.grassIcon = grassIcon
    this.woodIcon = woodIcon
    this.iceIcon = iceIcon
    this.smlPlace = smlPlace
    this.midPlace = midPlace
    this.larPlace = larPlace
  },
}
</script>
<style scoped>
.active {
  background-color: #4cd0a3;
}
.inactive {
  background-color: #4cb9a3;
}
</style>