<script>

import {useAuth} from "~/composables/auth";

export default {

    data() {
        return {
            posts: [],
            user: null,
            form: {
                title: '',
                content: ''
            },
            delete_id: '',
            items: [
                {label: 'Главная', icon: 'pi pi-fw pi-home', to: '/'},
                {label: 'Posts', icon: 'pi pi-fw pi-list', to: '/posts'},
                {
                    label:'User',
                    icon:'pi pi-fw pi-user',
                    items:[
                        {
                            label:'Login',
                            icon:'pi pi-fw pi-user-plus',
                            command:() => {this.login()},
                            visible: () => !this.check(),
                        },
                        {
                            label:'Logout',
                            icon:'pi pi-fw pi-times',
                            command:() => {this.logout()},
                            visible: () => this.check(),
                        },
                    ]
                }
            ],
        }
    },
    methods: {
        async login() {
            await useApi("login", {
                method: "POST",
                body: {
                    email: "alex@gleb.kz",
                    password: "password",
                },
            })
            await this.auth();
            console.log('login');
        },
        async auth() {
            const response = await useApi("user", {method: "POST"})
            this.user = response.data;
            console.log('auth');
        },
        async logout() {
            await useApi("/logout", {method: "POST"})
            await this.auth();
            console.log('logout');
        },
        async postsView() {
            try {
                const response = await useApi("posts", {method: "POST"})
                this.posts = response.data;
                this.$toast.add({severity:'success', summary: 'Success', detail:'Posts View', life: 5000});
                // console.log('Работает');
            } catch (e) {
                console.log('Ошибка');
            }
            console.log('postView');
        },
        async postCreate() {
            await useApi('/post/create', {
                method: "POST",
                body: {
                    title: this.form?.title,
                    content: this.form?.content
                }
            })
            console.log('postCreate');
        },
        postDelete(id) {
            useApi('post/delete/' + id, {method: "POST"})
            console.log('postDelete');
        },
        postEdit(id) {
            window.location.href = 'edit/' + id;
        },
        check(){
            if(this.user == null){ return false }
            else{ return true }
        },
    },
    async mounted() {
        console.log('mount');
        useAuth();
        // await useApi("user", {method: "POST"})
        // this.postsView();
    },
}
</script>

<template>
    <div class="pb-5">
        <Menubar :model="items">
            <template #end>
                <i class="pi pi-user mr-2"></i>
                <a class="pr-5">{{ user?.name }}</a>
            </template>
        </Menubar>
    </div>
    <p class="capitalize">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
    <div class="flex flex-column card-container green-container m-2">
        <Accordion>
            <AccordionTab header="Добавить статью">
                <div class="grid align-items-center justify-content-center">
                    <form @submit.prevent="postCreate" align="center">
                        <InputText id="title" type="text" placeholder="title" v-model="form.title"/>
                        <br><br>
                        <InputText v-model="form.content" type="text" placeholder="content" align="center"/>
                        <br><br>
                        <input type="submit" class="p-button pd-3" value="Отправить">
                    </form>
                </div>
            </AccordionTab>
        </Accordion>
    </div>
    <!--    PrimeVue-->
    <div class="flex flex-column card-container green-container">
        <div class="p-datatable p-component p-datatable-responsive-scroll" data-scrollselectors=".p-datatable-wrapper"
        >
            <button class="p-button" @click="postsView">Список статей</button>
            <div class="p-datatable-wrapper">
                <table role="table" class="p-datatable-table " align="center">
                    <thead class="p-datatable-thead" role="rowgroup">
                    <tr role="row">
                        <th class="p-sortable-column" tabindex="0" role="columnheader" aria-sort="none"
                            style="min-width: 12rem;">
                            <div class="p-column-header-content"><span class="p-column-title">ID</span><span
                                class="p-sortable-column-icon pi pi-fw pi-sort-alt"></span></div>
                        </th>
                        <th class="p-sortable-column" tabindex="0" role="columnheader" aria-sort="none"
                            style="min-width: 16rem;">
                            <div class="p-column-header-content"><span class="p-column-title">Title</span><span
                                class="p-sortable-column-icon pi pi-fw pi-sort-alt"></span></div>
                        </th>
                        <th class="p-sortable-column" tabindex="0" role="columnheader" aria-sort="none"
                            style="min-width: 10rem;">
                            <div class="p-column-header-content"><span
                                class="p-column-title">Content</span><span
                                class="p-sortable-column-icon pi pi-fw pi-sort-alt"></span></div>
                        </th>
                        <th class="p-sortable-column" tabindex="0" role="columnheader" aria-sort="none"
                            style="min-width: 10rem;">
                            <div class="p-column-header-content">
                                <span class="p-column-title">Settings</span>
                            </div>
                        </th>
                    </tr>
                    </thead>
                    <tbody class="p-datatable-tbody" role="rowgroup" v-for="post in posts">
                    <tr class="" tabindex="-1" role="row">
                        <td class="" role="cell" style="min-width: 12rem;">{{ post.id }}</td>
                        <td class="" role="cell" style="min-width: 16rem;">{{ post.title }}</td>
                        <td class="" role="cell" style="min-width: 10rem;">{{ post.content }}</td>
                        <td class="" role="cell" style="min-width: 8rem;">
                            <button
                                class="p-button p-component p-button-icon-only p-button-rounded p-button-success mr-2"
                                type="button" data-v-cf5a35eb=""><span class="pi pi-pencil p-button-icon"
                                                                       @click="postEdit(post.id)"></span><span
                                class="p-button-label">&nbsp;</span><span class="p-ink" role="presentation"
                                                                          aria-hidden="true"></span></button>
                            <button class="p-button p-component p-button-icon-only p-button-rounded p-button-warning"
                                    type="button" @click="postDelete(post.id)"><span
                                class="pi pi-trash p-button-icon"></span><span class="p-button-label">&nbsp;</span>
                                <span class="p-ink" role="presentation" aria-hidden="true"></span></button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="flex flex-wrap align-items-center justify-content-center card-container">
        <p align="center" class="capitalize pt-4">Footer</p>
    </div>
    <p>{{this.$config.apiBase}}</p>
    <ToastService />
</template>
