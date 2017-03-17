<template>
    <div>
        <mu-date-picker v-model="selectDate" autoOk hintText="选择开始日期"  minDate="2016-09-01" maxDate="2016-12-20" />
    </div>
</template>
<script>
export default {
    data() {
        return {
            selectDate: '1997-03-03'
        }
    }
}
</script>
<style lang="css">
</style>
