definePageMeta({
  layout: 'default'
});

<script setup lang="ts">
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();
const { pb } = usePocketbase();


const state = reactive({
  pages: [] as any[],
  loading: true,
  showCreateForm: false,
  editingPage: null as any,
  showEditForm: false,
  deletingPage: null as any,
  showDeleteConfirm: false,
});
const formData = reactive({
  title: '',
  slug: '',
  published: false,
  inMenu: false,
  menuOrder: 0,
  footerGroup: '',
});
const loadPages = async () => {
  try {
    state.loading = true;
    const pages = await pb.collection('pages').getFullList(200, {
      sort: '-created',
      expand: 'seo,containers,subpages'
    });
    state.pages = pages;
  } catch (error) {
    console.error('Error loading pages:', error);
  } finally {
    state.loading = false;
  }
};
const createPage = async () => {
  try {
    const data = {
      title: formData.title,
      slug: formData.slug,
      published: formData.published,
      inMenu: formData.inMenu,
      menuOrder: formData.menuOrder,
      footerGroup: formData.footerGroup || null,
    };

    await pb.collection('pages').create(data);
    await loadPages();
    resetForm();
    state.showCreateForm = false;
  } catch (error) {
    console.error('Error creating page:', error);
    alert('Error creating page. Please try again.');
  }
};
const updatePage = async () => {
  try {
    const data = {
      title: formData.title,
      slug: formData.slug,
      published: formData.published,
      inMenu: formData.inMenu,
      menuOrder: formData.menuOrder,
      footerGroup: formData.footerGroup || null,
    };

    await pb.collection('pages').update(state.editingPage.id, data);
    await loadPages();
    resetForm();
    state.showEditForm = false;
    state.editingPage = null;
  } catch (error) {
    console.error('Error updating page:', error);
    alert('Error updating page. Please try again.');
  }
};
const deletePage = async () => {
  try {
    await pb.collection('pages').delete(state.deletingPage.id);
    await loadPages();
    state.showDeleteConfirm = false;
    state.deletingPage = null;
  } catch (error) {
    console.error('Error deleting page:', error);
    alert('Error deleting page. Please try again.');
  }
};
const resetForm = () => {
  formData.title = '';
  formData.slug = '';
  formData.published = false;
  formData.inMenu = false;
  formData.menuOrder = 0;
  formData.footerGroup = '';
};
const openCreateForm = () => {
  resetForm();
  state.showCreateForm = true;
};
const openEditForm = (page: any) => {
  console.log('Opening edit form for page:', page);
  state.editingPage = page;
  formData.title = page.title || '';
  formData.slug = page.slug || '';
  formData.published = page.published || false;
  formData.inMenu = page.inMenu || false;
  formData.menuOrder = page.menuOrder || 0;
  formData.footerGroup = page.footerGroup || '';
  state.showEditForm = true;
  console.log('Edit form state:', { showEditForm: state.showEditForm, editingPage: state.editingPage });
};
const openDeleteConfirm = (page: any) => {
  state.deletingPage = page;
  state.showDeleteConfirm = true;
};
const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};
watch(() => formData.title, (newTitle) => {
  if (newTitle && !formData.slug) {
    formData.slug = generateSlug(newTitle);
  }
});

