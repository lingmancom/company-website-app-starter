interface ID {
  id: number
}

interface UserInfo {
  id: number
  name: string
  role: number
  avatar: string
  nick_name: string
  linkTags: string[]
}

interface Policy {
  accessid: string
  policy: string
  signature: string
  host: string
  expire: string
  dir: string
}

interface Project {
  id: string
  title: string
  config: string
  name: string
  projectName: string
}

interface ApiLog {
  title: string
  level: string
  message: string
  itemId: string
  project: string
  environment: string
  logtype: string
  topic: string
  source: string
  tag_ClientIp: string
  tag_ReceiveTime: string
  time: string
  apiSenderName: string
  apiException: string
  isException: boolean
  apiSenderId: string
  apiElapseTime: number
  apiPath: string
  ip: string
}

interface DatabaseModel {
  id: string
  name: string
}

interface PermissionsUser {
  hasPriviliges: {
    id: string
    name: string
    avatar: string
  }[]
  noPriviliges: {
    id: string
    name: string
    avatar: string
  }[]
}

interface ProjectPermissionsList {
  appId: string
  project: string
  config: string
  projectName: string
}
