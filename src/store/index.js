import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);
const apiPre = '/shenlai_manager/';
// 先写个假数据
const state = {
    base: {
        url: apiPre
    },
    api: {
        getImgCode: apiPre + 'parter/captchaCode?r=' + new Date().getTime(),
        getMobileCode: apiPre + 'parter/mobileCode',
        getCards: apiPre + 'parter/myCard',
        productList: apiPre + 'product/toProductList',//购买房卡列表
        buyCardPay: apiPre + 'order/add',//获取购买链接
        outProductList: apiPre + 'product/toUserProductList',//外部购买房卡列表
        outBuyCardPay: apiPre + 'assistOrder/add',//外部获取购买链接
        loginOut: apiPre + 'parter/loginOut',//退出
        myMsg: apiPre + 'parter/toEditInfo',//获取我的信息
        searchPlayer: apiPre + 'sale/search', //玩家充值搜索好友
        getSellCards: apiPre + 'sale/querySaleList',//售卡详情
        getPromoterList: apiPre + 'parter/parterList',//获取推广员列表
        addPromoter: apiPre + 'parter/parterAdd',// 添加推广员
    },
    reg: {
        mobile: /^1[0-9]{10}$/,
        number: /^[0-9]+$/,
        codeLenth: 4
    },
    throttle: function(fn, delay, atleast) {
        var timer = null;
        var previous = null;
        return function() {
            var now = +new Date();

            if (!previous) previous = now;
            if (atleast && now - previous > atleast) {
                fn();
                previous = now;
                clearTimeout(timer);
            } else {
                clearTimeout(timer);
                timer = setTimeout(function() {
                    fn();
                    previous = null;
                }, delay);
            }
        }
    },
    totalTime: 0,
    list: [{
        name: '二哲',
        avatar: 'https://sfault-avatar.b0.upaiyun.com/147/223/147223148-573297d0913c5_huge256',
        date: '2016-12-25',
        totalTime: '6',
        comment: '12 月 25 日完善，陪女朋友一起过圣诞节需要 6 个小时'
    }]
};

export default new Vuex.Store({
    state,
    mutations,
    actions
})
