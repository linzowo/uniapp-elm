// 过滤器 mixin

export const filtersMixin = {
  filters: {
    imgUrlFilter(origin, resize = "w_130,h_130,m_fixed") {
      return (
        "https://cube.elemecdn.com/" +
        origin[0] +
        "/" +
        origin.slice(1, 3) +
        "/" +
        origin.slice(3) +
        "." +
        (origin.slice(-3) == "png" ? "png" : origin.slice(-4)) +
        "?x-oss-process=image/format,webp/resize," +
        resize
      );
    },
    userAvatarUrlFilter(imgHash,size='w_30,h_30,m_fixed'){
      
      if(imgHash){
        return 'https://cube.elemecdn.com/' + imgHash[0] + '/' + imgHash.slice(1, 3) + '/' + imgHash.slice(3) + '.' + (imgHash.slice(-3) == 'png' ? 'png' : imgHash.slice(-4)) +'?x-oss-process=image/format,webp/resize,' + size;
      }else{
        return '//shadow.elemecdn.com/faas/h5/static/sprite.3ffb5d8.png';
      }
    },
    rating2text(rating){
      let ratingTextList = ['吐槽','较差','一般','很好','超赞'];
      
      return ratingTextList[parseInt(rating)-1];
    }
  },
};
