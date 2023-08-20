<script>
export default {
    name: 'Carousel-Page',
    data: () => ({
        images: [
            "http://127.0.0.1:8000/slide/images/foto-1.jpg",
            "http://127.0.0.1:8000/slide/images/foto-2.jpg",
            "http://127.0.0.1:8000/slide/images/foto-3.jpg",
            "http://127.0.0.1:8000/slide/images/foto-4.jpg"
        ],
        showImage: true,
        img: '',
    }),
    mounted() {
        let i = 0;
        // get Default Slide Image
        setTimeout(() => {
            this.img = this.images[this.images.length - 1];
        }, 100)

        // Change Slide Image Every 
        setInterval(() => {
            if (i > this.images.length - 1) {
                i = 0;
            }
            this.showImage = !this.showImage
            
            setTimeout(() => {
                this.showImage = !this.showImage
                this.img = this.images[i]
            }, 500)
            i++;
        }, 10000);
    }
}
</script>

<template>
    <div class="carousel-page">
        <div class="relative slide">
            <!-- <div class="carousel-indicators absolute bottom-0 flex h-24 w-full justify-center items-center">
                <ol class="z-50 flex w-4/12 justify-center">
                    <li v-for="(img, i) in images" :key="i" class="md:w-4 md:h-4 bg-gray-300 rounded-full cursor-pointer mx-2"></li>
                </ol>
            </div> -->
            <div class="carousel-inner relative overflow-hidden w-full h-[calc(100vh-73px)]">
                <transition enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut" mode="out-in">
                    <img v-show="showImage" class="w-full bg-cover bg-no-repeat bg-fixed bg-center brightness-90" :src="img ? img : images[0]" alt="First slide" />
                </transition>
            </div>

        </div>        
    </div>
</template>