// Load pages on mount
onMounted(async () => {
  // Check authentication after middleware has run
  if (!pb.authStore.isValid) {
    await navigateTo('/login');
    return;
  }
  loadPages();
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Pages Management</h1>
        <p class="mt-2 text-gray-600">Manage your website pages</p>
      </div>

      <!-- Actions -->
      <div class="mb-6 flex justify-between items-center">
        <div class="flex gap-4">
          <button
            @click="openCreateForm"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
          >
            Create New Page
          </button>
        </div>
        <button
          @click="loadPages"
          :disabled="state.loading"
          class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md font-medium disabled:opacity-50"
        >
          {{ state.loading ? 'Loading...' : 'Refresh' }}
        </button>
      </div>

      <!-- Loading State -->
      <div
        v-if="state.loading"
        class="text-center py-8"
      >
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="mt-2 text-gray-600">Loading pages...</p>
      </div>

      <!-- Pages Table -->
      <div
        v-else
        class=""
      >
        <div
          v-if="state.pages.length === 0"
          class="text-center py-8 text-gray-500"
        >
          No pages found. Create your first page to get started.
        </div>
        <div
          v-else
          class="flex flex-col gap-2"
        >
          <div
            v-for="page in state.pages"
            :key="page.id"
            class="px-6 py-4 bg-white shadow rounded-md"
          >
            <div class="flex items-center justify-between">
              <div class="flex gap-2">
                <div class="flex items-center gap-3">
                  <h3 class="text-lg font-medium text-gray-900 w-28 overflow-hidden text-ellipsis whitespace-nowrap">
                    {{ page.title }}</h3>
                  <div
                    class="w-20 rounded-full flex items-center justify-center text-xs py-0.5"
                    :class="page.published ? 'bg-green-100 text-green-800': 'bg-gray-100 text-gray-800'"
                  >
                    <template v-if="page.published">
                      Published
                    </template>
                    <template v-else>
                      Draft
                    </template>
                  </div>
                  <div
                    class="w-20 rounded-full flex items-center justify-center text-xs py-0.5"
                    :class="page.inMenu ? 'bg-blue-100 text-blue-800': ''"
                  >
                  <template v-if="page.inMenu">
                    In Menu
                  </template>
                  <template v-else>
                  </template>
                  </div>
                </div>
                <div class="mt-1 text-sm text-gray-500">
                  <span class="font-mono">{{ page.slug || 'No slug' }}</span>
                  <span
                    v-if="page.footerGroup"
                    class="ml-4"
                  >
                    Footer: {{ page.footerGroup }}
                  </span>
                  <span
                    v-if="page.menuOrder"
                    class="ml-4"
                  >
                    Order: {{ page.menuOrder }}
                  </span>
                </div>
                <div class="mt-1 text-xs text-gray-400">
                  Created: {{ new Date(page.created).toLocaleDateString() }}
                  <span v-if="page.updated !== page.created">
                    • Updated: {{ new Date(page.updated).toLocaleDateString() }}
                  </span>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <button
                  @click="openEditForm(page)"
                  class="text-blue-600 hover:text-blue-900 text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  @click="openDeleteConfirm(page)"
                  class="text-red-600 hover:text-red-900 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Create Form Modal -->
      <div
        v-if="state.showCreateForm"
        class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      >
        <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <div class="mt-3">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Create New Page</h3>
            <form
              @submit.prevent="createPage"
              class="space-y-4"
            >
              <div>
                <label class="block text-sm font-medium text-gray-700">Title *</label>
                <input
                  v-model="formData.title"
                  type="text"
                  required
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Slug</label>
                <input
                  v-model="formData.slug"
                  type="text"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div class="flex items-center">
                <input
                  v-model="formData.published"
                  type="checkbox"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label class="ml-2 block text-sm text-gray-900">Published</label>
              </div>
              <div class="flex items-center">
                <input
                  v-model="formData.inMenu"
                  type="checkbox"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label class="ml-2 block text-sm text-gray-900">Show in Menu</label>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Menu Order</label>
                <input
                  v-model.number="formData.menuOrder"
                  type="number"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Footer Group</label>
                <select
                  v-model="formData.footerGroup"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">None</option>
                  <option value="Infos">Infos</option>
                  <option value="Leistungen">Leistungen</option>
                  <option value="Rechtliches">Rechtliches</option>
                </select>
              </div>
              <div class="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  @click="state.showCreateForm = false"
                  class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Create Page
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Edit Form Modal -->
      <div
        v-if="state.showEditForm"
        @click="state.showEditForm = false; state.editingPage = null"
        class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
        style="background-color: rgba(0, 0, 0, 0.8) !important; z-index: 9999 !important;"
      >
        <div @click.stop class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" style="z-index: 10000 !important;">
          <div class="mt-3">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Edit Page</h3>
            <form
              @submit.prevent="updatePage"
              class="space-y-4"
            >
              <div>
                <label class="block text-sm font-medium text-gray-700">Title *</label>
                <input
                  v-model="formData.title"
                  type="text"
                  required
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Slug</label>
                <input
                  v-model="formData.slug"
                  type="text"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div class="flex items-center">
                <input
                  v-model="formData.published"
                  type="checkbox"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label class="ml-2 block text-sm text-gray-900">Published</label>
              </div>
              <div class="flex items-center">
                <input
                  v-model="formData.inMenu"
                  type="checkbox"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label class="ml-2 block text-sm text-gray-900">Show in Menu</label>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Menu Order</label>
                <input
                  v-model.number="formData.menuOrder"
                  type="number"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Footer Group</label>
                <select
                  v-model="formData.footerGroup"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">None</option>
                  <option value="Infos">Infos</option>
                  <option value="Leistungen">Leistungen</option>
                  <option value="Rechtliches">Rechtliches</option>
                </select>
              </div>
              <div class="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  @click="state.showEditForm = false; state.editingPage = null"
                  class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Update Page
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div
        v-if="state.showDeleteConfirm"
        class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      >
        <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <div class="mt-3">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Delete Page</h3>
            <p class="text-gray-600 mb-6">
              Are you sure you want to delete "<strong>{{ state.deletingPage?.title }}</strong>"?
              This action cannot be undone.
            </p>
            <div class="flex justify-end gap-3">
              <button
                @click="state.showDeleteConfirm = false; state.deletingPage = null"
                class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                @click="deletePage"
                class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete Page
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
