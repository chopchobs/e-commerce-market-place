const prisma = require("../config/prisma");

// Create Category - create
exports.AddCategory =async (req, res, next) => {
    try {
        // code
        const {name} = req.body;
        // Create
        const AddNameCategory = await prisma.category.create({
            data:{
                name:name,
            }
        })
        // res.json({ res:AddNameCategory});
        res.status(200).send({ message: 'Add Name Successful' });
    } catch (error) {
        next(error);
        res.status(500).json({ message: 'Failed to create category' });
    }
};
// Get Categories - findMany
exports.List = async(req, res, next) => {
    try {
        // code
        const ListName = await prisma.category.findMany()
        console.log(ListName)
        res.status(200).send({ message: 'List Name of Category successfully' });
    } catch (error) {
        next(error);
        res.status(500).json({ message: 'Failed to fetch categories' });
    }
};

// Delete Category - Params
exports.Remove = async(req, res, next) => {
    try {
        // code
        const {id} = req.params
        const  Remove = await prisma.category.delete({
            where:{
                id:Number(id)
                //change string to number for delete by params   
            }
        })
        res.status(200).send({ Remove, message: 'Category deleted successfully' });
    } catch (error) {
        next(error);
        res.status(500).json({ message: 'Failed to delete category' });
    }
};