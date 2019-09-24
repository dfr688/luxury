<template>
    <div id="imgUploader">
        <div class="file-list">
          <!-- <section class="file-item draggable-item" v-for="(item,index) in files" :key="index"> -->
            <div class="thumbnails my-gallery">
                <figure itemprop="associatedMedia" itemscope  class="thumbnail" v-for="(item,index) in files" :key="index">
                    <a :href="item.src" itemprop="contentUrl" data-size="400x400" class="img-wrapper">
                        <img :src="item.src" itemprop="thumbnail"  />
                        <!-- <div :style="{background:'url('+item.src+')  no-repeat',  backgroundPosition:'center center',backgroundSize:'cover'}" style="width:100%;height:110px;" itemprop="thumbnail"></div> -->
                    </a>
                    <!-- <span class="file-remove" @click="remove(index,$event)">×</span> -->
                </figure>
                <section class="thumbnail" v-if="this.files.length < 3">
                  <div class="add">
                    <!-- accept="image/jpeg,image/png" capture="camera" -->
                    <input type="file" @change="selectImgs()" multiple accept="image/*" ref="file">
                  </div>
                </section>
            </div>
            <!-- <img :src="item.src" alt="" ondragstart="return false;">
            <span class="file-remove" @click="remove(index)">×</span> -->
          <!-- </section> -->
          <!-- PhotoSwipe插件需要的元素， 一定要有类名 pswp -->
          <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
              <div class="pswp__bg"></div>
              <div class="pswp__scroll-wrap">
                  <div class="pswp__container">
                      <div class="pswp__item"></div>
                      <div class="pswp__item"></div>
                      <div class="pswp__item"></div>
                  </div>
                  <!-- 预览区域顶部的默认UI，可以修改 -->
                  <div class="pswp__ui pswp__ui--hidden">
                      <div class="pswp__top-bar">
                          <!--  与图片相关的操作 -->
                          <div class="pswp__counter"></div>
                          <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
                          <!--将分享按钮去掉 -->
                          <!-- <button class="pswp__button pswp__button--share" title="Share"></button>
                          <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
                          <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button> -->
                          <div class="pswp__preloader">
                              <div class="pswp__preloader__icn">
                                  <div class="pswp__preloader__cut">
                                      <div class="pswp__preloader__donut"></div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                          <div class="pswp__share-tooltip"></div>
                      </div>
                      <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
                      <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
                      <div class="pswp__caption">
                          <div class="pswp__caption__center"></div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Pic',
  data(){
		return{
			
		}
  }
}
</script>
<script src="../../assets/js/upload"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#imgUploader {
  flex: 1;
  margin-top: auto;
}
#imgUploader .file-list::after {
  content: "";
  display: block;
  clear: both;
  visibility: hidden;
  line-height: 0;
  height: 0;
  font-size: 0;
}
#imgUploader .file-list .file-remove {
  position: absolute;
  font-size: 12px;
  right: 5px;
  top: 1px;
  width: 14px;
  height: 14px;
  color: white;
  cursor: pointer;
  line-height: 12px;
  background: rgba(0, 0, 0, 0.25);
  z-index: 1000;
	text-align: center;
}
#imgUploader .file-list:hover .file-remove {
  display: inline;
}
.add {
  width: 2.1rem;
  height: 2.1rem;
  background: url(../../assets/images/public/add.png) no-repeat left top;
  background-size: 100%;
  position: relative;
}
.uploadBtn {
  position: relative;
}
.uploadBtn .empty {
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: #eee;
  color: #fff;
  padding: 0.2em 1em;
}
.thumbnails {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}
.thumbnails .thumbnail {
  position: relative;
  margin: 0;
  margin-right: 5px;
  width: 2.1rem;
  height: 2.1rem;
  box-sizing: border-box;
	margin-bottom: .1rem;
}
.thumbnails .thumbnail:last-child{
	margin-right: 0;
}
.thumbnails .thumbnail .img-wrapper {
  position: relative;
  display: flex;
}
.thumbnails .thumbnail .img-wrapper img {
  width: 2.1rem;
  height: 2.1rem;
  max-width: 2.1rem;
  max-height: 2.1rem;
}
input[type="file"] {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
</style>
