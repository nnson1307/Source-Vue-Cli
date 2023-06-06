<script>
import { RouterLink, RouterView } from 'vue-router'
import MenuLink from './MenuLink.vue'

export default {
    components: {
        RouterLink,
        MenuLink,
    },
}
</script>

<template>
    <ul class="menu-inner py-1">
        <!-- Users -->
        <MenuLink to="/user" icon="bx-user-pin">
            Users
        </MenuLink>
    </ul>
</template>