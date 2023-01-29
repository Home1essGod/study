<script>
export default {
    data() {
        return {
            posts: [],
            comments: [],
            comment: '',
            messages: [
                {severity: 'success', content: 'Dynamic Success Message'},
                {severity: 'error', content: 'Dynamic Warning Message'}

            ],
        }
    },
    methods: {
         async postsView(){
                const response = await useApi("posts", {method: "POST"})
                this.posts = response.data;
                console.log('postView');
                this.commentsView();
        },
        async commentsView(){
            const response = await useApi('comments', {
                method: "POST",
                body: {post_id: 4}
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
    }
}
</script>

<template>
    <div class="card">
        <Panel header="Header">
            <div class="flex">
                <div class="flex-1 flex align-items-right justify-content-right bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
                </div>
                <div class="flex-1 flex align-items-center  bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
                    <h2 class="mr-4">Posts</h2>
                    <Button @click="postsView" label="Показать" />
                </div>
            </div>
        </Panel>
    </div>
    <div class="flex-1 align-items-center justify-content-center m-2 px-5 py-3 border-round scalein animation-duration-300" v-for="(post, index) in posts">
        <Card class="bg-yellow-500">
            <template #title>
                {{ index+1 }} {{ post?.title }}
            </template>
            <template #content>
                {{ post?.content }}
            </template>
            <template #footer>
                <div v-if="comments != ''" v-for="comment in comments">
                    <Fieldset class="bg-yellow-200 mt-3">
                        <template #legend>
                            {{ comment?.user_name }}
                        </template>
                        {{ comment?.body }}
                        <p align="right">{{comment.created_at.substr(0, 10)}}</p>
                    </Fieldset>
                </div>
                <div>
                    <p><InputText type="text" name="comment" placeholder="comment" v-model="comment" id="comment"/></p>
                    <Button icon="pi pi-comments" label="Add Comment" class="mt-1"/><Message v-for="msg of messages" :severity="msg.severity" :key="msg.content">{{msg.content}}</Message>
                </div>
            </template>
        </Card>
    </div>
<!--    <Paginator :first="dq" :rows="2" :totalRecords="posts.length"></Paginator>-->
<!--    <Terminal class="bg-black-alpha-90 text-white" welcomeMessage="Welcome to Debian" prompt="debian $" />-->
</template>
