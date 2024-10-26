const express = require('express');
const app = express();

const cors=require('cors')
const UserRoutes=require('./routes/user.routes')
const productRoutes=require('./routes/product.routes')
const categoryRoutes=require('./routes/category.routes')
app.use(cors())
app.use(express.static('public'))
app.use( express.json())
app.use([UserRoutes, productRoutes,categoryRoutes])
module.exports=app