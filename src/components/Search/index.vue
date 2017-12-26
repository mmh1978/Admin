<template>
  <el-input placeholder="输入内容" v-model="input5" class="input-with-select">
    <el-select v-model="select" slot="prepend" :placeholder="message">
      <el-option v-for="item in optionValue" :label="item.opti" :value="item.val"></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search" @click="searchClick"></el-button>
  </el-input>
</template>

<script>
export default {
  name: "MySearch",
  props: ['message', 'optionValue'],
	data() {
	  return {
      input5: '',
      select: ''
	  }
  },
  methods: {
  	searchClick() {
  		this.$emit('searchClick',this.select, this.input5);
  	}
  }
}
</script>

<style>
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>