definePageMeta({
  layout: 'default'
});

<script setup lang="ts">
import { useAuthStore } from "~/store/auth";
import { getPocketBase } from "~/lib/pocketbase";

const authStore = useAuthStore();
const pb = getPocketBase();


const state = reactive({
  pages: [] as any[],
  loading: true,
  showCreateForm: false,
  editingPage: null as any,
  showEditForm: false,
  deletingPage: null as any,
  showDeleteConfirm: false,
  duplicatingPage: null as any,
});
const formData = reactive({
  title: '',
  slug: '',
  published: false,
  inMenu: false,
  menuOrder: 0,
  footerGroup: '',
  metaTitle: '',
  metaDescription: '',
});
const loadPages = async () => {
  try {
    state.loading = true;
    console.log('Loading pages with auth token:', pb.authStore.token);
    const pages = await pb.collection('pages').getFullList(200, {
      sort: '-created',
      expand: 'seo,containers,subpages'
    });
    state.pages = pages;
  } catch (error: any) {
    console.error('Error loading pages:', error);
    console.error('Error details:', {
      status: error.status,
      message: error.message,
      data: error.data
    });
  } finally {
    state.loading = false;
  }
};
const createPage = async () => {
  try {
    // First create the SEO info record
    const seoData = {
      slug: formData.slug,
      title: formData.metaTitle || formData.title,
      description: formData.metaDescription || ''
    };
    const seoRecord = await pb.collection('seoinfos').create(seoData);

    // Then create the page with the SEO record ID
    const data = {
      title: formData.title,
      slug: formData.slug,
      published: formData.published,
      inMenu: formData.inMenu,
      menuOrder: formData.menuOrder,
      footerGroup: formData.footerGroup || null,
      seo: seoRecord.id,
      containers: [],
      subpages: []
    };

    console.log('Creating page with auth token:', pb.authStore.token);
    console.log('PocketBase auth state before create:', {
      isValid: pb.authStore.isValid,
      token: pb.authStore.token,
      model: pb.authStore.model
    });

    // Check if the token is actually being sent in headers
    console.log('PocketBase instance headers:', pb.authStore.token ? 'Authorization: ' + pb.authStore.token : 'No auth token');

    await pb.collection('pages').create(data);
    await loadPages();
    resetForm();
    state.showCreateForm = false;
  } catch (error: any) {
    console.error('Error creating page:', error);
    console.error('Error details:', {
      status: error.status,
      message: error.message,
      data: error.data
    });
  }
};
const updatePage = async () => {
  try {
    // Update the SEO info record if it exists
    if (state.editingPage.seo) {
      const seoData = {
        slug: formData.slug,
        title: formData.metaTitle || formData.title,
        description: formData.metaDescription || ''
      };
      await pb.collection('seoinfos').update(state.editingPage.seo, seoData);
    }

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
const duplicateComponent = async (componentId: string) => {
  try {
    const originalComponent = await pb.collection('components').getOne(componentId);
    const duplicatedComponent = await pb.collection('components').create({
      type: originalComponent.type,
      content: originalComponent.content
    });
    return duplicatedComponent.id;
  } catch (error) {
    console.error('Error duplicating component:', error);
    throw error;
  }
};

const duplicateBlock = async (blockId: string) => {
  try {
    const originalBlock = await pb.collection('blocks').getOne(blockId, {
      expand: 'blocks'
    });

    // Recursively duplicate nested blocks
    const duplicatedNestedBlocks = [];
    if (originalBlock.blocks && originalBlock.blocks.length > 0) {
      for (const nestedBlockId of originalBlock.blocks) {
        const duplicatedNestedBlockId = await duplicateBlock(nestedBlockId);
        duplicatedNestedBlocks.push(duplicatedNestedBlockId);
      }
    }

    const duplicatedBlock = await pb.collection('blocks').create({
      type: originalBlock.type,
      content: originalBlock.content,
      blocks: duplicatedNestedBlocks
    });

    return duplicatedBlock.id;
  } catch (error) {
    console.error('Error duplicating block:', error);
    throw error;
  }
};

const duplicateContainer = async (containerId: string) => {
  try {
    const originalContainer = await pb.collection('containers').getOne(containerId);

    const containerData: any = {};

    // Duplicate component if exists
    if (originalContainer.component) {
      containerData.component = await duplicateComponent(originalContainer.component);
    }

    // Duplicate block if exists
    if (originalContainer.block) {
      containerData.block = await duplicateBlock(originalContainer.block);
    }

    const duplicatedContainer = await pb.collection('containers').create(containerData);
    return duplicatedContainer.id;
  } catch (error) {
    console.error('Error duplicating container:', error);
    throw error;
  }
};

const duplicatePage = async (page: any) => {
  if (state.duplicatingPage) return; // Prevent multiple simultaneous duplications

  try {
    state.duplicatingPage = page.id;
    console.log('Duplicating page:', page);

    // Generate unique slug for the copy
    let copySlug = `${page.slug}-copy`;
    let copyTitle = `${page.title} - Copy`;
    let copyCounter = 1;

    // Check if slug already exists and increment until unique
    while (true) {
      try {
        await pb.collection('pages').getFirstListItem(`slug="${copySlug}"`);
        copyCounter++;
        copySlug = `${page.slug}-copy-${copyCounter}`;
        copyTitle = `${page.title} - Copy ${copyCounter}`;
      } catch (error) {
        // Slug is unique (404 error means it doesn't exist)
        if (error.status === 404) break;
        throw error;
      }
    }

    // First create a new SEO info record
    const seoData = {
      slug: copySlug,
      title: `${page.expand?.seo?.title || page.title} - Copy${copyCounter > 1 ? ` ${copyCounter}` : ''}`,
      description: page.expand?.seo?.description || ''
    };
    const seoRecord = await pb.collection('seoinfos').create(seoData);

    // Duplicate all containers
    const duplicatedContainers = [];
    if (page.containers && page.containers.length > 0) {
      for (const containerId of page.containers) {
        const duplicatedContainerId = await duplicateContainer(containerId);
        duplicatedContainers.push(duplicatedContainerId);
      }
    }

    // Duplicate subpages if any (recursive)
    const duplicatedSubpages = [];
    if (page.subpages && page.subpages.length > 0) {
      for (const subpageId of page.subpages) {
        try {
          const subpage = await pb.collection('pages').getOne(subpageId, {
            expand: 'containers,seo'
          });
          const duplicatedSubpage = await duplicatePage(subpage);
          duplicatedSubpages.push(duplicatedSubpage.id);
        } catch (error) {
          console.warn('Could not duplicate subpage:', subpageId, error);
        }
      }
    }

    // Create the duplicated page
    const data = {
      title: copyTitle,
      slug: copySlug,
      published: false, // Set to draft by default
      inMenu: false, // Remove from menu by default
      menuOrder: page.menuOrder || 0,
      footerGroup: page.footerGroup || null,
      seo: seoRecord.id,
      containers: duplicatedContainers,
      subpages: duplicatedSubpages
    };

    const duplicatedPage = await pb.collection('pages').create(data);
    await loadPages();
    console.log('Page duplicated successfully with all content');
    return duplicatedPage;
  } catch (error: any) {
    console.error('Error duplicating page:', error);
    alert(`Error duplicating page: ${error.message || 'Please try again.'}`);
  } finally {
    state.duplicatingPage = null;
  }
};
const resetForm = () => {
  formData.title = '';
  formData.slug = '';
  formData.published = false;
  formData.inMenu = false;
  formData.menuOrder = 0;
  formData.footerGroup = '';
  formData.metaTitle = '';
  formData.metaDescription = '';
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
  formData.metaTitle = page.expand?.seo?.title || '';
  formData.metaDescription = page.expand?.seo?.description || '';
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
  console.log('PocketBase auth state:', {
    isValid: pb.authStore.isValid,
    token: pb.authStore.token,
    model: pb.authStore.model
  });
  
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
                  @click="duplicatePage(page)"
                  :disabled="state.duplicatingPage === page.id"
                  class="text-green-600 hover:text-green-900 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ state.duplicatingPage === page.id ? 'Duplicating...' : 'Duplicate' }}
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
              <div>
                <label class="block text-sm font-medium text-gray-700">Meta Title</label>
                <input
                  v-model="formData.metaTitle"
                  type="text"
                  placeholder="Leave empty to use page title"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Meta Description</label>
                <textarea
                  v-model="formData.metaDescription"
                  rows="3"
                  placeholder="SEO description for this page"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
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
              <div>
                <label class="block text-sm font-medium text-gray-700">Meta Title</label>
                <input
                  v-model="formData.metaTitle"
                  type="text"
                  placeholder="Leave empty to use page title"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Meta Description</label>
                <textarea
                  v-model="formData.metaDescription"
                  rows="3"
                  placeholder="SEO description for this page"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
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
                class="px-4 py-2 bg-red text-white rounded-md hover:bg-red-700"
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
