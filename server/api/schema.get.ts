import PocketBase from 'pocketbase'

export default defineEventHandler(async (event) => {
  try {
    // Get server URL from runtime config
    const config = useRuntimeConfig()
    const serverUrl = config.SERVER_URL || process.env.SERVER_URL || 'http://localhost:8090'

    console.log('Schema endpoint - Server URL:', serverUrl)
    console.log('Schema endpoint - Admin email:', process.env.POCKETBASE_ADMIN_EMAIL)

    const pb = new PocketBase(serverUrl)

    // Try to authenticate as admin first, then fallback to user auth
    try {
      const adminEmail = process.env.POCKETBASE_ADMIN_EMAIL || 'admin@admin.com'
      const adminPassword = process.env.POCKETBASE_ADMIN_PASSWORD || 'admin123456'

      console.log('Attempting admin auth with:', adminEmail)

      await pb.admins.authWithPassword(adminEmail, adminPassword)
      console.log('Admin authentication successful')
    } catch (authError) {
      console.error('Admin authentication failed, trying user auth:', authError)

      // Try user authentication as fallback
      try {
        const userEmail = process.env.POCKETBASE_ADMIN_EMAIL || 'admin@admin.com'
        const userPassword = process.env.POCKETBASE_ADMIN_PASSWORD || 'admin123456'

        await pb.collection('users').authWithPassword(userEmail, userPassword)
        console.log('User authentication successful')
      } catch (userAuthError) {
        console.error('User authentication also failed:', userAuthError)

        return {
          error: 'Authentication failed',
          message: 'Could not authenticate with PocketBase (tried admin and user)',
          serverUrl,
          adminAuthError: authError.message || 'Unknown admin auth error',
          userAuthError: userAuthError.message || 'Unknown user auth error'
        }
      }
    }

    // Since we can't access collections API, return a hardcoded schema
    // based on what we know from the codebase
    const schema = {
      collections: [
        {
          name: 'pages',
          type: 'base',
          schema: [
            { name: 'title', type: 'text', required: true },
            { name: 'slug', type: 'text', required: true },
            { name: 'published', type: 'bool' },
            { name: 'inMenu', type: 'bool' },
            { name: 'menuOrder', type: 'number' },
            { name: 'footerGroup', type: 'text' },
            { name: 'seo', type: 'relation', options: { collectionId: 'seoinfos' } },
            { name: 'containers', type: 'relation', options: { collectionId: 'containers', maxSelect: null } },
            { name: 'subpages', type: 'relation', options: { collectionId: 'pages', maxSelect: null } }
          ]
        },
        {
          name: 'containers',
          type: 'base',
          schema: [
            { name: 'component', type: 'relation', options: { collectionId: 'components', maxSelect: 1 } },
            { name: 'block', type: 'relation', options: { collectionId: 'blocks', maxSelect: 1 } }
          ]
        },
        {
          name: 'components',
          type: 'base',
          schema: [
            { name: 'type', type: 'text', required: true },
            { name: 'content', type: 'json' }
          ]
        },
        {
          name: 'blocks',
          type: 'base',
          schema: [
            { name: 'type', type: 'text', required: true },
            { name: 'content', type: 'json' },
            { name: 'blocks', type: 'relation', options: { collectionId: 'blocks', maxSelect: null } }
          ]
        },
        {
          name: 'seoinfos',
          type: 'base',
          schema: [
            { name: 'slug', type: 'text', required: true },
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'text' }
          ]
        }
      ]
    }

    console.log('Returning hardcoded schema with', schema.collections.length, 'collections')
    return schema
  } catch (error) {
    console.error('Schema endpoint error:', error)

    return {
      error: 'Failed to export schema',
      message: error.message || 'Unknown error',
      stack: error.stack || 'No stack trace available'
    }
  }
})
