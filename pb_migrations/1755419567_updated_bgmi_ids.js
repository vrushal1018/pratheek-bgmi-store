/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3306043931")

  // add field
  collection.fields.addAt(9, new Field({
    "hidden": false,
    "id": "number103159226",
    "max": null,
    "min": null,
    "name": "matches",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3306043931")

  // remove field
  collection.fields.removeById("number103159226")

  return app.save(collection)
})
