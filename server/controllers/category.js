// Create Category
exports.Add = (req, res, next) => {
    try {
        // code

        // console.log(req.body);
        res.send({ message: 'Create category' });
    } catch (error) {
        next(error);
        res.status(500).json({ message: 'Failed to create category' });
    }
};
// Get Categories
exports.List = (req, res, next) => {
    try {
        // code
        res.send({ message: 'Get categories successfully' });
    } catch (error) {
        next(error);
        res.status(500).json({ message: 'Failed to fetch categories' });
    }
};

// Delete Category
exports.Remove = (req, res, next) => {
    try {
        // code
        console.log (req.params.id)
        res.send({ message: 'Category deleted successfully' });
    } catch (error) {
        next(error);
        res.status(500).json({ message: 'Failed to delete category' });
    }
};