<script>
import { RouterLink, RouterView } from 'vue-router'


export default {
    components: {
        RouterLink,
        RouterView,

    },
    mounted() {
        
    }
}
</script>

<template>
     <!-- Content -->
    <div class="container-xxl">
        <div class="authentication-wrapper authentication-basic container-p-y">
            <div class="authentication-inner">
                <!-- Register -->
                <div class="card">
                    <div class="card-body">
                        <slot />
                    </div>
                </div>
                <!-- /Register -->
            </div>
        </div>
    </div>
    <!-- / Content -->
</template>
