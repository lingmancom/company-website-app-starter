<script lang="ts" setup>
const route = useRoute()

// 获取参数 t 的值
const t = route.query.t || ''
const url = route.query.url || '/'

const httpHead = window.__BASE_API

const apiUrl = `${httpHead}/api/account/qywxlogin`

// 准备要发送的 JSON 数据
const data = {
  code: t,
}

// 发送 POST 请求
fetch(apiUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
  .then(response => response.json())
  .then((result) => {
    console.log(result)
    if (result.code === 1) {
      localStorage.setItem('token', result.data)
      window.location.href = url as string
    }
    else {
      alert(result.message)
    }
  })
  .catch((error) => {
    console.error('Error:', error)
  })
</script>

<template>
  <a href="/"><button>返回首页</button> </a>
</template>

<style  lang="scss" scoped></style>
