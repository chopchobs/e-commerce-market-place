const prisma = require("../config/prisma");

// Create product - POST
exports.AddProduct = async(req, res, next) => {
    try {
     // code
    const {title,description,price,quantity,categoryId,images} = req.body;
    const CreateProduct = await prisma.product.create({
        data:{
            title:title,
            description:description,
            price:parseFloat(price),
            quantity:parseInt(quantity),
            categoryId:parseFloat(categoryId),
            images:{
                create:images.map((item)=>{
                    asset_id:item.asset_id   
                    public_id:item.public_id
                    url:item.url       
                    secure_url:item.secure_url
                })
            }
        }
    })
        // console.log(CreateProduct)
        res.status(200).send({
            CreateProduct,
             message: 'Create Product successfully' });
    } catch (error) {
        next(error);
        res.status(500).json({ message: 'Failed to Create Product' });
    }
};

// Get product - GET,count
exports.ListProduct = async(req, res, next) => {
    try {
        // code
        const { count }= req.params;
        const ListProducts = await prisma.product.findMany({
            take: parseInt(count),
            orderBy: { createdAt:'asc' },
            include: {
                category:true,
                images:true,
            }
        });
        res.status(200).send({ 
            ListProducts, 
            message: 'Get Product Successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to Fetch Product' });
    }
};

// Read - GET,iD
exports.ReadProduct = async(req,res,next)=>{
    try {
        //code
        const { id }= req.params;
        const ReadProducts = await prisma.product.findFirst({
            where:{
                id:Number(id),
            },include:{
                category:true,
                images:true,
            }
        })
        console.log(id)
        res.status(200).json({
            ReadProducts,
            message:'Read Product Successfully!!'
        })
    } catch (error) {
        next(error);
        res.status(500).send({message:'Failed Read Product!!'})
    }
}

// Update - PUT,iD
exports.UpdateProduct = async(req,res,next)=>{
    try {
       //code
       const {id} = req.params;
        const { title,description,price,quantity,categoryId,images }=req.body;
        await prisma.image.deleteMany({
            where:{
                productId:Number(id),
            }
        })
        const UpdateProducts = await prisma.product.update({
            where:{
                id:Number(id),
            },data:{
                title: title,
                description: description,
                price: parseFloat(price),
                quantity: parseInt(quantity),
                categoryId: parseFloat(categoryId),
                images:{
                    create:images.map((item)=>({
                        asset_id: item.asset_id,
                        public_id: item.public_id,
                        url: item.url,
                        secure_url: item.secure_url,
                    }))
                }
            }
        })
       res.status(200).send({
            UpdateProducts,
            message:'Update Product Successfully!!'}); 
    } catch (error) {
        next(error);
        res.status(500).send({
            message:'Failed Update!!'}) 
    }
}

// Delete product - DELETE,iD
exports.RemoveProduct = async (req, res, next) => {
    try {
        // code
        const {id} = req.params;
        const DeleteProduct = await prisma.product.delete({
            where:{
                id:Number(id),
            }
        })
        res.status(200).send({
            DeleteProduct, 
            message: 'Product Deleted Successfully' });
    } catch (error) {
        next(error);
        res.status(500).json({ message: 'Failed to delete Product' });
    }
};

// List Product by Filters - POST
exports.ListProductByFilters = async(req, res, next) => {
    try {
        // code
        const {sort,order,limit} = req.body;
        const ListFilters = await prisma.product.findMany({
            take:limit,
            orderBy:{[sort]:order},
            include:{category:true},
        })  
        res.status(200).json({ 
            ListFilters,
            message: 'List Product Filters Successfully' });
    } catch (error) {
        next(error);
        res.status(500).json({ 
            message: 'Failed to List Product Filters' 
        });
    }
};

// Search Filters - POST
exports.SearchFilters = (req, res, next) => {
    try {
        // code
        console.log (req.params.id)
        res.send({ message: 'Search Product Successfully' });
    } catch (error) {
        next(error);
        res.status(500).json({ message: 'Failed to Search Product ' });
    }
};