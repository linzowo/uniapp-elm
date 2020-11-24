export const storeIndexMethodsMixin = {
  methods:{
    /**
     * 点赞商品过滤器，将点赞商品中5星的过滤出来
     * @param {Array} foodList 点赞食品列表
     */
    foodsFilter(foodList){
      // this.$utils.log('foodsFilter','点赞商品过滤器，将点赞商品中5星的过滤出来');
      let res = foodList.filter((ele)=>{
        return ele.rating >= 5;
      });
      return res.length?res:null;
    },
    /**
     * 用户选择开通超级vip
     */
    openSvip(){
      this.$utils.log('openSvip','用户选择开通超级vip');
      uni.navigateTo({
        url:this.$pages_path.member,
        fail(e) {
          console.log('跳转失败:',e);
        }
      })
    }
    ,
    /**
     * 唤起拨号键盘准备打电话给商家
     * @param {String} storeId 商品id
     */
    makePhoneCall(storeId){
      // 模拟查询过程
      setTimeout(()=>{
        let phoneNumber = '123456';

        uni.makePhoneCall({
          phoneNumber,
          fail(e) {
            console.log('唤起失败',e);
            uni.showToast({
              title: '调用电话功能失败请手动呼叫商家',
              icon:'none'
            });
          }
        })
      },200)
    }
    ,
    /**
     * 跳转至店铺资质页
     */
    gotoCertificatesPage(){
      uni.navigateTo({
         url: this.$pages_path.file,
         fail(e) {
           console.log('跳转失败',e);
         }
      });
    }
    ,
  }
}

// export default storeMethodsMixin