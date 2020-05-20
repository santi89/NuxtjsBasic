import Vuex from "vuex"
import axios from "axios"

const createStore=()=>{
    return new Vuex.Store({
        state:{
            // ข้อมูล
            loadData:[]
        },
        mutations:{
            // จัดการข้อมูลใน State
            setPostState(state,posts){
                state.loadData=posts
            },
            addPostState(state,post){
                state.loadData.push(post)
            },
            editPostState(state,editpost){
                const postIndex=state.loadData.findIndex(
                    post=>post.id === editpost.id
                )
                state.loadData[postIndex]=editpost
            }
        },
        actions:{
            //ทำงานร่วมกับ backend เรียกใช้ผ่าน component
            nuxtServerInit(vuexContext,context){
                return axios.get("https://nuxt-tutorial-15e26.firebaseio.com/posts.json")
                .then(res=>{
                    const data=[];
                    for(const key in res.data){
                        data.push({...res.data[key],id:key})
                    }
                    vuexContext.commit("setPostState",data)
                }).catch(e=>context.error(e));
            },
            addPost(vuexContext,post){
                //รับค่าที่ส่งมาจากการใช้คำสั่ง dispatch
                const createPost={...post}
                return axios.
                    post("https://nuxt-tutorial-15e26.firebaseio.com/posts.json",createPost)
                    .then(res=>{
                        vuexContext.commit("addPostState",{...createPost,id:res.data.name})
                })
            },
            editPost(vuexContext,post){
                return axios.
                    put("https://nuxt-tutorial-15e26.firebaseio.com/posts/"+post.id+".json",post)
                    .then(res=>{
                        // commit mutation
                    vuexContext.commit("editPostState",post)
                })
            }
        },
        getters:{
            // นำ state ไปใช้งาน
            getAllPosts(state){
                return state.loadData
            }
        }
    });
};
export default createStore