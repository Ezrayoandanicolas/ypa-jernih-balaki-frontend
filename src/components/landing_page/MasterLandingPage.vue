<script>
import CarouselPage from "./CarouselPage.vue";
import ArticlePage from "./ArticlePage.vue";
import ProgramPage from "./ProgramPage.vue";
import DonasiPage from "./DonasiPage.vue";
import FasilitasPage from "./FasilitasPage.vue";
export default {
  created () {
  },
    name: 'Master-Landing-Page',
    components: {
        CarouselPage,
        ArticlePage,
        ProgramPage,
        DonasiPage,
        FasilitasPage,
    }
    
}
</script>

<template>
    <div class="master-landing-page">
        <section id="carousel-page" class="relative">
            <carousel-page></carousel-page>
        </section>
        <section id="article-page" class="relative">
            <article-page></article-page>
        </section>
        <section id="program-page" class="relative">
            <program-page></program-page>
        </section>
        <section id="donasi-page" class="relative">
            <donasi-page></donasi-page>
        </section>
        <section id="fasilitas-page" class="relative">
            <fasilitas-page></fasilitas-page>
        </section>
    </div>
</template>