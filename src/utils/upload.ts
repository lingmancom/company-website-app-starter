import { compressAccurately } from 'image-conversion'
import { service } from 'lingman-web'

export function random_string(len?: number) {
  len = len || 32
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  const maxPos = chars.length
  let pwd = ''
  for (let i = 0; i < len; i++)
    pwd += chars.charAt(Math.floor(Math.random() * maxPos))

  return pwd
}

export function get_suffix(filename) {
  const pos = filename.lastIndexOf('.')
  let suffix = ''
  if (pos !== -1)
    suffix = filename.substring(pos)

  return suffix
}

export async function uploadFile(file: File): Promise<any> {
  const resp = await service.get(`https://api-company.lingman.tech/api/storage/minio?type=hr&filename=${file.name}`) as string
  await fetch(resp, {
    method: 'PUT',
    body: file,
  })
  const urlObj = new URL(resp)
  return {
    size: file.size,
    fileUrl: urlObj.origin + urlObj.pathname,
    ext: file.name.split('.').pop(),
    id: null,
    name: file.name,
    contentType: null,
    fileType: null,
  }
}

export async function uploadFiles(file: File | File[]): Promise<any> {
  const files = [file].flat()
  const formData = new FormData()
  files.forEach((file) => {
    formData.append('files', file)
  })
  const config = {
    timeout: 0,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }
  return await service.post('/api/attachment/uploads', formData, config).catch((e) => {
    ElMessage.error(e || '文件上传失败')
    return new Promise(() => { })
  })
}

export async function uploadFileToPublic(file: File): Promise<any> {
  const formData = new FormData()
  formData.append('file', file)
  const config = {
    timeout: 0,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }
  return await service.post('/api/public/uploadPublic', formData, config).catch((e) => {
    ElMessage.error(e || '文件上传失败')
    return new Promise(() => { })
  })
}

export async function uploadImgFile(file: File) {
  if (file.size / 1024 / 1024 <= 1)
    return uploadFile(file)
  const res = await compressAccurately(file, file.size * 0.4 / 1024)
  return uploadFile(new File([res], file.name))
}

export async function uploadImgFileToPublic(file: File) {
  if (file.size / 1024 / 1024 <= 1)
    return uploadFileToPublic(file)
  const res = await compressAccurately(file, file.size * 0.4 / 1024)
  return uploadFile(new File([res], file.name))
}
