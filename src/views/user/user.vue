<script setup lang="ts">
const RoleMeta = {
  1: '超级管理员',
  2: '管理员',
  3: '会员',
}

const projectList = reactive({ noPriviliges: [] as any, hasPriviliges: [] as any })
const showVisible = ref(false)

const { item, loading, tableData, dialogVisible, loadData, generateItem } = useCRUDVariable({
  item: {
    id: 0,
    name: '',
    sort: 1,
    create_at: '',
    enabled: false,
    role: 2,
  },
  getApiFn: Api.getUserList,
})

loadData()

function handleDelete(row) {
  ElMessageBox.confirm('您确定要删除吗?', '提示', { type: 'warning' }).then(async () => {
    await Api.deleteUser({ ids: [row.id] })
    ElMessage.success('删除成功')
    loadData()
  }).catch(() => { })
}

function handelSwitchChange(row) {
  ElMessageBox.confirm('您确定要操作吗?', '提示', { type: 'warning' }).then(async () => {
    Api.verifyUser({ userId: row.id }).then(() => {
      ElMessage.success('操作成功')
      loadData()
    })
  }).catch(() => { })
}

async function editRole() {
  await Api.saveUserRole({ userId: item.id, role: item.role })
  ElMessage.success('操作成功')
  dialogVisible.value = false
  loadData()
}

function editName(item) {
  ElMessageBox.prompt('请输入名称', '提示', { type: 'warning', inputValue: item.name }).then(async ({ value }) => {
    await Api.saveUserName({ userId: item.id, name: value })
    ElMessage.success('操作成功')
    loadData()
  }).catch(() => { })
}

async function getProjects() {
  const list = await Api.getUserProjectList({ userId: item.id })
  Object.assign(projectList, list)
}

async function changeProject(id) {
  await Api.saveProjectUser({
    projectId: id,
    userId: item.id,
  })
  getProjects()
}

function handlePermissions(row) {
  Object.assign(item, row)
  showVisible.value = true
  getProjects()
}
</script>

<template>
  <div class="p-10 h-full flex flex-col">
    <el-table v-loading="loading" class="flex-1" :data="tableData" stripe border>
      <el-table-column prop="id" label="ID" width="300"></el-table-column>
      <el-table-column prop="name" label="名称" width="100"></el-table-column>
      <el-table-column prop="role" label="角色" width="100">
        <template #default="{ row }">
          {{ RoleMeta[row.role] }}
        </template>
      </el-table-column>
      <el-table-column label="项目数">
        <template #default="{ row }">
          <el-tag v-for="i, idx in row.listProjects" :key="idx" class="mx-4">
            {{ i.name }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="是否允许访问" align="center" width="110">
        <template #default="{ row }">
          <el-switch
            v-model="row.enabled" class="![&.is-disabled]:opacity-100 ![&_.el-switch\_\_core]:cp" disabled
            @click="handelSwitchChange(row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column v-slot="{ row }" label="操作" width="400">
        <el-button type="primary" @click="editName(row)">
          编辑名称
        </el-button>
        <el-button type="primary" @click="dialogVisible = true, Object.assign(item, row)">
          编辑角色
        </el-button>
        <el-button type="primary" @click="handlePermissions(row)">
          权限
        </el-button>
        <el-button type="danger" @click="handleDelete(row)">
          删除
        </el-button>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" title="">
      <edit-row
        v-model="item.role" title="角色" width="100%" type="select"
        :options="Object.entries(RoleMeta).map(([key, value]) => ({ label: value, value: Number(key) }))"
      />
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="(dialogVisible = false, Object.assign(item, generateItem()))">
            取 消
          </el-button>
          <el-button type="primary" @click="editRole()">
            保 存
          </el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="showVisible" title="权限">
      <div class="mb-20">
        <el-button
          v-for="i, idx in projectList.hasPriviliges" :key="idx" type="primary" size="small"
          @click="changeProject(i.id)"
        >
          {{ i.name }}
        </el-button>
      </div>
      <div class="">
        <el-button
          v-for="i, idx in projectList.noPriviliges" :key="idx" type="default" size="small"
          @click="changeProject(i.id)"
        >
          {{ i.name }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang='scss' scoped></style>
