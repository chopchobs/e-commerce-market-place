// route.put('/user/order');
exports.EditUserOrder = async(req,res,next)=>{
    try {
        // code

        res.sent({message:'Edit User Order Successfully'});
    } catch (error) {
        next(error);
        res.status(500).json({message:'Failed to Edit User Order'});
    }
}

// route.get('/admin/orders');
exports.ListAdminOrder = async()=>{
    try {
        //code

        res.sent({message:'List Admin Order Successfully'});
    } catch (error) {
        next(error);
        res.status(500).json({message:'Failed to List Admin Order'});
    }
}