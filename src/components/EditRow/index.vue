<script lang="ts">
import { isString } from 'lingman-web'
import { uploadFile, uploadImgFile } from '@/utils/upload'

const acceptMeta = {
  image: 'image/*',
  video: 'video/*',
  audio: 'audio/*',
  file: '*',
}

interface FileType {
  key: string
  extra: any
  value: File
}
export default defineComponent({
  props: {
    modelValue: {
      type: [] as PropType<any>,
      default: '',
    },
    title: {
      type: String,
      require: true,
    },
    titleWidth: {
      type: [String, Number],
      default: 110,
    },
    placeholder: {
      type: String,
    },
    options: {
      type: Array<{ label: string, value: any, disabled?: boolean, children?: any[] }>,
      default: () => [{ label: '选项一', value: 1 }, { label: '选项二', value: 2 }] as any[],
    },
    type: {
      type: String as PropType<'text' | 'textarea' | 'select' | 'image' | 'video' | 'radio' | 'file' | 'cascader' | 'switch' | 'date' | 'date_time'>,
      default: 'text',
    },
    suffix: {
      type: String,
      default: '',
    },
    accept: {
      type: String,
      default: '',
    },
    autosize: {
      type: Object,
      default: () => ({
        minRows: 4,
        maxRows: 100,
      }),
    },
    props: {
      type: Object,
      default: () => ({}),
    },
    width: {
      type: [String, Number],
      default: 100,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'file', 'change'],
  setup(props, { emit }) {
    const inputVal = ref(props.modelValue)
    const fileVal = ref([] as FileType[])
    const loading = ref(false)
    const multiple = Array.isArray(props.modelValue)

    watch(() => props.modelValue, (val) => {
      inputVal.value = val
      if (props.type === 'file' && !val)
        fileVal.value = []
    })

    watch(() => inputVal.value, (val) => {
      emit('update:modelValue', val)
    })
    watch(() => fileVal.value, (val) => {
      if (val.length) {
        if (multiple)
          emit('file', (inputVal.value as string[]).map(i => fileVal.value.find(f => f.key === i)))
        else
          emit('file', val[0])
      }
    })
    const inputWidth = computed(() => isString(props.width) ? Number.isNaN(Number(props.width)) ? props.width : `${props.width}px` : `${props.width}px`)
    const singleUploadAttrs = () => ({
      action: '#',
      showFileList: false,
      accept: props.accept || acceptMeta[props.type],
      onChange: async (file) => {
        let uploadedData = {} as any
        loading.value = true
        if (props.type === 'image')
          uploadedData = await uploadImgFile(file.raw)

        if (props.type === 'file')
          uploadedData = await uploadFile(file.raw)

        loading.value = false
        if (multiple)
          inputVal.value = [...(inputVal.value as any[]), uploadedData.fileUrl]
        else
          inputVal.value = uploadedData.fileUrl
        fileVal.value = [...fileVal.value, { key: uploadedData.fileUrl, value: file.raw, extra: uploadedData }]
      },
      autoUpload: false,
    })
    function handleChange(val: any) {
      emit('change', val)
    }

    return { inputVal, fileVal, inputWidth, loading, multiple, singleUploadAttrs, handleChange }
  },
})
</script>

<template>
  <div class="item-input">
    <div
      class="star ml--8 shrink-0 w-110px" :class="!required ? 'before:opacity-0' : ''"
      :style="{ width: `${titleWidth}px` }"
    >
      {{ title ? `${title}:` : '' }}
    </div>
    <div class="right">
      <slot :row="inputVal">
        <div v-if="type === 'image' && !multiple" class="flex">
          <div v-if="inputVal" class="relative fc" :class="inputVal ? 'mr-10' : ''">
            <svg-icon name="Close" class="fwbold !absolute top-0 right-0 cp z-1" @click="inputVal = ''"></svg-icon>
            <el-image
              v-if="inputVal" class="w50 h50 mr10" :src="inputVal" :hide-on-click-modal="true"
              :preview-teleported="true" :preview-src-list="[inputVal]"
            />
          </div>

          <el-upload v-else v-bind="singleUploadAttrs()">
            <div v-loading="loading" class="w50 h50 flex items-center justify-center" border="1 #e5e5e5 dashed">
              <svg-icon name="Plus" />
            </div>
          </el-upload>
        </div>

        <div v-else-if="type === 'image' && multiple" class="flex">
          <div v-for="i, idx in inputVal" :key="idx" class="relative fc" :class="inputVal ? 'mr-10' : ''">
            <svg-icon
              name="Close" class="fwbold !absolute top-0 right-0 cp z-1"
              @click="inputVal = [inputVal].flat().filter(c => c !== i)"
            ></svg-icon>
            <el-image
              class="w50 h50 mr10" :src="i" :hide-on-click-modal="true" :preview-teleported="true"
              :preview-src-list="inputVal"
            />
          </div>

          <el-upload v-bind="singleUploadAttrs()">
            <div v-loading="loading" class="w50 h50 flex items-center justify-center" border="1 #e5e5e5 dashed">
              <svg-icon name="Plus" />
            </div>
          </el-upload>
        </div>

        <div v-else-if="type === 'file' && !multiple" class="flex h50">
          <div v-if="fileVal.length || inputVal" class="relative fc" :class="fileVal.length ? 'mr-10' : ''">
            <svg-icon
              name="Close" class="fwbold !absolute top-0 right-0 cp z-1"
              @click="(fileVal = [], inputVal = '')"
            ></svg-icon>
            <span class="fwbold">{{ fileVal[0]?.value.name || inputVal }}</span>
          </div>

          <el-upload v-else v-bind="singleUploadAttrs()">
            <div v-loading="loading" class="w50 h50 flex items-center justify-center" border="1 #e5e5e5 dashed">
              <svg-icon name="Plus" />
            </div>
          </el-upload>
        </div>

        <div v-else-if="type === 'file' && multiple" class="flex h50">
          <div v-for="i, idx in [inputVal].flat()" :key="idx" class="relative fc" :class="fileVal ? 'mr-10' : ''">
            <svg-icon
              name="Close" class="fwbold !absolute top-0 right-0 cp z-1"
              @click="inputVal = [inputVal].flat().filter(c => c !== i)"
            ></svg-icon>
            <span class="fwbold">{{ fileVal.find(f => f.key === i)?.value.name }}</span>
          </div>

          <el-upload v-bind="singleUploadAttrs()">
            <div v-loading="loading" class="w50 h50 flex items-center justify-center" border="1 #e5e5e5 dashed">
              <svg-icon name="Plus" />
            </div>
          </el-upload>
        </div>

        <el-select
          v-else-if="type === 'select'" v-model="inputVal" :multiple="Array.isArray(inputVal)" v-bind="$attrs"
          :style="{ width: inputWidth }" :placeholder="placeholder" @change="handleChange"
        >
          <el-option
            v-for="item in options" :key="item.value" :label="item.label" :value="item.value"
            :disabled="item.disabled"
          >
          </el-option>
        </el-select>

        <el-cascader
          v-else-if="type === 'cascader'" v-model="inputVal" :style="{ width: inputWidth }" v-bind="$attrs"
          :options="options" :props="{ ...props }" @change="handleChange"
        >
        </el-cascader>

        <el-radio-group
          v-else-if="type === 'radio'" v-model="inputVal" :style="{ width: inputWidth }"
          :placeholder="placeholder" v-bind="$attrs" @change="handleChange"
        >
          <el-radio-button v-for="item in options" :key="item.value" :label="item.value" :disabled="item.disabled">
            {{ item.label }}
          </el-radio-button>
        </el-radio-group>

        <el-switch v-else-if="type === 'switch'" v-model="inputVal" v-bind="$attrs" />
        <el-date-picker
          v-else-if="type === 'date'" v-model="inputVal" type="date" value-format="YYYY-MM-DD"
          :placeholder="placeholder" v-bind="$attrs"
        />
        <el-date-picker
          v-else-if="type === 'date_time'" v-model="inputVal" type="datetime" :placeholder="placeholder"
          v-bind="$attrs"
        />

        <el-input
          v-else v-model="inputVal" :style="{ width: inputWidth }" :type="type" :placeholder="placeholder"
          :autosize="autosize" v-bind="$attrs" :disabled="disabled" @change="handleChange"
        >
          <template v-if="suffix" #append>{{ suffix }}</template>
        </el-input>
      </slot>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.item-input {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;

  // 最后一个不要margin-bottom
  &:last-child {
    margin-bottom: 0;
  }

  .inp {
    width: 200px;
  }

  .left {
    width: 110px;
    flex-shrink: 0;
  }

  .right {
    width: 0px;
    flex: 1;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
}
</style>
