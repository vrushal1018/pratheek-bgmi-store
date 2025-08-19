/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3306043931")

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "json3775105792",
    "maxSize": 0,
    "name": "skins",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3306043931")

  // remove field
  collection.fields.removeById("json3775105792")

  return app.save(collection)
})
