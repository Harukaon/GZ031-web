<template>
  <Panel>
    <!-- 搜索区域 -->
    <div class="search-container" style="margin-bottom: 20px;">
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="生产计划">
          <el-input v-model="searchForm.planId" placeholder="请输入生产计划"></el-input>
        </el-form-item>
        <el-form-item label="生产作业">
          <el-input v-model="searchForm.jobId" placeholder="请输入生产作业"></el-input>
        </el-form-item>
        <el-form-item label="产品">
          <el-input v-model="searchForm.materialId" placeholder="请输入产品"></el-input>
        </el-form-item>
        <el-form-item label="完工日期">
          <el-date-picker 
            v-model="searchForm.finishDate" 
            type="daterange" 
            range-separator="至" 
            start-placeholder="开始日期" 
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="生产批号">
          <el-input v-model="searchForm.batchNo" placeholder="请输入生产批号"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态">
            <el-option label="未入库" value="未入库"></el-option>
            <el-option label="入库中" value="入库中"></el-option>
            <el-option label="已入库" value="已入库"></el-option>
            <el-option label="检验合格" value="检验合格"></el-option>
            <el-option label="检验未合格" value="检验未合格"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchFinishOrders">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 数据列表区域 -->
    <div class="finish-order">
      <el-table :data="orders" style="width: 100%">
        <el-table-column prop="id" label="编号" width="80"></el-table-column>
        <el-table-column prop="serialNo" label="单号" width="120"></el-table-column>
        <el-table-column prop="planName" label="生产计划"></el-table-column>
        <el-table-column prop="jobName" label="生产作业"></el-table-column>
        <el-table-column prop="materialName" label="产品"></el-table-column>
        <el-table-column prop="materialModel" label="型号"></el-table-column>
        <el-table-column prop="materialSpecification" label="规格"></el-table-column>
        <el-table-column prop="materialUnit" label="单位"></el-table-column>
        <el-table-column prop="finishDate" label="完工日期" width="120"></el-table-column>
        <el-table-column prop="finishQuantity" label="生产数量" width="100"></el-table-column>
        <el-table-column prop="batchNo" label="生产批号" width="120"></el-table-column>
        <el-table-column prop="status" label="状态" width="100"></el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleDetail(scope.row)">详情</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 修改生产完工单弹框 -->
    <el-dialog :visible.sync="dialogVisible" title="修改生产完工单" width="50%">
      <el-form :model="editForm" label-width="100px">
        <el-form-item label="生产批号" prop="batchNo">
          <el-input v-model="editForm.batchNo"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="editForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleUpdate">确定</el-button>
      </span>
    </el-dialog>
  </Panel>
</template>

<script>
import { getFinishOrderList, updateFinishOrder, deleteFinishOrder } from '@/api/mes/quality.js';
import Panel from '@/components/panel';

export default {
  name: "FinishOrder",
  components: { Panel },
  data() {
    return {
      orders: [],
      dialogVisible: false,  // 控制修改对话框显示
      editForm: {},          // 存放待修改的数据
      searchForm: {          // 搜索条件
        planName: '',
        jobName: '',
        materialName: '',
        finishDateRange: [],
        batchNo: '',
        status: ''
      }
    };
  },
  mounted() {
    this.fetchFinishOrders();
  },
  methods: {
    // 查询生产完工单，接收可选的查询参数
    fetchFinishOrders(searchParams = {}) {
      getFinishOrderList(searchParams)
        .then(response => {
          // 假设返回 code 为 '200' 或 200 或无 code 都表示成功
          console.log("response", response);
          if(response.code === '200' || response.code === 200 || !response.code) {
            this.orders = response.data;
          } else {
            this.$message.error("获取生产完工单列表失败：" + response.msg);
          }
        })
        .catch(error => {
          this.$message.error("接口调用错误：" + error);
        });
    },
    // 点击【搜索】按钮，根据搜索条件进行查询
    searchFinishOrders() {
      let params = {};
      if(this.searchForm.planName) {
        params.planName = this.searchForm.planName;
      }
      if(this.searchForm.jobName) {
        params.jobName = this.searchForm.jobName;
      }
      if(this.searchForm.materialName) {
        params.materialName = this.searchForm.materialName;
      }
      if(this.searchForm.batchNo) {
        params.batchNo = this.searchForm.batchNo;
      }
      if(this.searchForm.status) {
        params.status = this.searchForm.status;
      }
      if(this.searchForm.finishDateRange && this.searchForm.finishDateRange.length === 2) {
        params.finishDateStart = this.searchForm.finishDateRange[0];
        params.finishDateEnd = this.searchForm.finishDateRange[1];
      }
      this.fetchFinishOrders(params);
    },
    // 重置搜索条件并刷新列表
    resetSearch() {
      this.searchForm = {
        planName: '',
        jobName: '',
        materialName: '',
        finishDateRange: [],
        batchNo: '',
        status: ''
      };
      this.fetchFinishOrders();
    },
    // 点击详情按钮时弹出对话框，并复制待修改数据
    handleDetail(row) {
      this.editForm = Object.assign({}, row);
      this.dialogVisible = true;
    },
    // 处理【确定】按钮的更新逻辑
    handleUpdate() {
      if(!this.editForm.batchNo) {
        this.$message.error("生产批号不能为空");
        return;
      }
      updateFinishOrder(this.editForm)
        .then(response => {
          if(response.code == '200') {
            this.$message.success("更新成功");
            this.dialogVisible = false;
            this.fetchFinishOrders();
          } else {
            this.$message.error("更新失败：" + response.msg);
          }
        })
        .catch(error => {
          this.$message.error("接口调用错误：" + error);
        });
    },
    handleDelete(row) {
      this.$confirm("确认删除该条生产完工单吗？", "提示", { type: "warning" })
        .then(() => {
          deleteFinishOrder(String(row.id))
            .then(response => {
              if(response.code === '200' || response.code === 200 || !response.code) {
                this.$message.success("删除成功");
                this.fetchFinishOrders();
              } else {
                this.$message.error("删除失败：" + response.msg);
              }
            })
            .catch(error => {
              this.$message.error("接口调用错误：" + error);
            });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    }
  }
};
</script>

<style scoped>
.finish-order {
  padding: 20px;
}
.search-container {
  margin-bottom: 20px;
}
</style> 