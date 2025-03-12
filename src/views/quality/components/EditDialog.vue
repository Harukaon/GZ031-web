<template>
  <div>
  <el-dialog
    title="修改产品检验单"
    :visible.sync="visible"
    width="30%"
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
        <el-input v-model="formData.checkValue" placeholder="请输入检验值"></el-input>
      </el-form-item>
      <el-form-item label="检验结果" prop="checkResult">
        <el-select v-model="formData.checkResult" placeholder="请选择检验结果">
          <el-option label="合格" value="1"></el-option>
          <el-option label="不合格" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="formData.remark" placeholder="请输入备注"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
  
  <el-dialog title="选择生产完工单" :visible.sync="selectShow" width="width">
      <div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="productFinishNo" label="label" width="width">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="150px"
              >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="formData.productFinishNo = scope.row.productFinishNo ,selectShow = false">确定</el-button>
              </template>
            </el-table-column>
        </el-table>
      </div>
      <div slot="footer">
      </div>
  </el-dialog>
   <el-dialog title="选择检验标准" :visible.sync="standardShow" width="width">
      <div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="checkStandardId" label="label" width="width">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="150px"
              >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="formData.checkStandardId = scope.row.checkStandardId ,standardShow = false">确定</el-button>
              </template>
            </el-table-column>
        </el-table>
      </div>
    </el-dialog>

</div>

</template>

<script>
export default {
  name: 'EditDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    tableData:{
        type : Array,
        default : []
    },
    rowData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      standardShow:false,
      selectShow:false,
      formData: {
        productFinishNo: '',
        checkStandardId: '',
        checkQuantity: 1,
        checkValue: '',
        checkResult: '1',
        remark: ''
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
      }
    }
  },
  watch: {
    rowData: {
      handler(val) {
        if (val) {
          this.formData = { ...val }
        }
      },
      immediate: true
    }
  },
  methods: {
    handleClose() {
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
    }
  }
}
</script> 