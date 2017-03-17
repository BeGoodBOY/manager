<template>
    <div>
        <div class="page-header">
            <h1>我的代理<router-link class="btn btn-primary small red pull-right" to="/home/add-promoter">添加推广员</router-link></h1>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <div class="widget-box widget-color-blue ui-sortable-handle">
                    <div class="widget-header">
                        <h5 class="widget-title bigger lighter">
                            我的代理
                        </h5>
                    </div>
                    <div class="widget-body">
                        <table id="table" class="table  table-hover">
                            <thead class="thin-border-bottom">
                                <tr>
                                    <th>
                                        昵称
                                    </th>
                                    <th>
                                        推广员ID
                                    </th>
                                    <th>手机号</th>
                                    <th>加入时间</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in items">
                                    <td class="">{{item.nickName}}</td>
                                    <td>
                                        {{item.id}}
                                    </td>
                                    <td>
                                        {{item.mobile}}
                                    </td>
                                    <td>
                                        {{item.atime}}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import Date from '../components/Date'

export default {
    data() {
            return {
                items: [{
                    nickName: '',
                    id: '',
                    mobile: '',
                    atime: ''
                }],
            }
        },
        mounted() {

            var url = this.$store.state.api.getPromoterList;
            var that = this;
            $.ajax({
                url: url,
                type: 'post',
                dataType: 'json',
                success: function(res) {
                    console.log(res);
                    if (res.code === '10000') {
                        that.items = res.res.results;
                    }else{
                        layer.msg(res.message);
                    }
                },
                error: function(data, status) {
                    layer.msg(status);
                }

            });

        }
}
</script>
<style scoped>
.lh_10 {
    min-height: 10px;
    width: 1px;
    clear: both;
}

#simple-table>tbody>tr>td {
    vertical-align: middle;
    min-height: 50px;
}

.widget-box {
    margin-top: 20px;
}
</style>
