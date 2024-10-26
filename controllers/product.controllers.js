const Product = require('../models/product.model');

async function getProducts(req, res) {
    try {
        // Inicializa el array de filtros
        const filter = [];
        
        // Agrega filtro por nombre si el parámetro name está presente en la query
        if (req.query.name) {
            filter.push({ name: { $regex: req.query.name, $options: 'i' } });
        }
        
        // Agrega filtro por precio mínimo si el parámetro min_price está presente en la query
        if (req.query.min_price) {
            filter.push({ price: { $gte: req.query.min_price } });
        }

        // Crea la consulta basada en si hay filtros aplicados o no
        const query = filter.length > 0 ? { $and: filter } : {};

        // Ejecuta la búsqueda de productos basados en los filtros aplicados o devuelve todos los productos si no hay filtros
        const products = await Product.find(query).select('name price image').sort({price:1});
        
        // Devuelve la lista de productos obtenida
        return res.status(200).send({
            message: "Productos obtenidos correctamente",
            products
        });
    } catch (error) {
        console.log(error);
        // Maneja cualquier error durante la obtención de productos
        return res.status(500).send({ message: 'Error al obtener los productos' });
    }
}

async function createProduct(req, res) {
    try {
        
        // Crea una nueva instancia del modelo Product con los datos enviados en el body de la request
        const product = new Product(req.body);
        


        if (req.file){
            product.image=req.file.filename
        }
        // Guarda el nuevo producto en la base de datos
        const newProduct = await product.save();
        
        // Devuelve el producto recién creado
        return res.status(201).send({
            message: 'Producto creado correctamente',
            product: newProduct
        });
    } catch (error) {
        console.log(error);
        // Maneja cualquier error durante la creación del producto
        return res.status(500).send({ message: 'Error al crear el producto' });
    }
}

// Exporta las funciones para que puedan ser utilizadas en otros archivos
module.exports = {
    getProducts,
    createProduct
};
