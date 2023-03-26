migrate((db) => {
  const snapshot = [
    {
      "id": "_pb_users_auth_",
      "created": "2023-02-14 11:18:56.287Z",
      "updated": "2023-03-19 18:36:25.175Z",
      "name": "users",
      "type": "auth",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "users_name",
          "name": "name",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "users_avatar",
          "name": "avatar",
          "type": "file",
          "required": false,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "maxSize": 5242880,
            "mimeTypes": [
              "image/jpeg",
              "image/png",
              "image/svg+xml",
              "image/gif",
              "image/webp"
            ],
            "thumbs": null
          }
        }
      ],
      "listRule": null,
      "viewRule": "id = @request.auth.id",
      "createRule": "",
      "updateRule": null,
      "deleteRule": "id = @request.auth.id",
      "options": {
        "allowEmailAuth": true,
        "allowOAuth2Auth": true,
        "allowUsernameAuth": true,
        "exceptEmailDomains": null,
        "manageRule": null,
        "minPasswordLength": 8,
        "onlyEmailDomains": null,
        "requireEmail": false
      }
    },
    {
      "id": "cxrevb3nmqu6hq3",
      "created": "2023-02-14 11:33:20.087Z",
      "updated": "2023-02-14 11:33:20.087Z",
      "name": "seoInfos",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "aq9yo0vi",
          "name": "title",
          "type": "text",
          "required": true,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "sztkxbgi",
          "name": "description",
          "type": "text",
          "required": true,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        }
      ],
      "listRule": null,
      "viewRule": null,
      "createRule": null,
      "updateRule": null,
      "deleteRule": null,
      "options": {}
    },
    {
      "id": "ske173fqqpdprcb",
      "created": "2023-02-14 11:33:50.522Z",
      "updated": "2023-02-14 23:10:10.718Z",
      "name": "pages",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "mu5kmwny",
          "name": "slug",
          "type": "text",
          "required": true,
          "unique": true,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "i69rghho",
          "name": "title",
          "type": "text",
          "required": true,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "79tgeoyd",
          "name": "published",
          "type": "bool",
          "required": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "wy9egqgw",
          "name": "seo",
          "type": "relation",
          "required": true,
          "unique": false,
          "options": {
            "collectionId": "cxrevb3nmqu6hq3",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "bfzbys1h",
          "name": "blocks",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "p38xsub7upbc9ty",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": null,
            "displayFields": []
          }
        }
      ],
      "listRule": "",
      "viewRule": "",
      "createRule": null,
      "updateRule": null,
      "deleteRule": null,
      "options": {}
    },
    {
      "id": "p38xsub7upbc9ty",
      "created": "2023-02-14 11:36:32.798Z",
      "updated": "2023-03-12 17:29:53.862Z",
      "name": "blocks",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "pu5ixcxr",
          "name": "name",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        }
      ],
      "listRule": "",
      "viewRule": "",
      "createRule": null,
      "updateRule": null,
      "deleteRule": null,
      "options": {}
    }
  ];

  const collections = snapshot.map((item) => new Collection(item));

  return Dao(db).importCollections(collections, true, null);
}, (db) => {
  return null;
})
