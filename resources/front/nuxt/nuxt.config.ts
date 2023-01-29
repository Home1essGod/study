// https://nuxt.com/docs/api/configuration/nuxt-config
// export default defineNuxtConfig({
//
// })
export default defineNuxtConfig({
    // ...
    ssr: false,

    routeRules: {
        '/account/**': { ssr: false },
        '/auth/**': { ssr: false }
    },

    modules: [
        'nuxt-sanctum-auth'
        // ...
    ],
    nuxtSanctumAuth: {
        baseUrl: 'http://gleb.dev.local',
        endpoints: {
            csrf: 'api/csrf-cookie',
            login: 'api/login',
            logout: 'api/logout',
            user: 'api/user'
        },
        redirects: {
            home: '/account',
            login: '/auth/login',
            logout: '/'
        }
    }
})
