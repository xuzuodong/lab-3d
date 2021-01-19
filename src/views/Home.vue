<template>
    <div class="home">
        这是首页
        <HomeExperimentsListVue />
    </div>
</template>

<script>
import HomeExperimentsListVue from './HomeExperimentsList.vue'

export default {
    name: 'Home',
    components: { HomeExperimentsListVue },
}
</script>
