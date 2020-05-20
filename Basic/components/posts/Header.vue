<template>
    <div>
        <b-carousel id="slider" 
        controls
        indicators
        >
        <div v-for="item in items"> 
        <b-carousel-slide
          :caption=item.caption
          :text=item.text
          :img-src=item.image
        ></b-carousel-slide>
        </div>
    </b-carousel>
    </div>
</template>
<script>
export default {
    data(){
      return{
        items:[
          {caption:"ท่องเที่ยวทะเล",image:require("@/assets/image/p1.jpg"),text:"Nulla vitae elit libero, a pharetra augue mollis interdum."},
          {caption:"ท่องเที่ยวธรรมชาติ",image:require("@/assets/image/p2.jpg"),text:"Nulla vitae elit libero, a pharetra augue mollis interdum."},
          {caption:"C",image:require("@/assets/image/p3.jpg"),text:"Nulla vitae elit libero, a pharetra augue mollis interdum."},
        ]
      }
    }
}
</script>