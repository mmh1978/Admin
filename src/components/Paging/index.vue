<template>
  <div class="block user-block">
	  <el-pagination
	  	class="is-background"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[5, 10, 20, 30]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
	</div>
</template>

<script>
  export default {
  	name: 'Paging',
  	props: ['total'],
  	methods: {
      handleSizeChange(val) {
      	this.$emit('getSize', val);
  	  },
  	  handleCurrentChange(val) {
  	  	this.$emit('getPage', (val-1));
  	  }
    },
    data() {
  	  return {
      	currentPage4: 1
      };
    }
  }
</script>

<style>
	.user-block {
		display: inline-block;
	}
</style>