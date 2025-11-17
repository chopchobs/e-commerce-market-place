const prisma = require("../config/prisma");

// router.get('/users')
exports.ListUsers = async (req,res,next)=>{
    try {
        // code
        const users = await prisma.user.findMany({
            select:{
                id:true,
                email:true,
                role:true,
                enabled:true,
                address:true,
            }
        })
        res.status(200).json({ users })
    } catch (error) {
        next(error);
        res.status(500).json({message:'Failed to List User'})
    }
}

// router.post('Change - Enabled') login
exports.AddChangeStatus = async(req,res,next)=>{
    try {
        // code
        const { id, enabled }=req.body;
        const UpdateStatusEnabled = await prisma.user.update({
            where:{ id:Number(id)},
            data:{ enabled:enabled},
            select:{
                id:true,
                email:true,
                role:true,
                enabled:true,
                address:true,
            }
        })
        res.send({ 
            UpdateStatusEnabled, 
            message:'Add Change Status Successfully'})
    } catch (error) {
        next(error);
        res.status(500).send({ message:'Failed to Add Change Status'})

    }
}

// router.post('Change - Role') admin or user
exports.AddChangeRole = async(req,res,next)=>{
    try {
        // code
        const {id,role} = req.body;
        const UpdateStatusRole = await prisma.user.update({
            where:{id:Number(id)},
            data:{role:role},
            select:{
                id:true,
                email:true,
                role:true,
                enabled:true,
                address:true,
            }
        })
        // console.log(UpdateStatusRole)
        res.status(200).send({
            UpdateStatusRole,
            message:'Add Change Role Successfully'})
    } catch (error) {
        next(error);
        res.status(500).json({message:'Failed to Add Change Role'})
    }
}

// router.get('/user/cart')
exports.ListUserCart = async (req,res,next)=>{
    try {
        // code
        const { cart } = req.body;
        const { id  }= req.user;
        // check User 
        const user = await prisma.user.findFirst({
            where:{
                id:Number(id),
            }
        })
        // delete all-cart in user's cart
       await prisma.productOnCart.deleteMany({
            where:{
               cart:{
                orderedById:user.id,
               }
            }
       })
        //  delete order by user's order in cart
        await prisma.cart.deleteMany({
            where:{ orderedById:user.id,}
        })
        // Prepare Product
        let products = cart.map(( item )=>({
            productId: item.id,
            count: item.count,
            price: item.price,
        }))
        // Cart-Total 
        // .reduce \ item = default value \ sum = new value
        let cartTotal = products.reduce((sum,item)=>
            sum + item.price * item.count,0) // 0 = default
        // Create Cart
        const CreateCart = await prisma.cart.create({
          data:{
            products:{
                create: products
            },
            cartTotal:cartTotal,
            orderedById:user.id 
          }
        })
    //   console.log(CreateCart);
        res.status(200).json({
            CreateCart,
            message:'Add Product in Cart Successfully'})
    } catch (error) {
        next(error);
        res.status(500).json({
            message:'Failed to List User Cart'})
    }
}

// router.delete('/user/cart')
exports.DeleteUserCart = (req,res,next)=>{
    try {
        // code
        // console.log(req.body)
        res.send({message:'Delete User Cart Successfully'})
    } catch (error) {
        next(error);
        res.status(500).json({message:'Failed to Delete User Cart'})
    }
}

// router.post('/user/cart')
exports.AddUserCart = async(req,res,next)=>{
    try {
        // code
    //    console.log(req.body)
        res.send({
            message:'Add Cart Successfully'})
    } catch (error) {
        next(error);
        res.status(500).json({message:'Failed to Add User Cart'})
    }
}

// router.post('/user/address')
exports.AddAddress = (req,res,next)=>{
    try {
        // code
        // console.log(req.body)
        res.send({message:'Add address Successfully'})
    } catch (error) {
        next(error);
        res.status(500).json({message:'Failed to Add Address'})
    }
}

// router.post('/user/order')
exports.AddUserOrder = (req,res,next)=>{
    try {
        // code
        // console.log(req.body)
        res.send({message:'Add User Order Successfully '})
    } catch (error) {
        next(error);
        res.status(500).json({message:'Failed to Add User Order'})
    }
}

// router.get('/user/order')
exports.ListUserOrder = (req,res,next)=>{
    try {
        // code
        // console.log(req.body)
        res.send({message:'List User Order Successfully'})
    } catch (error) {
        next(error);
        res.status(500).json({message:'Failed to User Order'})
    }
}