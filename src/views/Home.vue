<template>
    <div class="home">
        <q-parallax :height="300" :src="url_background">
            <h4 class="text-white">体验炫酷的科学实验！</h4>
        </q-parallax>
        <HomeExperimentsListVue />
        <div v-for="i in 100" :key="i" class="q-py-sm"></div>
    </div>
</template>

<script>
import HomeExperimentsListVue from './HomeExperimentsList.vue'
import url_background from '../assets/background.jpg'
export default {
    name: 'Home',
    components: { HomeExperimentsListVue },
    data() {
        return { url_background }
    },
}
</script>
