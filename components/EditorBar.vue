<script setup>
  import { useAuthStore } from "~/store/auth";
  import { useContentStore } from "~/store/content";
  const authStore = useAuthStore();
  const contentStore = useContentStore();
  const { logout } = authStore;

  const data = reactive({
    modalVisible: false,
  });
</script>
<template>
  <div class="bg-lilac text-darkLilac py-4">
    <div class="max-container">
      <div class="flex items-center justify-between">
        <div>
          {{ authStore?.user?.name }}
        </div>
        <div class="flex items-center">
          <button
            @click="contentStore.$patch({
              debugVisible: !contentStore.debugVisible
            })"
            class="rounded-sm border border-darkLilac px-3 py-1 mx-2"
          >
            Debug
          </button>
          <button
            @click="data.modalVisible = true"
            class="rounded-sm border border-darkLilac px-3 py-1 mx-2"
          >
            Edit Pages
          </button>
          <div
            @click="logout"
            class="text-red border-red rounded-sm cursor-pointer mx-2 flex items-center"
          >
            <nuxt-icon name="icon-trash" class="text-3xl" />
            Logout
          </div>
        </div>
      </div>
    </div>

    <div class="fixed bg-lilac w-full h-full top-0 left-0 py-4" v-if="data.modalVisible">
      <div class="max-container">
        <div class="flex items-center justify-between">
          <div class="font-bold text-xl">Edit Pages</div>
          <button
            @click="data.modalVisible = false"
            class="rounded-sm border border-red text-red px-3 py-1 flex items-center"
          >
            <nuxt-icon name="icon-cross" class="text-xl" /> Close
          </button>
        </div>

        <div>
          <Pagelist />
        </div>
      </div>
    </div>
  </div>
</template>
