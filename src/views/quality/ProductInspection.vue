<template>
  <div class="product-inspection">
    <PanelTool>
      <el-table
      max-height="500"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        fixed
        label="编号">
      </el-table-column>
      <el-table-column
        label="流水号">
      </el-table-column>
      <el-table-column
        label="计划编号">
      </el-table-column>
      <el-table-column
        label="完工单号">
      </el-table-column>
      <el-table-column
        label="作业名称">
      </el-table-column>
      <el-table-column
        label="生产线名称">
      </el-table-column>
      <el-table-column
        label="检验批次">
      </el-table-column>
      <el-table-column
        label="产品名称">
      </el-table-column>
      <el-table-column
        label="生产日期">
      </el-table-column>
      <el-table-column
        label="检验项">
      </el-table-column>
      <el-table-column
        label="生产数量">
      </el-table-column>
      <el-table-column
        label="抽检数量">
      </el-table-column>
      <el-table-column
        label="检验值">
      </el-table-column>
      <el-table-column
        label="阈值上限">
      </el-table-column>
      <el-table-column
        label="阈值下限">
      </el-table-column>
      <el-table-column
        label="检验结果">
      </el-table-column>
      <el-table-column
        label="检验人">
      </el-table-column>
      <el-table-column
        label="检验时间 ">
      </el-table-column>
      <el-table-column
       fixed="right"
      label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)"> 修改 </el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    </PanelTool>
  </div>
</template>

<script>
import PanelTool from '@components/panel/index.vue'
export default {
  name: "ProductInspection",
  components:{
    PanelTool
  },  
  methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
}
</script>

<style scoped>
.product-inspection {
  padding: 20px;
}
</style> 