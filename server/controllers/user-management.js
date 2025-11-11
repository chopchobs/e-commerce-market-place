// router.get('/users')
exports.ListUsers = (req,res,next)=>{
    try {
        // code
        // console.log(req.body)
        res.send({message:'List User Successfully'})
    } catch (error) {
        next(error);
        res.status(500).json({message:'Failed to List User'})
    }
}

// router.post('/change-status')
exports.AddChangeStatus = (req,res,next)=>{
    try {
        // code
        // console.log(req.body)
        res.send({message:'Add Change Status Successfully'})
    } catch (error) {
        next(error);
        res.status(500).json({message:'Failed to Add Change Status'})

    }
}

// router.post('/change-role')
exports.AddChangeRole = (req,res,next)=>{
    try {
        // code
        // console.log(req.body)
        res.send({message:'Add Change Role Successfully'})
    } catch (error) {
        next(error);
        res.status(500).json({message:'Failed to Add Change Role'})
    }
}

// router.post('/user/cart')
exports.AddUserCart = (req,res,next)=>{
    try {
        // code
        // console.log(req.body)
        res.send({message:'Add User Cart Successfully'})
    } catch (error) {
        next(error);
        res.status(500).json({message:'Failed to Add User Cart'})
    }
}

// router.get('/user/cart')
exports.ListUserCart = (req,res,next)=>{
    try {
        // code
        // console.log(req.body)
        res.send({message:'List User Cart Successfully'})
    } catch (error) {
        next(error);
        res.status(500).json({message:'Failed to List User Cart'})
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