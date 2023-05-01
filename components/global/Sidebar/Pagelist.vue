<script setup lang="ts">
  const {pb} = usePocketbase()
  const emit = defineEmits(['setTitle'])

  const data = reactive({
    pending: true,
    pagelist: [],
  })

  const getPagelist = async () =>{
    try{
      const res = await pb.collection("pages").getFullList(200 /* batch size */, {
        sort: "-created",
      });
      data.pending = false
      data.pagelist = res
    }catch(err){
      data.pending = false
      console.log('error getting pagelist', err);
    }
  }

  onMounted(() => {
    emit('setTitle', 'Edit Pages')
    getPagelist()
  })

</script>

<template>
  <div>
    <div v-if="data.pending" class="w-full h-60 my-8 flex items-center justify-center">
      <nuxt-icon name="icon-pending" class="text-4xl animate-spin" />
    </div>
    <div class="my-8" v-else>
      <div v-for="page in data.pagelist" :key="page.id" class="flex items-center justify-between p-6 hover:bg-black hover:bg-opacity-5 rounded-md cursor-pointer">
        <div class="flex items-center">
          <ListEntry name="Slug" class="mr-10">
            /{{ page.slug }}
          </ListEntry>
          <ListEntry name="Title">
            {{ page.title }}
          </ListEntry>
        </div>
        <ListEntry name="Published">
          <template v-if="page.published">
            <div class="bg-green rounded-full flex items-center justify-center w-5 h-5 mt-1">
              <nuxt-icon name="icon-check" class="text-xl" />
            </div>
          </template>
          <template v-else>
            <div class="bg-red rounded-full flex items-center justify-center w-5 h-5 mt-1">
              <nuxt-icon name="icon-cross" class="text-xl" />
            </div>
          </template>
        </ListEntry>

      </div>
    </div>
  </div>

</template>