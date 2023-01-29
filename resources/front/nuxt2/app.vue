<script>
export default {
    async mounted(){
        await useApi("user", {method: "POST"})
    },
}
</script>

<template>
    <div>
        <!-- Markup shared across all pages, ex: NavBar -->
        <NuxtPage />
    </div>
</template>
