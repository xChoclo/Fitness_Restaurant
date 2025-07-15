const Factura = require('../models/factura.models');
const Cliente = require('../models/clientes.model');
const DetalleFactura = require('../models/detalleFactura.models');
const sequelize = require('../config/database'); // Asegúrate de importar tu instancia

const crearFactura = async (req, res) => {
    console.log("🟢 Se entró al método crearFactura");

    const clienteId = req.session.persona_id;

    if (!clienteId) {
        return res.redirect('/login');
    }

    const t = await sequelize.transaction();
    try {
        const cliente = await Cliente.findByPk(clienteId);
        if (!cliente) return res.redirect('/login');

        const { carrito, total } = req.body;

        if (!carrito || !Array.isArray(carrito) || total == null) {
            return res.status(400).json({ error: "Datos incompletos, por favor agregué platos al carrito." });
        }

        // Crear la factura
        const nuevaFactura = await Factura.create({
            fecha: new Date(),
            hora: new Date(),
            clienteId: clienteId,
            total: parseFloat(total)
        }, { transaction: t });

        // Guardar los detalles de la factura
        for (const item of carrito) {
            await DetalleFactura.create({
                cantidadProductos: item.cantidad, // o item.cantidadProductos según tu frontend
                FacturaId: nuevaFactura.id,
                PlatoId: item.plato_id // asegúrate que el campo sea plato_id en el carrito
            }, { transaction: t });
        }

        await t.commit();
        console.log(`Factura creada con ID: ${nuevaFactura.id}`);
        return res.status(200).json({ message: "Factura creada" });

    } catch (e) {
        await t.rollback();
        console.error("❌ Error en crearFactura:", e);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

module.exports = { crearFactura };