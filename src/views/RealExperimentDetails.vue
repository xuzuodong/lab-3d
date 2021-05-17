<template>
  <div class="container experiment-details">
    <!-- 加载界面 -->
    <div v-if="!experiment" class="absolute-spinner">
      <q-spinner color="primary" size="3rem" :thickness="5" />
    </div>
    <!-- 实验详情 -->
    <div v-else>
      <!-- 实验介绍 顶部 -->
      <div class="row items-start no-wrap q-pt-lg q-mb-xl">
        <q-img
          class="experiment-image rounded-borders"
          :src="experiment.image"
          :ratio="1"
          spinner-color="primary"
          spinner-size="25px"
        />
        <div class="q-pl-lg col">
          <h5 class="q-my-sm text-weight-bolder">{{ experiment.name }}</h5>
          <p class="text-caption q-mb-sm text-grey">浏览 {{ experiment.clickc }} 次</p>
          <p>{{ experiment.description }}</p>
          <div class="row q-mt-md items-end">
            <div
              @click="toggleLike"
              v-ripple:red
              class="row items-center cursor-pointer relative-position q-pa-sm"
              style="border-radius: 20px"
            >
              <q-icon
                class="q-mr-xs"
                :name="experiment.experimentLikec ? 'favorite' : 'favorite_border'"
                size="sm"
                color="red"
              />
              {{ experiment.likec }}
            </div>
            <q-space />
            <div class="text-center">
              <q-btn
                :to="'/scene/' + $route.params.alias"
                unelevated
                rounded
                label="进入实验"
                color="primary"
                icon-right="arrow_forward"
              />
            </div>
          </div>
        </div>
      </div>

      <q-separator spaced />

      <div class="experiment-body">
        <h5>
          <q-icon name="mdi-test-tube" class="q-mr-xs" />
          实验步骤与易错点
        </h5>

        <q-table :data="stepList" :columns="stepColumns" row-key="name" class="q-mt-lg">
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="index" :props="props">
                {{ props.row.index }}
              </q-td>
              <q-td key="experimentSteps" :props="props">
                {{ props.row.experimentSteps }}({{ props.row.score }}分)
              </q-td>
              <q-td key="wrong" :props="props">
                {{ props.row.wrong }}
              </q-td>
            </q-tr>
          </template>
        </q-table>

        <h5>
          <q-icon name="link" class="q-mr-xs" />
          知识链接
        </h5>

        <q-card>
          <q-tabs v-model="knowledgePointTab" align="left">
            <q-tab
              v-for="(knowledgePoint, index) in experiment.knowledgePoints"
              :key="knowledgePoint.name"
              :name="index"
              :label="knowledgePoint.name"
            />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="knowledgePointTab" class="q-px-md" animated>
            <q-tab-panel
              v-for="(knowledgePoint, index) in experiment.knowledgePoints"
              :key="knowledgePoint.name"
              :name="index"
              class="q-px-none row no-wrap"
            >
              <q-carousel v-model="knowledgeImageSlides[index]" class="carousel" animated arrows>
                <q-carousel-slide
                  v-for="(image, imageIndex) in knowledgePoint.images"
                  :key="image.caption"
                  :name="imageIndex"
                  :img-src="image.url"
                >
                  <div class="absolute-bottom knowledge-point-image-caption">
                    <div class="text-subtitle2">{{ image.caption }}</div>
                  </div>
                </q-carousel-slide>
              </q-carousel>

              <div class="col q-ml-md">
                <h6 class="q-mt-none q-mb-md">{{ knowledgePoint.name }}</h6>
                <p class="knowledgePoint-desc">{{ knowledgePoint.description }}</p>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
        <h5>
          <q-icon name="smart_display" class="q-mr-xs" />
          教你一招
        </h5>

        <div v-for="video in experiment.knowledgeVideos" :key="'video' + video.knowledgeVideoName">
          <h6 class="q-my-xs">· {{ video.knowledgeVideoName }}</h6>
          <vue-plyr>
            <video controls crossorigin playsinline>
              <source size="720" :src="video.knowledgeVideoUrl" type="video/mp4" />
            </video>
          </vue-plyr>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import DialogJoinVue from '../components/DialogJoin.vue'
