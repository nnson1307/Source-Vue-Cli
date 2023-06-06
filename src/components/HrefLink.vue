<script>

export default {
    props: {
        to: {
            type: String,
            required: true
        },
        class: {
            type: String,
            required: null
        },
        icon: {
            type: String,
            default: null
        }
    }
}
</script>

<template>
    <router-link :to="to" :class="class">
        <i class="menu-icon tf-icons bx" :class="icon" v-if="icon != null"></i>
        <slot />
    </router-link>
</template>