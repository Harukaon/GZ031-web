<template>
  <div>
    <el-dialog
      title="新增产品检验单"
      :visible.sync="visible"
      width="800px"
      center
      @close="handleClose">
      <el-form :model="formData" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="完工单号" prop="productFinishNo">
          <el-input v-model="formData.productFinishNo" placeholder="请输入完工单号"></el-input>
          <el-button type="primary" @click="selectShow = true">选择</el-button>
        </el-form-item>
        <el-form-item label="检验标准" prop="checkStandardId">
          <el-input v-model="formData.checkStandardId" placeholder="请输入检验标准"></el-input>
          <el-button type="primary" @click="standardShow = true">选择</el-button>
        </el-form-item>
        <el-form-item label="抽检数量" prop="checkQuantity">
          <el-input-number v-model="formData.checkQuantity" :min="1" placeholder="请输入抽检数量"></el-input-number>
        </el-form-item>
        <el-form-item label="检验值" prop="checkValue">
          <el-input-number v-model="formData.checkValue" :precision="2" placeholder="请输入检验值"></el-input-number>
        </el-form-item>
        <el-form-item label="检验结果" prop="checkResult">
          <el-select v-model="formData.checkResult" placeholder="请选择检验结果">
            <el-option label="合格" value="1"></el-option>
            <el-option label="不合格" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="formData.remark" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 选择生产完工单对话框 -->
    <el-dialog title="选择生产完工单" :visible.sync="selectShow" width="900px">
      <div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="productFinishNo" label="完工单号" width="120"></el-table-column>
          <el-table-column prop="productPlanNo" label="计划编号" width="120"></el-table-column>
          <el-table-column prop="productJobName" label="作业名称" width="120"></el-table-column>
          <el-table-column prop="productLineName" label="生产线名称" width="120"></el-table-column>
          <el-table-column prop="materialName" label="产品名称" width="120"></el-table-column>
          <el-table-column prop="materialBatchNo" label="检验批次" width="120"></el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="80"
            >
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleSelectFinish(scope.row)">确定</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <!-- 选择检验标准对话框 -->
    <el-dialog title="选择检验标准" :visible.sync="standardShow" width="900px">
      <div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="checkStandardId" label="检验标准编号" width="120"></el-table-column>
          <el-table-column prop="checkItemName" label="检验项" width="120"></el-table-column>
          <el-table-column prop="maxValue" label="阈值上限" width="120"></el-table-column>
          <el-table-column prop="minValue" label="阈值下限" width="120"></el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="80"
            >
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleSelectStandard(scope.row)">确定</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AddDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectShow: false,
      standardShow: false,
      formData: {
        productFinishNo: '',    // 完工单号
        checkStandardId: null,    // 检验标准ID（数字类型）
        checkQuantity: 1,       // 抽检数量
        checkValue: null,       // 检验值
        checkResult: '1',       // 检验结果
        remark: ''             // 备注
      },
      rules: {
        productFinishNo: [
          { required: true, message: '请输入完工单号', trigger: 'blur' }
        ],
        checkStandardId: [
          { required: true, message: '请输入检验标准', trigger: 'blur' }
        ],
        checkQuantity: [
          { required: true, message: '请输入抽检数量', trigger: 'blur' }
        ],
        checkValue: [
          { required: true, message: '请输入检验值', trigger: 'blur' }
        ],
        checkResult: [
          { required: true, message: '请选择检验结果', trigger: 'change' }
        ]
      },
      standardData: [
        { checkStandardId: 'STD001' },
        { checkStandardId: 'STD002' }
      ]
    }
  },
  methods: {
    handleClose() {
      this.$refs.form?.resetFields()
      this.$emit('update:visible', false)
      this.$emit('close')
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('submit', { ...this.formData })
          this.handleClose()
        }
      })
    },
    // 选择完工单
    handleSelectFinish(row) {
      // 填充相关字段
      this.formData = {
        ...this.formData,
        productFinishNo: row.productFinishNo,
        productPlanNo: row.productPlanNo,
        productJobName: row.productJobName,
        productLineName: row.productLineName,
        materialName: row.materialName,
        materialBatchNo: row.materialBatchNo
      }
      this.selectShow = false
    },
    // 选择检验标准
    handleSelectStandard(row) {
      // 填充相关字段
      this.formData = {
        ...this.formData,
        checkStandardId: Number(row.checkStandardId),
        checkItemName: row.checkItemName,
        maxValue: row.maxValue,
        minValue: row.minValue
      }
      this.standardShow = false
    }
  }
}
</script>

<style scoped>
.el-input-number {
  width: 200px;
}
.el-select {
  width: 200px;
}
.el-form-item {
  display: flex;
  align-items: center;
}
.el-form-item .el-input {
  width: 200px;
  margin-right: 10px;
}
.el-form-item .el-input.el-textarea {
  width: 400px;
}
.el-form-item .el-button {
  flex-shrink: 0;
  width: 80px;
}
</style> 