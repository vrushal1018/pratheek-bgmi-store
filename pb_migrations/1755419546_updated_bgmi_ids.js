/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3306043931")

  // add field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "number2366571986",
    "max": null,
    "min": null,
    "name": "kd",
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
  collection.fields.removeById("number2366571986")

  return app.save(collection)
})
