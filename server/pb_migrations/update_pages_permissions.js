migrate((db) => {
  // Update pages collection permissions to allow authenticated users
  const pagesCollection = db.collections.findOne({ name: 'pages' });
  
  if (pagesCollection) {
    // Allow authenticated users to perform all operations
    pagesCollection.listRule = '@request.auth.id != ""';
    pagesCollection.viewRule = '@request.auth.id != ""';
    pagesCollection.createRule = '@request.auth.id != ""';
    pagesCollection.updateRule = '@request.auth.id != ""';
    pagesCollection.deleteRule = '@request.auth.id != ""';
    
    db.collections.update(pagesCollection.id, pagesCollection);
  }
});
