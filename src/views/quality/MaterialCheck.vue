<template>
  <Panel>
    <!-- 搜索模块直接放在Panel内部，不使用header插槽 -->
    <div class="search-container">
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="流水号">
          <el-input v-model="searchForm.serialNo" placeholder="请输入流水号"></el-input>
        </el-form-item>
        <el-form-item label="领料单号">
          <el-input v-model="searchForm.materialRequisitionNo" placeholder="请输入领料单号"></el-input>
        </el-form-item>
        <el-form-item label="物料名称">
          <el-input v-model="searchForm.materialName" placeholder="请输入物料名称"></el-input>
        </el-form-item>
        <el-form-item label="检验结果">
          <el-select v-model="searchForm.checkResult" placeholder="请选择">
            <el-option label="合格" value="1"></el-option>
            <el-option label="不合格" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="检验时间">
          <el-date-picker
            v-model="searchForm.checkDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
      
      <!-- 添加新增按钮 -->
      <div class="operation-container">
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </div>
    </div>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="编号" width="80"></el-table-column>
      <el-table-column prop="serialNo" label="流水号" width="120"></el-table-column>
      <el-table-column prop="materialRequisitionNo" label="领料单号" width="140"></el-table-column>
      <el-table-column prop="materialName" label="物料名称"></el-table-column>
      <el-table-column prop="materialSpecification" label="规格" width="100"></el-table-column>
      <el-table-column prop="materialModel" label="型号" width="100"></el-table-column>
      <el-table-column prop="materialUnit" label="单位" width="80"></el-table-column>
      <el-table-column prop="requireQuantity" label="需求数量" width="100"></el-table-column>
      <el-table-column prop="receiveQuantity" label="已领数量" width="100"></el-table-column>
      <el-table-column prop="checkQuantity" label="抽检数量" width="100"></el-table-column>
      <el-table-column prop="checkItemName" label="检验项"></el-table-column>
      <el-table-column prop="maxValue" label="标准上限" width="100"></el-table-column>
      <el-table-column prop="minValue" label="标准下限" width="100"></el-table-column>
      <el-table-column prop="checkValue" label="检验值" width="100"></el-table-column>
      <el-table-column label="检验结果" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.checkResult === '1' ? 'success' : 'danger'">
            {{ row.checkResult === '1' ? '合格' : '不合格' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="checkUser" label="检验人" width="100"></el-table-column>
      <el-table-column prop="checkDate" label="检验时间" width="140"></el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template slot-scope="{row}">
          <el-button size="mini" type="primary" @click="handleEdit(row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改对话框 -->
    <el-dialog :visible.sync="editDialog" title="修改来料检验单" width="800px">
      <el-form :model="currentRow" :rules="formRules" ref="editForm" label-width="120px">
        <!-- 领料单选择 -->
        <el-form-item label="领料编号" prop="materialRequisitionNo">
          <el-input v-model="currentRow.materialRequisitionNo" disabled>
            <el-button slot="append" @click="showRequisitionDialog">选择</el-button>
          </el-input>
        </el-form-item>
        
        <el-form-item label="物料名称" prop="materialName">
          <el-input v-model="currentRow.materialName" disabled></el-input>
        </el-form-item>

        <el-form-item label="抽检数量" prop="checkQuantity">
          <el-input-number 
            v-model="currentRow.checkQuantity" 
            :min="1" 
            :max="currentRow.receiveQuantity"
            controls-position="right"
            style="width: 200px"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="检验值" prop="checkValue">
          <el-input-number 
            v-model="currentRow.checkValue" 
            :precision="2" 
            controls-position="right"
            style="width: 200px"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="检验结果" prop="checkResult">
          <el-select v-model="currentRow.checkResult" placeholder="请选择">
            <el-option label="合格" value="1"></el-option>
            <el-option label="不合格" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="备注">
          <el-input 
            type="textarea" 
            v-model="currentRow.remark" 
            :rows="3" 
            placeholder="请输入备注信息"
            style="width: 400px"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer">
        <el-button @click="editDialog = false">取消</el-button>
        <el-button type="primary" @click="confirmEdit">确定</el-button>
      </span>
    </el-dialog>

    <!-- 添加来料检验单对话框 -->
    <el-dialog :visible.sync="addDialog" title="添加来料检验单" width="800px">
      <el-form :model="addForm" :rules="formRules" ref="addForm" label-width="120px">
        <!-- 领料单选择 -->
        <el-form-item label="领料编号" prop="materialRequisitionNo">
          <el-input v-model="addForm.materialRequisitionNo" disabled>
            <el-button slot="append" @click="showRequisitionDialogForAdd">选择</el-button>
          </el-input>
        </el-form-item>
        
        <el-form-item label="物料名称" prop="materialName">
          <el-input v-model="addForm.materialName" disabled></el-input>
        </el-form-item>

        <el-form-item label="抽检数量" prop="checkQuantity">
          <el-input-number 
            v-model="addForm.checkQuantity" 
            :min="1" 
            :max="addForm.receiveQuantity || 9999"
            controls-position="right"
            style="width: 200px"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="检验项" prop="checkItemName">
          <el-input v-model="addForm.checkItemName" placeholder="请输入检验项" style="width: 200px"></el-input>
        </el-form-item>

        <el-form-item label="标准上限" prop="maxValue">
          <el-input-number 
            v-model="addForm.maxValue" 
            :precision="2" 
            controls-position="right"
            style="width: 200px"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="标准下限" prop="minValue">
          <el-input-number 
            v-model="addForm.minValue" 
            :precision="2" 
            controls-position="right"
            style="width: 200px"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="检验值" prop="checkValue">
          <el-input-number 
            v-model="addForm.checkValue" 
            :precision="2" 
            controls-position="right"
            style="width: 200px"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="检验结果" prop="checkResult">
          <el-select v-model="addForm.checkResult" placeholder="请选择">
            <el-option label="合格" value="1"></el-option>
            <el-option label="不合格" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="检验人" prop="checkUser">
          <el-input v-model="addForm.checkUser" placeholder="请输入检验人" style="width: 200px"></el-input>
        </el-form-item>

        <el-form-item label="备注">
          <el-input 
            type="textarea" 
            v-model="addForm.remark" 
            :rows="3" 
            placeholder="请输入备注信息"
            style="width: 400px"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer">
        <el-button @click="addDialog = false">取消</el-button>
        <el-button type="primary" @click="confirmAdd">确定</el-button>
      </span>
    </el-dialog>

    <!-- 选择领料单对话框 -->
    <el-dialog 
      title="选择领料单" 
      :visible.sync="requisitionDialog" 
      width="60%"
      append-to-body
    >
      <el-table :data="requisitionData" height="400">
        <el-table-column prop="no" label="领料单号" width="180"></el-table-column>
        <el-table-column prop="materialName" label="物料名称"></el-table-column>
        <el-table-column prop="spec" label="规格" width="120"></el-table-column>
        <el-table-column prop="model" label="型号" width="120"></el-table-column>
        <el-table-column prop="quantity" label="数量" width="100"></el-table-column>
        <el-table-column label="操作" width="80" fixed="right">
          <template slot-scope="{row}">
            <el-button size="mini" @click="selectRequisition(row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </Panel>
</template>

<script>
import Panel from '@/components/panel'

// 模拟数据生成
const mockData = [
  {
    id: 1,
    serialNo: 'LL20240320001',
    materialRequisitionNo: 'LLD2024032001',
    materialName: '不锈钢板',
    materialSpecification: '304-2B',
    materialModel: 'SUS304',
    materialUnit: '张',
    requireQuantity: 100,
    receiveQuantity: 95,
    checkQuantity: 10,
    checkItemName: '厚度检测',
    maxValue: 2.5,
    minValue: 1.5,
    checkValue: 2.1,
    checkResult: '1',
    checkUser: '张三',
    checkDate: '2024-03-20 14:30:00'
  },
  {
    id: 2,
    serialNo: 'LL20240320002',
    materialRequisitionNo: 'LLD2024032002',
    materialName: '铜线',
    materialSpecification: 'φ0.5mm',
    materialModel: 'C1100',
    materialUnit: '卷',
    requireQuantity: 50,
    receiveQuantity: 48,
    checkQuantity: 5,
    checkItemName: '导电率',
    maxValue: 100,
    minValue: 95,
    checkValue: 98.5,
    checkResult: '0',
    checkUser: '李四',
    checkDate: '2024-03-20 15:00:00'
  },
  {
    id: 3,
    serialNo: 'LL20240321001',
    materialRequisitionNo: 'LLD2024032101',
    materialName: '铝板',
    materialSpecification: '1060-H24',
    materialModel: 'AL1060',
    materialUnit: '张',
    requireQuantity: 80,
    receiveQuantity: 80,
    checkQuantity: 8,
    checkItemName: '硬度检测',
    maxValue: 45,
    minValue: 35,
    checkValue: 40,
    checkResult: '1',
    checkUser: '王五',
    checkDate: '2024-03-21 09:15:00'
  },
  {
    id: 4,
    serialNo: 'LL20240321002',
    materialRequisitionNo: 'LLD2024032102',
    materialName: '橡胶垫圈',
    materialSpecification: 'φ20mm',
    materialModel: 'NBR70',
    materialUnit: '个',
    requireQuantity: 1000,
    receiveQuantity: 1000,
    checkQuantity: 50,
    checkItemName: '硬度检测',
    maxValue: 75,
    minValue: 65,
    checkValue: 62,
    checkResult: '0',
    checkUser: '赵六',
    checkDate: '2024-03-21 11:30:00'
  },
  {
    id: 5,
    serialNo: 'LL20240322001',
    materialRequisitionNo: 'LLD2024032201',
    materialName: '电阻',
    materialSpecification: '10KΩ',
    materialModel: 'RES10K',
    materialUnit: '个',
    requireQuantity: 5000,
    receiveQuantity: 5000,
    checkQuantity: 100,
    checkItemName: '阻值检测',
    maxValue: 10.5,
    minValue: 9.5,
    checkValue: 10.2,
    checkResult: '1',
    checkUser: '张三',
    checkDate: '2024-03-22 10:00:00'
  }
]

// 模拟领料单数据
const mockRequisitionData = [
  {
    no: 'LLD2024032001',
    materialName: '不锈钢板',
    spec: '304-2B',
    model: 'SUS304',
    quantity: 100,
    received: 95,
    materialId: 1001,
    materialCode: 'M1001'
  },
  {
    no: 'LLD2024032002',
    materialName: '铜线',
    spec: 'φ0.5mm',
    model: 'C1100',
    quantity: 50,
    received: 48,
    materialId: 1002,
    materialCode: 'M1002'
  },
  {
    no: 'LLD2024032101',
    materialName: '铝板',
    spec: '1060-H24',
    model: 'AL1060',
    quantity: 80,
    received: 80,
    materialId: 1003,
    materialCode: 'M1003'
  },
  {
    no: 'LLD2024032102',
    materialName: '橡胶垫圈',
    spec: 'φ20mm',
    model: 'NBR70',
    quantity: 1000,
    received: 1000,
    materialId: 1004,
    materialCode: 'M1004'
  },
  {
    no: 'LLD2024032201',
    materialName: '电阻',
    spec: '10KΩ',
    model: 'RES10K',
    quantity: 5000,
    received: 5000,
    materialId: 1005,
    materialCode: 'M1005'
  }
]

export default {
  name: 'MaterialCheck',
  components: {
    Panel
  },
  data() {
    return {
      searchForm: {
        serialNo: '',
        materialRequisitionNo: '',
        materialName: '',
        checkResult: '',
        checkDate: []
      },
      tableData: [],
      editDialog: false,
      currentRow: {},
      requisitionDialog: false,
      requisitionData: mockRequisitionData,
      formRules: {
        materialRequisitionNo: [
          { required: true, message: '请选择领料单', trigger: 'blur' }
        ],
        materialName: [
          { required: true, message: '物料名称不能为空', trigger: 'blur' }
        ],
        checkQuantity: [
          { required: true, message: '请输入抽检数量', trigger: 'blur' }
        ],
        checkValue: [
          { required: true, message: '请输入检验值', trigger: 'blur' }
        ],
        checkResult: [
          { required: true, message: '请选择检验结果', trigger: 'change' }
        ],
        checkItemName: [
          { required: true, message: '请输入检验项', trigger: 'blur' }
        ],
        checkUser: [
          { required: true, message: '请输入检验人', trigger: 'blur' }
        ]
      },
      // 新增对话框相关数据
      addDialog: false,
      addForm: {
        materialRequisitionNo: '',
        materialName: '',
        materialSpecification: '',
        materialModel: '',
        materialUnit: '',
        requireQuantity: 0,
        receiveQuantity: 0,
        checkQuantity: 0,
        checkItemName: '',
        maxValue: 0,
        minValue: 0,
        checkValue: 0,
        checkResult: '1',
        checkUser: '',
        remark: '',
        materialId: 0,
        materialRequisitionId: 0,
        materialCode: '',
        checkStandardId: 0,
        createBy: '',
        updateBy: '',
        updateTime: '',
        searchValue: '',
        params: {}
      },
      isForAdd: false // 标记是否为新增操作打开领料单选择框
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        // 构建API请求参数
        const params = { ...this.searchForm }
        
        // 处理日期范围
        if (this.searchForm.checkDate && this.searchForm.checkDate.length === 2) {
          params.beginCheckDate = this.searchForm.checkDate[0]
          params.endCheckDate = this.searchForm.checkDate[1]
        }
        delete params.checkDate
        
        // 模拟API调用
        // const { code, rows } = await getMaterialCheckList(params)
        // if (code === '200') {
        //   this.tableData = rows
        // }
        
        // 使用模拟数据进行筛选
        this.tableData = mockData.filter(item => {
          // 流水号筛选
          if (params.serialNo && !item.serialNo.includes(params.serialNo)) {
            return false
          }
          
          // 领料单号筛选
          if (params.materialRequisitionNo && !item.materialRequisitionNo.includes(params.materialRequisitionNo)) {
            return false
          }
          
          // 物料名称筛选
          if (params.materialName && !item.materialName.includes(params.materialName)) {
            return false
          }
          
          // 检验结果筛选
          if (params.checkResult && item.checkResult !== params.checkResult) {
            return false
          }
          
          // 检验时间区间筛选
          if (params.beginCheckDate && params.endCheckDate) {
            const itemDate = new Date(item.checkDate)
            const beginDate = new Date(params.beginCheckDate)
            
            // 设置结束日期为当天的23:59:59，确保包含当天的数据
            const endDate = new Date(params.endCheckDate)
            endDate.setHours(23, 59, 59, 999)
            
            if (itemDate < beginDate || itemDate > endDate) {
              return false
            }
          }
          
          return true
        })
      } catch (error) {
        console.error('获取数据失败:', error)
        this.$message.error('获取数据失败')
      }
    },
    handleSearch() {
      this.fetchData()
    },
    resetSearch() {
      this.searchForm = {
        serialNo: '',
        materialRequisitionNo: '',
        materialName: '',
        checkResult: '',
        checkDate: []
      }
      this.fetchData()
    },
    handleEdit(row) {
      this.currentRow = { ...row }
      this.editDialog = true
    },
    showRequisitionDialog() {
      this.isForAdd = false
      this.requisitionDialog = true
    },
    showRequisitionDialogForAdd() {
      this.isForAdd = true
      this.requisitionDialog = true
    },
    selectRequisition(row) {
      if (this.isForAdd) {
        // 为新增表单填充数据
        this.addForm.materialRequisitionNo = row.no
        this.addForm.materialName = row.materialName
        this.addForm.materialSpecification = row.spec
        this.addForm.materialModel = row.model
        this.addForm.materialUnit = '个' // 默认单位
        this.addForm.requireQuantity = row.quantity
        this.addForm.receiveQuantity = row.received
        this.addForm.materialRequisitionId = row.id || 0 // 模拟ID
        this.addForm.materialId = row.materialId || 0 // 模拟ID
        this.addForm.materialCode = row.materialCode || '' // 模拟编码
      } else {
        // 为编辑表单填充数据
        this.currentRow.materialRequisitionNo = row.no
        this.currentRow.materialName = row.materialName
        this.currentRow.receiveQuantity = row.received
      }
      this.requisitionDialog = false
    },
    handleAdd() {
      this.addForm = {
        materialRequisitionNo: '',
        materialName: '',
        materialSpecification: '',
        materialModel: '',
        materialUnit: '',
        requireQuantity: 0,
        receiveQuantity: 0,
        checkQuantity: 0,
        checkItemName: '',
        maxValue: 0,
        minValue: 0,
        checkValue: 0,
        checkResult: '1',
        checkUser: '',
        remark: '',
        materialId: 0,
        materialRequisitionId: 0,
        materialCode: '',
        checkStandardId: 0,
        createBy: '',
        updateBy: '',
        updateTime: '',
        searchValue: '',
        params: {}
      }
      this.addDialog = true
    },
    confirmAdd() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          // 构建符合API要求的参数
          const params = {
            ...this.addForm,
            checkDate: new Date().toISOString().replace('T', ' ').substring(0, 19)
          }
          
          // 模拟API调用
          // const { code } = await addMaterialCheck(params)
          // if (code === '200') {
          //   this.$message.success('新增成功')
          //   this.addDialog = false
          //   this.fetchData()
          // }
          
          // 模拟新增成功
          // 生成新的ID（实际应由后端生成）
          const newId = this.tableData.length > 0 ? Math.max(...this.tableData.map(item => item.id)) + 1 : 1
          
          // 生成流水号（实际应由后端生成）
          const now = new Date()
          const year = now.getFullYear()
          const month = String(now.getMonth() + 1).padStart(2, '0')
          const day = String(now.getDate()).padStart(2, '0')
          const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
          const serialNo = `LL${year}${month}${day}${random}`
          
          // 获取当前时间作为检验时间
          const checkDate = now.toISOString().replace('T', ' ').substring(0, 19)
          
          // 创建新记录
          const newRecord = {
            id: newId,
            serialNo,
            materialRequisitionNo: this.addForm.materialRequisitionNo,
            materialName: this.addForm.materialName,
            materialSpecification: this.addForm.materialSpecification,
            materialModel: this.addForm.materialModel,
            materialUnit: this.addForm.materialUnit,
            requireQuantity: this.addForm.requireQuantity,
            receiveQuantity: this.addForm.receiveQuantity,
            checkQuantity: this.addForm.checkQuantity,
            checkItemName: this.addForm.checkItemName,
            maxValue: this.addForm.maxValue,
            minValue: this.addForm.minValue,
            checkValue: this.addForm.checkValue,
            checkResult: this.addForm.checkResult,
            checkUser: this.addForm.checkUser,
            checkDate,
            remark: this.addForm.remark
          }
          
          // 添加到表格数据中
          this.tableData.unshift(newRecord)
          
          this.$message.success('新增成功')
          this.addDialog = false
        }
      })
    },
    confirmEdit() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          const index = this.tableData.findIndex(item => item.id === this.currentRow.id)
          if (index >= 0) {
            this.tableData.splice(index, 1, {
              ...this.currentRow,
              materialSpecification: this.requisitionData.find(
                item => item.no === this.currentRow.materialRequisitionNo
              )?.spec || '',
              materialModel: this.requisitionData.find(
                item => item.no === this.currentRow.materialRequisitionNo
              )?.model || ''
            })
          }
          this.$message.success('修改成功')
          this.editDialog = false
        }
      })
    },
    handleDelete(row) {
      this.$confirm('确认删除该记录吗？', '提示', {
        type: 'warning'
      }).then(async () => {
        // 模拟删除操作
        // await deleteMaterialCheck(row.id)
        this.tableData = this.tableData.filter(item => item.id !== row.id)
        this.$message.success('删除成功')
      }).catch(() => {})
    }
  }
}
</script>

<style scoped>
.search-container {
  margin-bottom: 20px;
}

.search-form {
  display: flex;
  flex-wrap: wrap;
}

.operation-container {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}

.el-form-item {
  margin-right: 15px;
  margin-bottom: 10px;
}
</style>