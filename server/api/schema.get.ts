import PocketBase from 'pocketbase'

export default defineEventHandler(async (event) => {
  // Use the same logic as the composable
  let serverUrl: string
  if (process.server) {
    serverUrl = process.env.SERVER_URL!
  } else {
    serverUrl = (window as any).__NUXT__?.config?.public?.SERVER_URL!
  }
  
  // Remove trailing slash to prevent double slashes
  serverUrl = serverUrl.replace(/\/$/, '')
  
  const pb = new PocketBase(serverUrl)
  
  try {
    // Authenticate as admin to access collections
    await pb.admins.authWithPassword(
      process.env.POCKETBASE_ADMIN_EMAIL || 'admin@example.com',
      process.env.POCKETBASE_ADMIN_PASSWORD || 'password'
    )
    
    // Get all collections
    const collections = await pb.collections.getList(1, 500)
    
    const schema = {
      collections: collections.items.map(collection => ({
        name: collection.name,
        type: collection.type,
        schema: collection.schema,
        indexes: collection.indexes,
        listRule: collection.listRule,
        viewRule: collection.viewRule,
        createRule: collection.createRule,
        updateRule: collection.updateRule,
        deleteRule: collection.deleteRule,
        options: collection.options
      }))
    }
    
    return schema
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to export schema'
    })
  }
})
