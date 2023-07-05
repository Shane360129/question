<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
    <header>
            <RouterLink class="link" to="/">Home</RouterLink>
            <RouterLink class="link" to="/front">User</RouterLink>
            <RouterLink class="link" to="/back">Admin</RouterLink>
      </header>
</template>

<style lang="scss" scoped>
header {
    width: 100vw;
    padding: 1rem 4rem;
    background-color: #909090;
    font-size: 2rem;

    .link {
        text-decoration: none;
        color: rgb(255, 255, 255);
        cursor: pointer;
        transition: 0.5s;
        margin: 0 1rem;

        &:hover {
            color: #ff961e;
            ;
        }
    }
}

.local {
    color: #4341b7;
    background-color: rgb(255, 213, 135);
    border-radius: 6px;
}
</style>