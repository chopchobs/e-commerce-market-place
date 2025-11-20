const prisma = require("../config/prisma");

// route.put('/user/order');
exports.EditUserOrder = async (req,res,next)=>{
    try {
        // code
        const { orderId, orderStatus} =req.body;
        const OrderUpdate = await prisma.order.update({
            where:{ id:orderId },
             data:{ orderStatus: orderStatus, }
        })
        res.status(200).send({
            OrderUpdate,
            message:'Edit User Order Successfully'});
    } catch (error) {
        next(error);
        res.status(500).json({
            message:'Failed to Edit User Order'});
    }
}

// route.get('/admin/orders');
exports.ListAdminOrder = async (req,res,next)=>{
    try {
        //code
        const ListOrders = await prisma.order.findMany({
            include:{
                products:{
                    include:{
                        product:true
                    }
                },orderedBy:{
                    select:{
                        id:true,
                        email:true,
                        role: true,
                        enabled: true,
                        address: true,
                    }
                }   
            }
        })
        // console.log(ListOrders)
        res.status(200).send({
            ListOrders,
            message:'List Admin Order Successfully'});
    } catch (error) {
        next(error);
        res.status(500).json({
            message:'Failed to List Admin Order'});
    }
}