export default {
  data() {
    return {
      stepColumns: [
        { name: 'index', required: true, label: '步骤序号', align: 'center' },
        { name: 'experimentSteps', align: 'center', label: '实验操作', field: 'experimentSteps' },
        { name: 'wrong', align: 'center', label: '易错点', field: 'wrong' },
      ],
      steps: [],
      experiment: null,
      knowledgePointTab: 0,
      knowledgeImageSlides: null,
      isPretestFinished: false,
    }
  },

  computed: {
    ...mapState('user', ['userInfo']),
    stepList() {
      const arr = []
      this.steps.forEach((e, i) => {
        let wrongStr = ''
        if (e.wrong) {
          if (e.wrong.length == 1) {
            wrongStr = `${e.wrong}；`
          } else {
            for (let i = 0; i < e.wrong.length; i++) {
              wrongStr += `${i + 1}、${e.wrong[i]}；`
            }
          }
        } else {
          wrongStr = '/'
        }
        arr.push({ index: i + 1, ...this.steps[i], wrong: wrongStr })
      })
      return arr
    },
  },

  watch: {
    userInfo: function () {
      this.loadExperimentDetails()
    },
  },

  methods: {
    ...mapActions('experiment', ['selectExperimentByAlias', 'likeExperiment']),
    ...mapActions('user', ['getEquipment', 'startExperiment']),

    toggleLike() {
      if (this.userInfo) {
        this.likeExperiment({
          id: this.experiment.id,
          like: !this.experiment.experimentLikec,
          success: (res) => {
            if (this.experiment.experimentLikec) {
              this.experiment.likec--
              this.experiment.experimentLikec = false
            } else {
              this.experiment.likec++
              this.experiment.experimentLikec = true
            }
          },
          failure: (res) => {
            console.log(res)
          },
        })
      } else {
        this.$q
          .dialog({
            component: DialogJoinVue,
            parent: this,
          })
          .onOk(() => {
            this.loadExperimentDetails()
          })
      }
    },

    loadExperimentDetails() {
      this.selectExperimentByAlias({
        alias: this.$route.params.alias,
        success: (experiment) => {
          console.log(localStorage.getItem('kexperimentId'));
          if (localStorage.getItem('kexperimentId') != null) console.log('kk')
          else if (localStorage.getItem('kexperimentId') == null) {
            this.startExperiment({
              experimentId: experiment.id,
              success: (res) => {
                this.kexperimentId = res.kexperimentId
                console.log(this.kexperimentId)
                localStorage.setItem('kexperimentId', res.kexperimentId)
                console.log(localStorage.getItem('kexperimentId'))
              },
              failure: (res) => {
                console.log(res)
              },
            })
          }
          console.log(localStorage.getItem('kexperimentId'))

          this.getEquipment({
            experimentId: experiment.id,
            success: (res) => {
              this.steps = res
              console.log(res)
            },
            failure: (res) => {
              console.log(res)
            },
          })
          console.log(experiment)
          this.experiment = experiment
          document.title = experiment.name + ' | Lab 3D'
          this.knowledgeImageSlides = this.experiment.knowledgePoints.map(() => 0)
          this.isPretestFinished = experiment.isPretestFinished
        },
        failure: (error) => {
          console.log(error)
        },
      })
    },
  },

  created() {
    this.loadExperimentDetails()
  },

  beforeRouteLeave(to, from, next) {
    if (!this.userInfo && to.path.match('/scene')) {
      this.$q
        .dialog({
          component: DialogJoinVue,
          parent: this,
        })
        .onOk(() => {
          next()
        })
        .onCancel(() => {
          next(false)
        })
        .onDismiss(() => {
          next(false)
        })
    } else {
      next()
    }

    document.title = 'Lab 3D - 体验炫酷的科学实验！'
  },
}
</script>

<style lang="scss">
.experiment-details {
  .experiment-image {
    width: 180px;
  }
  .experiment-body {
    margin-top: 40px;
    h5 {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 25px 0px;
    }
  }

  .carousel {
    width: 250px;
    height: 180px;
  }

  .knowledge-point-image-caption {
    text-align: center;
    padding: 12px;
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
  }
}

.q-carousel__prev-arrow--horizontal {
  left: 5px !important;
}
.q-carousel__next-arrow--horizontal {
  right: 5px !important;
}

.underline {
  text-decoration: underline;
  cursor: pointer;
}
</style>
