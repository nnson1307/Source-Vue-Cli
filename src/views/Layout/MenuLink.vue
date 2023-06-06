<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
    props: {
        to: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const route = useRoute();

        // const isActive = computed(() => route.path === props.to)

        let isActive = 0

        switch (props.to) {
            case '/user':
                let groupPathUser = ['/user', '/user/create'];    

                if (groupPathUser.includes(route.path)) {
                    isActive = 1;
                }

                break;
        }
        
        return { isActive }
    }
}
</script>

<template>
    <li class="menu-item" :class="{ active: isActive }">
        <router-link :to="to" class="menu-link">
            <i class="menu-icon tf-icons bx" :class="icon"></i>
            <slot />
        </router-link>
    </li>
</template>