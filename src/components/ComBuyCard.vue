<template>
    <div>
        <div class="widget-box widget-color-blue ui-sortable-handle" id="widget-box-2">
            <div class="widget-header">
                <h5 class="widget-title bigger lighter">
                购买房卡                                        
            </h5>
            </div>
            <div class="widget-body">
                <div class="widget-main no-padding">
                    <table id="table" class="table  table-hover">
                        <thead class="thin-border-bottom">
                            <tr>
                                <th>
                                    房卡类型
                                </th>
                                <th>
                                    价格
                                </th>
                                <th>购买</th>
                                <th>vip商品</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr :class="{warning: item.vip}" v-for="item in items">
                                <td class="">{{item.name}}</td>
                                <td>
                                    {{item.price}}
                                </td>
                                <td>
                                    <button :disabled="item.vip===1&&!vip" @click="goPay(item.id)" class="btn btn-primary btn-sm">购买</button>
                                </td>
                                <td>
                                    <span class="btn btn-danger btn-xs" v-if="item.vip">vip商品</span>
                                    <span v-else>普通商品</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="alert alert-info">
            <i class="ace-icon fa fa-hand-o-right"></i>
            <em class="red">金牌代理</em> 永久享有0.7元/张房卡的VIP购买权。
            <span v-if="!vip">您只要再发展<em class="red">{{beVip}}</em>个普通代理，就可以晋升为<em class="red">金牌代理</em></span>
        </div>
        <div class="well">
            <h4 class="green smaller lighter">普通代理升级为金牌代理，您只需：</h4> <p>1. 发展5个普通代理，注册时填写您的ID</p>
            <p>2. 您发展的代理首次购卡成功</p>
            <p>3. 享受最低折扣，坐享最高收益</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ComBuyCard',
    data() {
        return {
            items: [{
                // name: 'aaa',
                // price: 'aa',

            }],
            vip: false,
            beVip: '',
        }
    },
    mounted() {
        var url = this.$store.state.api.productList;
        var that = this;
        $.ajax({
            url: url,
            dataType: 'json',
            type: 'get',
            data: {
                size: 100
            },
            success: function(res) {
                if (res.code === '10000') {
                    that.items = res.res.results;
                    if (res.res.vip) {
                        that.vip = true
                    } else {
                        that.vip = false
                        that.beVip = res.res.paycount
                    }
                }
            },
            error: function(data, error) {
                console.log(error);
            }
        });
    },
    methods: {
        goPay(id) {
            var url = this.$store.state.api.buyCardPay;
            var that = this;
            $.ajax({
                type: "POST",
                url: url,
                dataType: 'json',
                data: {
                    product: id
                },
                success: function(data) {
                    console.log(data);
                    window.location.href = data.res.payUrl;
                    return;
                    if (data.code != null && data.code != 10000) {
                        layer.msg('异常，请刷新页面重新支付');
                        return;
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    alert("下单失败,请稍后重试.textStatus=" + textStatus + "; errorThrown=" + errorThrown);
                    return;
                }
            });
        }
    }
}
</script>
<style scope>
#table tr td {
    vertical-align: middle;
}
.well p{
    margin-bottom: 0;
}
</style>
