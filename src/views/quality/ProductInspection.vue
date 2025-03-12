<template>
  <div class="product-inspection">
    <PanelTool>
      <!-- 搜索表单 -->
      <div class="search-form">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="100px">
          <el-form-item label="流水号" prop="serialNo">
            <el-input v-model="queryParams.serialNo" placeholder="请输入流水号" clearable />
          </el-form-item>
          <el-form-item label="完工单号" prop="productFinishNo">
            <el-input v-model="queryParams.productFinishNo" placeholder="请输入完工单号" clearable />
          </el-form-item>
          <el-form-item label="计划编号" prop="productPlanNo">
            <el-input v-model="queryParams.productPlanNo" placeholder="请输入计划编号" clearable />
          </el-form-item>
          <el-form-item label="作业名称" prop="productJobName">
            <el-input v-model="queryParams.productJobName" placeholder="请输入作业名称" clearable />
          </el-form-item>
          <el-form-item label="产品名称" prop="materialName">
            <el-input v-model="queryParams.materialName" placeholder="请输入产品名称" clearable />
          </el-form-item>
          <el-form-item label="检验批次" prop="materialBatchNo">
            <el-input v-model="queryParams.materialBatchNo" placeholder="请输入检验批次" clearable />
          </el-form-item>
          <el-form-item label="生产日期" prop="productDate">
            <el-date-picker
              v-model="dateRange.productDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy/MM/dd"
              @change="handleProductDateChange"
            />
          </el-form-item>
          <el-form-item label="检验项" prop="checkItemName">
            <el-input v-model="queryParams.checkItemName" placeholder="请输入检验项" clearable />
          </el-form-item>
          <el-form-item label="检验结果" prop="checkResult">
            <el-select v-model="queryParams.checkResult" placeholder="请选择检验结果" clearable>
              <el-option label="合格" value="1" />
              <el-option label="不合格" value="0" />
            </el-select>
          </el-form-item>
          <el-form-item label="检验人" prop="checkUser">
            <el-input v-model="queryParams.checkUser" placeholder="请输入检验人" clearable />
          </el-form-item>
          <el-form-item label="检验时间" prop="checkDate">
            <el-date-picker
              v-model="dateRange.checkDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy/MM/dd"
              @change="handleCheckDateChange"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div>
        <el-button @click="handleAdd" type="primary">
          新增
        </el-button>
      </div>
      <div>
        <el-table
        v-loading="loading"
        max-height="500"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="id"
          fixed
          label="编号">
        </el-table-column>
        <el-table-column
          prop="serialNo"
          label="流水号">
        </el-table-column>
        <el-table-column
          prop="productPlanNo"
          label="计划编号">
        </el-table-column>
        <el-table-column
          prop="productFinishNo"
          label="完工单号">
        </el-table-column>
        <el-table-column
          prop="productJobName"
          label="作业名称">
        </el-table-column>
        <el-table-column
          prop="productLineName"
          label="生产线名称">
        </el-table-column>
        <el-table-column
          prop="materialBatchNo"
          label="检验批次">
        </el-table-column>
        <el-table-column
          prop="materialName"
          label="产品名称">
        </el-table-column>
        <el-table-column
          prop="productDate"
          label="生产日期">
        </el-table-column>
        <el-table-column
          prop="checkItemName"
          label="检验项">
        </el-table-column>
        <el-table-column
          prop="productQuantity"
          label="生产数量">
        </el-table-column>
        <el-table-column
          prop="checkQuantity"
          label="抽检数量">
        </el-table-column>
        <el-table-column
          prop="checkValue"
          label="检验值">
        </el-table-column>
        <el-table-column
          prop="maxValue"
          label="阈值上限">
        </el-table-column>
        <el-table-column
          prop="minValue"
          label="阈值下限">
        </el-table-column>
        <el-table-column
          prop="checkResult"
          label="检验结果">
          <template slot-scope="scope">
            <el-tag :type="scope.row.checkResult === '1' ? 'success' : 'danger'">
              {{ scope.row.checkResult === '1' ? '合格' : '不合格' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="checkUser"
          label="检验人">
        </el-table-column>
        <el-table-column
          prop="checkDate"
          label="检验时间">
        </el-table-column>
        <el-table-column
        fixed="right"
        label="操作"
        width="150px"
        >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
        </el-table>
      </div>
    </PanelTool>

    <add-dialog
      :visible.sync="addDialogVisible"
      :tableData="tableData"
      @close="handleAddClose"
      @submit="handleAddSubmit"
    />

    <edit-dialog
      :visible.sync="editDialogVisible"
      :tableData="tableData"
      :row-data="currentRow"
      @submit="handleEditSubmit"
    />
  </div>
</template>

<script>
import PanelTool from '@components/panel/index.vue'
import { getProductCheckList, updateProductCheck, removeProductCheck, addProductCheck } from '@/api/mes/quality.js'
import AddDialog from './components/AddDialog.vue'
import EditDialog from './components/EditDialog.vue'

export default {
  name: "ProductInspection",
  components: {
    PanelTool,
    AddDialog,
    EditDialog
  },
  data() {
    return {
      // 查询参数
      queryParams: {
        serialNo: '',           // 流水号
        productFinishNo: '',    // 完工单号
        productPlanNo: '',      // 计划编号
        productJobName: '',     // 作业名称
        materialName: '',       // 产品名称
        materialBatchNo: '',    // 检验批次
        checkItemName: '',      // 检验项
        checkResult: '',        // 检验结果
        checkUser: '',          // 检验人
        checkDateStart: '',     // 检验时间开始
        checkDateEnd: '',       // 检验时间结束
        productDateStart: '',   // 生产日期开始
        productDateEnd: '',     // 生产日期结束
        params: {}             // 额外参数
      },
      // 日期范围
      dateRange: {
        productDate: [],
        checkDate: []
      },
      // 原有的数据
      tableData: [],
      loading: false,
      addDialogVisible: false,
      editDialogVisible: false,
      currentRow: null
    }
  },
  created() {
    this.init()
  },
  methods: {
    // 处理生产日期变化
    handleProductDateChange(dates) {
      if (dates) {
        this.queryParams.productDateStart = dates[0]
        this.queryParams.productDateEnd = dates[1]
      } else {
        this.queryParams.productDateStart = ''
        this.queryParams.productDateEnd = ''
      }
    },
    // 处理检验时间变化
    handleCheckDateChange(dates) {
      if (dates) {
        this.queryParams.checkDateStart = dates[0]
        this.queryParams.checkDateEnd = dates[1]
      } else {
        this.queryParams.checkDateStart = ''
        this.queryParams.checkDateEnd = ''
      }
    },
    // 搜索按钮点击
    handleQuery() {
      this.init()
    },
    // 重置按钮点击
    resetQuery() {
      this.$refs.queryForm.resetFields()
      this.dateRange.productDate = []
      this.dateRange.checkDate = []
      this.queryParams = {
        serialNo: '',           // 流水号
        productFinishNo: '',    // 完工单号
        productPlanNo: '',      // 计划编号
        productJobName: '',     // 作业名称
        materialName: '',       // 产品名称
        materialBatchNo: '',    // 检验批次
        checkItemName: '',      // 检验项
        checkResult: '',        // 检验结果
        checkUser: '',          // 检验人
        checkDateStart: '',     // 检验时间开始
        checkDateEnd: '',       // 检验时间结束
        productDateStart: '',   // 生产日期开始
        productDateEnd: '',     // 生产日期结束
        params: {}             // 额外参数
      }
      this.init()
    },
    async init() {
      try {
        this.loading = true
        // 过滤掉空值参数
        const params = {}
        Object.keys(this.queryParams).forEach(key => {
          if (this.queryParams[key] !== '' && this.queryParams[key] !== null && this.queryParams[key] !== undefined) {
            params[key] = this.queryParams[key]
          }
        })
        
        const response = await getProductCheckList(params)
        if (response.code == 200) {
          this.tableData = response.data
          console.log('查询结果:', this.tableData)
        } else {
          this.$message.error(response.msg || '获取数据失败')
        }
      } catch (error) {
        console.error('获取数据失败:', error)
        this.$message.error('获取数据失败')
      } finally {
        this.loading = false
      }
    },
    // 新增相关方法
    handleAdd() {
      this.addDialogVisible = true
    },
    handleAddClose() {
      this.addDialogVisible = false
    },
    async handleAddSubmit(formData) {
      try {
        const response = await addProductCheck(formData)
        if (response.code == 200) {
          this.$message.success('新增成功')
          this.init() // 刷新列表
        } else {
          this.$message.error(response.msg || '新增失败')
        }
      } catch (error) {
        console.error('新增失败:', error)
        this.$message.error('新增失败')
      }
      this.addDialogVisible = false
    },
    // 修改相关方法
    handleEdit(index, row) {
      this.currentRow = { ...row }
      this.editDialogVisible = true
    },
    handleEditClose() {
      this.editDialogVisible = false
      this.currentRow = null
    },
    handleEditSubmit(formData) {
      console.log('修改数据:', formData)
      // TODO: 调用修改API
      
      updateProductCheck(formData).then(()=>{
        this.$message.success('修改成功')
      this.init() // 刷新列表
      })
    },
    // 删除方法
    handleDelete(index, row) {
      this.$confirm('确认删除该记录?', '提示', {
        type: 'warning'
      }).then(() => {
        console.log('删除数据:', row)
        // TODO: 调用删除API
        removeProductCheck(row.id).then(()=>{
          this.$message.success('删除成功')
          this.init() 
        }).catch(()=>{
          this.$message.error("删除失败")
        });
        
      }).catch(() => {})
    }
  }
}
</script>

<style scoped>
.search-form {
  margin-bottom: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
}
.search-form .el-form-item {
  margin-bottom: 10px;
  margin-right: 10px;
}
</style> 