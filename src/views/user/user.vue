<script setup lang="ts">
const { item, loading, tableData, dialogVisible, loadData, generateItem, save } = useCRUDVariable({
  item: {
    id: 0,
    name: '',
    sort: 1,
    create_at: '',
    enabled: false,
    role: 2,
  },
  getApiFn: Api.getUserList,
  saveApiFn: Api.saveUser,
})

loadData()

function handleDelete(row) {
  ElMessageBox.confirm('您确定要删除吗?', '提示', { confirmButtonText: '确认', cancelButtonText: '取消', type: 'warning' }).then(async () => {
    await Api.deleteUser({ ids: [row.id] })
    ElMessage.success('删除成功')
    loadData()
  }).catch(() => { })
}
</script>

<template>
  <div class="p-10">
    <el-table v-loading="loading" :data="tableData" stripe height="700" border>
      <el-table-column prop="id" label="ID" width="300" />
      <el-table-column prop="name" label="名称" width="400" />
      <el-table-column prop="role" label="角色" width="100" />
      <el-table-column label="是否允许访问" align="center" width="110">
        <template #default="{ row }">
          <el-switch
            v-model="row.enabled" @change="() => {
              Api.verifyUser({ userId: row.id }).then(() => {
                ElMessage.success('操作成功')
                loadData()
              })
            }"
          />
        </template>
      </el-table-column>
      <el-table-column v-slot="{ row }" label="操作">
        <el-button type="primary" @click="(dialogVisible = true, Object.assign(item, row))">
          编辑
        </el-button>
        <el-button type="danger" @click="handleDelete(row)">
          删除
        </el-button>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" title="">
      <edit-row v-model="item.name" title="名称" width="100%" />
      <edit-row v-model="item.role" title="角色" width="100%" />
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="(dialogVisible = false, Object.assign(item, generateItem()))">
            取 消
          </el-button>
          <el-button type="primary" @click="save">
            保 存
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang='scss' scoped></style>
