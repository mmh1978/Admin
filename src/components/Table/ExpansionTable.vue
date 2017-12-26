<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand" v-if="isExpansion">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item v-for="item in expansionConent" :label="item.expansionHead">
            <span>{{ item.expansionData}}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      v-for="item in tableConent"
      fit
      :key="item.serial"
      :label="item.label"
      :width="item.width"
      :sortable="item.isSortable"
      :show-overflow-tooltip="true">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
  	name: "ExpansionTable",
  	components: {
  		test: {
  			template: "<div>自定义组件</div>"
  		}
  	},
  	props: ['tableData', 'tableConent', 'isExpansion', 'expansionConent'],
  	data() {
  		return {
  			currentView : 'test'
  		}
  	}
  	
  }
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>