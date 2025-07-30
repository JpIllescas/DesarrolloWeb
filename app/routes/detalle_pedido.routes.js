module.exports = app => {
    const detalle_pedidos = require("../controllers/detalle_pedido.controller.js");
    var router = require("express").Router();
    router.post("/create/", detalle_pedidos.create);
    router.get("/", detalle_pedidos.findAll);
    router.get("/status", detalle_pedidos.findAllStatus);
    router.get("/:id", detalle_pedidos.findOne);
    router.put("/update/:id", detalle_pedidos.update);
    router.delete("/delete/:id", detalle_pedidos.delete);
    router.delete("/delete/", detalle_pedidos.deleteAll);
    app.use("/api/detalle_pedido", router);
};