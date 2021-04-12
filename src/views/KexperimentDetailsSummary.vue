<template>
  <div>
    <q-table :data="data" :columns="columns" row-key="name" dense flat square />
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        { name: 'time', label: '时间', field: 'name', align: 'left', style: 'width:300px' },
        { name: 'behavior', label: '操作', field: 'behavior', align: 'left' },
        { name: '', label: '', field: '', align: 'left' },
      ],
      data: [
        {
          name: '2021-02-23 13:15:11',
          behavior: '进入情境导入',
        },
        {
          name: '2021-02-23 13:15:40',
          behavior: '选择探索摩擦力',
        },
        {
          name: '2021-02-23 13:17:40',
          behavior: '完成测试挑战—前测',
        },
      ],
    }
  },
}
</script>
