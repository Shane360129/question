<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
    <header>
            <RouterLink class="link" to="/back"><button type="button" class="btn btn-light">Home</button></RouterLink>
            <RouterLink class="link" to="/addQuestion"><button type="button" class="btn btn-light">AddQuestion</button></RouterLink>
            <RouterLink class="link" to="/addSubTitleQuestion"><button type="button" class="btn btn-light">AddSubtitleQuestion</button></RouterLink>
            <!-- <RouterLink class="link" to="/addAnswerType"><button type="button" class="btn btn-light">AddAnswerType</button></RouterLink> -->
      </header>
</template>