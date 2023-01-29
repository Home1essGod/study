<script>

export default {
    data() {
        return {
            id: this.$route.params.id,
            post: '',
            form: {
                title: '',
                content: ''
            },
            comment: '',
            comments: [],
        }
    },
    methods: {
        async getPost() {
            const response = await useApi('post/' + this.id, {method: "POST"})
            this.post = response.data;
            console.log(response.info);
        },
        updatePost(form) {
            useApi('post/update', {
                method: "POST",
                body: {
                    id: this.id,
                    title: form.title,
                    content: form.content,
                },
            })
        },
        async commentsView(){
            const response = await useApi('comments', {
                method: "POST",
                body: {post_id: this.id}
            })
            this.comments = response.data;
            console.log(this.comments);
        },
        commentCreate(comment){
            response = useApi('comment/create', {
                method: "POST",
                body: {
                    post_id: this.id,
                    body: comment,
                }
            })
        },
    },
    mounted() {
        // this.getPost()
    }
}

</script>

<template>
    <div class="card">
        <p class="text-base w-10">Edit - {{ id }}</p>
        <button @click="getPost()">Показать</button>
        <div>
            <form @submit.prevent="updatePost(form)">
                <p>Title: {{post[0]?.title}} <input type="title" name="title" placeholder="title" v-model="form.title" id="title"></p>
                <p>Content: {{post[0]?.content}} <input type="content" name="content" placeholder="content" v-model="form.content" id="content"></p>
                <input type="submit" value="Обновить">
            </form>
        </div>
        <hr>
        <div>
            <form @submit.prevent="commentCreate(comment)">
                <Textarea v-model="comment" :autoResize="false" placeholder="comment" rows="5" cols="30"/>
                <br>
                <input class="p-button" type="submit" value="Добавить комментарий">
            </form>
            <h3>Комментарии</h3>
            <button class="p-button" @click="commentsView">Список комментариев</button>
        </div>
        <br>
        <div v-for="comment in comments">
        <Fieldset :legend="comment.user_name">
            {{comment.body}}
            <p align="right">{{comment.created_at.substr(0, 10)}}</p>
        </Fieldset>
        </div>
    </div>
</template>
