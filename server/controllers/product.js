// Create product - POST
exports.AddProduct = (req, res, next) => {
    try {
        // code

        console.log(req.body);
        res.send({ message: 'Create Product successfully' });
    } catch (error) {
        next(error);
        res.status(500).json({ message: 'Failed to Create Product' });
    }
};
// Get product - GET
exports.ListProduct = (req, res, next) => {
    try {
        // code
        res.send({ message: 'Get Product Successfully' });
    } catch (error) {
        next(error);
        res.status(500).json({ message: 'Failed to Fetch Product' });
    }
};

// Delete product - DELETE
exports.RemoveProduct = (req, res, next) => {
    try {
        // code
        // console.log (req.params.id)
        res.send({ message: 'Product Deleted Successfully' });
    } catch (error) {
        next(error);
        res.status(500).json({ message: 'Failed to delete Product' });
    }
};

// List Product by Filters - POST
exports.ListProductByFilters = (req, res, next) => {
    try {
        // code
        console.log (req.params.id)
        res.send({ message: 'List Product Filters Successfully' });
    } catch (error) {
        next(error);
        res.status(500).json({ message: 'Failed to List Product Filters' });
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