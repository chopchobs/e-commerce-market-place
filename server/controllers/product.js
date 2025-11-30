const prisma = require("../config/prisma");
const cloudinary = require("cloudinary").v2; // cloudinary
// CRUD Operations - Product

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
          create: images.map((item) => ({
            asset_id: item.asset_id,
            public_id: item.public_id,
            url: item.url,
            secure_url: item.secure_url,
          })),
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
// List - GET, Count
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
exports.UpdateProducts = async (req, res, next) => {
  try {
    // Push code
    const { id } = req.params;
    const { title, description, price, quantity, categoryId, images } =
      req.body;
    // 1. Delete existing images from database
    await prisma.image.deleteMany({
      where: {
        productId: Number(id),
      },
    });
    // 2. Update product details and add new images
    const UpdateProducts = await prisma.product.update({
      where: {
        id: Number(id),
      },
      // New Data to Update
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
// Delete - DELETE,iD
exports.RemoveProduct = async (req, res, next) => {
  try {
    // code
    const { id } = req.params;
    // 1. Include images - delete from cloudinary
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: { images: true },
    });
    console.log(product);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    // 2. Map through images and create deletion promises
    const DeleteImages = product.images.map((item) => {
      return new Promise((resolve, reject) => {
        // delete from cloudinary
        cloudinary.uploader.destroy(item.public_id, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        });
      });
    });
    // แบบสั้น (ทำงานเหมือนกัน)
    // const DeleteImages = product.images.map((item) => {
    //   return cloudinary.uploader.destroy(item.public_id);
    // });

    // 3. Wait for all deletions to complete
    await Promise.all(DeleteImages);
    // 4. Delete from database
    await prisma.product.delete({
      where: { id: Number(id) },
    });
    res.status(200).send({
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error: Failed to delete Product" });
  }
};

// ------- ListProduct By Filters -------
exports.ListProductByFilters = async (req, res, next) => {
  try {
    // code
    const { sort, order, limit } = req.body;
    //
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
// ------- Search Filter -------
// 1.Query ( ค้นหาด้วยคำ )
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
// 2.Price [ ราคา ]
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
// 3.Category [ หมวดหมู่ ]
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
// Main Search Filter
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

// ------- Image Upload & Remove -------
// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_AIP_KEY,
  api_secret: process.env.CLOUDINARY_AIP_SECRET,
});
// Image - Upload
exports.UploadImages = async (req, res, next) => {
  try {
    // json
    const uploadResult = await cloudinary.uploader.upload(req.body.images, {
      public_id: `Image Product-${Date.now()}`,
      resource_type: "auto",
      folder: "ImageProduct-Ecom",
    });
    console.log(req.body);
    res.status(200).json({
      uploadResult,
    });
  } catch (error) {
    next(error);
    res.status(500).json({
      message: "Failed Upload !! ",
    });
  }
};
// Image - Remove
exports.RemoveImage = async (req, res, next) => {
  try {
    // json
    const { public_id } = req.body;
    cloudinary.uploader.destroy(public_id, (error, result) => {
      if (error) {
        console.log("Error deleting image:", error);
        return res.status(500).json({ message: "Failed to delete image" });
      }
      res.status(200).json({
        result,
        message: "Image Deleted Successfully !! ",
      });
    });
  } catch (error) {
    next(error);
    res.status(500).json({
      message: "Failed Remove Image !! ",
    });
  }
};
