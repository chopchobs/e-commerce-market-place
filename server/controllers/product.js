const prisma = require("../config/prisma");

// Create - POST
exports.AddProduct = async (req, res, next) => {
  try {
    // CREATE
    const { title, description, price, quantity, categoryId, images } =
      req.body;
    const CreateProduct = await prisma.product.create({
      data: {
        title: title,
        description: description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        categoryId: parseFloat(categoryId),
        images: {
          // create - .map
          create: images.map((item) => {
            asset_id: item.asset_id;
            public_id: item.public_id;
            url: item.url;
            secure_url: item.secure_url;
          }),
        },
      },
    });
    res.status(200).json({
      CreateProduct,
      message: "Create Product successfully",
    });
  } catch (error) {
    next(error);
    res.status(500).json({ message: "Failed to Create Product" });
  }
};
// LIST:Count  - GET
exports.ListProduct = async (req, res, next) => {
  try {
    // FindMany
    const { count } = req.params;
    const ListProducts = await prisma.product.findMany({
      take: parseInt(count),
      orderBy: { createdAt: "asc" },
      include: {
        category: true,
        images: true,
      },
    });
    res.status(200).json({
      ListProducts,
      message: "Fetch Product Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to Fetch Product" });
  }
};
// Read - GET,iD
exports.ReadProduct = async (req, res, next) => {
  try {
    //code
    const { id } = req.params;
    const ReadProducts = await prisma.product.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        category: true,
        images: true,
      },
    });
    console.log(id);
    res.status(200).json({
      ReadProducts,
      message: "Read Product Successfully!!",
    });
  } catch (error) {
    next(error);
    res.status(500).send({ message: "Failed Read Product!!" });
  }
};
// Update - PUT,iD
exports.UpdateProduct = async (req, res, next) => {
  try {
    //code
    const { id } = req.params;
    const { title, description, price, quantity, categoryId, images } =
      req.body;
    await prisma.image.deleteMany({
      where: {
        productId: Number(id), // OrCart,Order
      },
    });
    const UpdateProducts = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        title: title,
        description: description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        categoryId: parseFloat(categoryId),
        images: {
          create: images.map((item) => ({
            asset_id: item.asset_id,
            public_id: item.public_id,
            url: item.url,
            secure_url: item.secure_url,
          })),
        },
      },
    });
    res.status(200).send({
      UpdateProducts,
      message: "Update Product Successfully!!",
    });
  } catch (error) {
    next(error);
    res.status(500).send({
      message: "Failed Update!!",
    });
  }
};
// Delete product - DELETE,iD
exports.RemoveProduct = async (req, res, next) => {
  try {
    // code
    const { id } = req.params;
    const DeleteProduct = await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).send({
      DeleteProduct,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    next(error);
    res.status(500).json({ message: "Failed to delete Product" });
  }
};
// List Product by Filters - POST
exports.ListProductByFilters = async (req, res, next) => {
  try {
    // code
    const { sort, order, limit } = req.body;
    const ListFilters = await prisma.product.findMany({
      take: limit,
      orderBy: { [sort]: order },
      include: { category: true },
    });
    res.status(200).json({
      ListFilters,
      message: "List Product Filters Successfully",
    });
  } catch (error) {
    next(error);
    res.status(500).json({
      message: "Failed to List Product Filters",
    });
  }
};
// ------- Handle -------
// handle Query ( ประเภท )
const hldQuery = async (req, res, query) => {
  try {
    //code
    const products = await prisma.product.findMany({
      where: {
        title: {
          contains: query, //contains - มีคำนี้อยู่ภายในข้อความ
        },
      },
      include: {
        category: true,
        images: true,
      },
    });
    res.status(200).send({
      products,
      message: "handleQuery",
    });
  } catch (error) {
    next(error);
  }
};
// handle Price [ น้อย,มาก ]
const hldPrice = async (req, res, priceRange) => {
  try {
    const hldPrice = await prisma.product.findMany({
      where: {
        price: {
          gte: priceRange[0],
          lte: priceRange[1],
        },
      },
      include: {
        category: true,
        images: true,
      },
    });
    res.status(200).send({
      hldPrice,
      message: "Price",
    });
  } catch (error) {
    res.status(400).send(error);
  }
};
// handle Category ( id )
const hldCategory = async (req, res, categoryId) => {
  try {
    // code
    const hldCategory = await prisma.product.findMany({
      where: {
        categoryId: {
          in: categoryId.map((id) => Number(id)),
        },
      },
      include: {
        category: true,
        images: true,
      },
    });
    res.status(200).send({
      hldCategory,
      message: "Category",
    });
  } catch (error) {
    res.status(400).send(error);
  }
};
// --------------
exports.SearchFilter = async (req, res, query) => {
  try {
    // code
    const { query, price, category } = req.body;
    if (query) {
      console.log("Query:", query);
      await hldQuery(req, res, query);
    }
    if (price) {
      console.log("Price:", price);
      await hldPrice(req, res, price);
    }
    if (category) {
      console.log("Category", category);
      await hldCategory(req, res, category);
    }
    // res.send({ message: 'Search Product Successfully' });
  } catch (error) {
    next(error);
    res.status(500).json({
      message: "Failed to Search Product ",
    });
  }
};
