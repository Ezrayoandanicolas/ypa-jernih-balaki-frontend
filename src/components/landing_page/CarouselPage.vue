<script>
import { mapActions } from "vuex";

export default {
    name: 'Carousel-Page',
    data: () => ({
        images: [],
        showImage: true,
        img: '',
    }),
    async mounted() {
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

        try {
            await this.RetrieveSlide().then((res) => {
                if (res.data.length == 0) {
                    this.images = null
                } else {
                    res.data.forEach(el => {
                        this.images.push(el.value)
                    });
                }
                
            }).catch(() => {
                console.log('Error Ges')
            })
        } catch (err) {
            console.log(err)
        }
    },
    methods: {
        ...mapActions({
            RetrieveSlide: 'retrieveSlide',
        }),
    }
}
</script>

<template>
    <div class="carousel-page">
        <div class="relative slide">
            <div class="carousel-inner relative overflow-hidden w-full h-[calc(100vh-73px)] max-sm:h-[calc(100%-73px)]">
                <transition enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut" mode="out-in">
                    <img v-show="showImage" class="w-full bg-cover bg-no-repeat bg-fixed bg-center brightness-90" :src="img ? img : images[0]" alt="First slide" />
                </transition>
            </div>

        </div>        
    </div>
</template>