<template>
	<el-select v-model="value" :placeholder="message" @change="handleCommand">
		<el-option
		  v-for="item in optionValue"
		  :key="item.val"
		  :command="item.val"
		  :label="item.opti"
		  :value="item.val">
		</el-option>
	</el-select>
</template>

<script>
export default {
  name: "MySelect",
  props: ['message', 'optionValue'],
  data() {
  	return {
  		value : ""
  	}
  },
  methods: {
    handleCommand(command) {
      this.$emit('selectChange', command);
    }
  }
}
</script>

<style>
  .el-dropdown-link {
	cursor: pointer;
	color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>