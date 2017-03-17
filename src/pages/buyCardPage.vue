<template>
    <div class="container">
        <div class="widget-box widget-color-blue ui-sortable-handle" id="widget-box-2">
            <div class="widget-header">
                <h5 class="widget-title bigger lighter">
                	购买房卡                                        
            	</h5>
                <p>玩家您好，房卡3元/张。 申请成为代理，即可享受超低价格及多种返赠。
                </p>
            </div>
            <div class="widget-body">
                <div class="widget-main no-padding">
                    <form class="form-horizontal">
                        <!-- <legend>Form</legend> -->
                        <fieldset>
                            <div class="col-xs-12">
                                <div class="form-group">
                                    <label class="control-label">玩家ID</label>
                                    <input v-model="userId" type="text" placeholder="玩家ID">
                                </div>
                                <div class="form-group">
                                    <label class="control-label">玩家昵称</label>
                                    <input v-model="userName" disabled type="text" placeholder="玩家昵称">
                                </div>
                                <div class="form-group">
                                    <label class="control-label">剩余卡量</label>
                                    <input v-model="restCard" disabled type="text" placeholder="剩余卡量">
                                </div>
                            </div>
                        </fieldset>
                    </form>
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
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in items">
                                <td class="">{{item.name}}</td>
                                <td>
                                    {{item.price}}
                                </td>
                                <td>
                                    <button @click="goPay(item.id)" class="btn btn-primary btn-sm">购买</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'buyCardPage',
    data() {
        return {
            items: [{
                // name: 'aaa',
                // price: 'aa',

            }],
            userId: '',
            userName: '',
            restCard: '',
        }
    },
    mounted() {
        var url = this.$store.state.api.outProductList;
        var that = this;
        $.ajax({
            url: url,
            dataType: 'json',
            type: 'get',
            data: {
                size: 100
            },
            success: function(res) {
                // console.log(res);
                if (res.code === '10000') {
                    that.items = res.res.results;
                } else {
                    layer.msg(res.message);
                }
            },
            error: function(data, error) {
                console.log(error);
            }
        });
        //获取头部信息
        var hash = window.location.hash; //获取url中"?"符后的字串 
        if (hash.indexOf('?')) {
            var paras = hash.slice(hash.indexOf('?') + 1).split('&');
            var user = {};
            for (var i = 0; i < paras.length; i++) {
                user[paras[i].split("=")[0]] = unescape(paras[i].split("=")[1]);
            }
            console.log(user);
            if(user.id){
            	this.userId = user.id
            }
            if(user.name){
            	this.userName = user.name
            }
            if(user.card){
            	this.restCard = user.card
            }
        }
    },
    methods: {
        goPay(id) {
            var url = this.$store.state.api.outBuyCardPay;
            var that = this;
            $.ajax({
                type: "POST",
                url: url,
                dataType: 'json',
                data: {
                    product: id,
                    userId: this.userId
                },
                success: function(data) {
                    if (data.code && data.code !== '10000') {
                        layer.msg('用户id不存在，请重新输入');
                        return;
                    }
                    window.location.href = data.res.payUrl;
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
<style scoped>
#table tr td {
    vertical-align: middle;
}

.form-group label {
    width: 80px;
    text-align: left;
}

html body {
    background: #fff;
}
</style>
