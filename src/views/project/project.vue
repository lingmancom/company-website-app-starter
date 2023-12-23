<script setup lang="ts">
const userList = reactive({ noPriviliges: [] as any, hasPriviliges: [] as any })
const showVisible = ref(false)

const { item, dialogVisible, loading, save, generateItem, tableData, loadData, handleSelectionChange, deleteData } = useCRUDVariable({
  item: {
    id: '',
    name: '',
    sort: 100,
    enable: 1,
  },
  getApiFn: Api.getProjectList,
  saveApiFn: Api.saveProject,
  deleteApiFn: Api.deleteProject,
})
loadData()

async function getUsers() {
  const list = await Api.getProjectUserList({ project: item.id })
  Object.assign(userList, list)
}

async function changeUser(id) {
  await Api.saveProjectUser({
    projectId: item.id,
    userId: id,
  })
  getUsers()
}

function handlePermissions(row) {
  Object.assign(item, row)
  showVisible.value = true
  getUsers()
}

watch(showVisible, (val) => {
  if (!val)
    loadData()
})
</script>

<template>
  <div class="flex flex-col h-full p-10">
    <div class="flex justify-between">
      <div class="">
      </div>
      <div class="">
      </div>
      <div class="flex items-center">
        <el-button type="primary" @click="(dialogVisible = true, Object.assign(item, generateItem()))">
          添加
        </el-button>
        <el-button type="danger" @click="deleteData">
          删除
        </el-button>
      </div>
    </div>
    <div class="flex-1 mt-10 h-0">
      <el-table v-loading="loading" :data="tableData" border height="100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="id" label="ID" width="180"></el-table-column>
        <el-table-column prop="name" label="name" width="120"></el-table-column>
        <el-table-column label="人数">
          <template #default="{ row }">
            <el-tag v-for="i, idx in row.listUsers" :key="idx" class="m-4">
              {{ i.name }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="sort" width="120"></el-table-column>
        <el-table-column prop="enable" label="enable" width="120"></el-table-column>
        <el-table-column v-slot="{ row }" label="操作" width="200">
          <el-button type="primary" @click="(dialogVisible = true, Object.assign(item, row))">
            编辑
          </el-button>
          <el-button type="primary" @click="handlePermissions(row)">
            权限
          </el-button>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog v-model="dialogVisible" title="">
      <edit-row v-model="item.id" title="ID" width="100%" :disabled="!!item.id" />
      <edit-row v-model="item.name" title="name" width="100%" :required="true" />
      <edit-row v-model="item.sort" title="sort" width="100%" />
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

    <el-dialog v-model="showVisible" title="权限">
      <div class="mb-20">
        <el-button
          v-for="i, idx in userList.hasPriviliges" :key="idx" type="primary" size="small"
          @click="changeUser(i.id)"
        >
          {{ i.name }}
        </el-button>
      </div>
      <div class="">
        <el-button
          v-for="i, idx in userList.noPriviliges" :key="idx" type="default" size="small"
          @click="changeUser(i.id)"
        >
          {{ i.name }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang='scss' scoped></style>
