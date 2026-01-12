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
    console.log(error);
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
      DeleteImages,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error: Failed to delete Product" });
  }
};

// ------- Search Filter -------
// Main Search Filter ( public ) - Query, Category, Price, Sort,limit
exports.SearchFilter = async (req, res, next) => {
  try {
    // code Category,SortBy
    const { query, price, category, sort, limit } = req.body;
    // create empty object
    const where = {};
    // Text Search
    if (query) {
      where.title = {
        contains: query,
      };
    }
    // Category [other-types [1,3,6] ]
    if (category && category.length > 0) {
      where.categoryId = {
        in: category.map((id) => Number(id)),
      };
    }
    // Price Range
    if (price && price.length === 2) {
      where.price = {
        gte: price[0],
        lte: price[1],
      };
    }
    // orderBy
    const handleSort = (sortValue) => {
      switch (sortValue) {
        case "price_desc":
          return { price: "desc" };
        case "price_asc":
          return { price: "asc" };
        case "popular":
          return { sold: "desc" };
        case "newest":
        default:
          return { createdAt: "desc" };
      }
    };
    // function
    const orderBy = handleSort(sort);
    //  ยิง Query
    const products = await prisma.product.findMany({
      take: parseInt(limit) || 20, // จำกัดจำนวน
      where: where, // ใส่เงื่อนไข Search/Filter
      orderBy: orderBy, // ใส่เงื่อนไข Sort
      include: {
        category: true,
        images: true,
      },
    });
    res.status(200).json({
      ListFilters: products,
      message: "Search & Filter Success",
    });
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
    const images = req.body.images;
    // Validate images
    if (!images) {
      return res.status(400).json({ message: "No image provided" });
    }
    // Upload images
    const uploadResult = await cloudinary.uploader.upload(images, {
      // เพิ่ม Random กันไฟล์ชื่อซ้ำระดับมิลลิวินาที
      public_id: `Product-${Date.now()}-${Math.round(Math.random() * 1000)}`,
      resource_type: "auto",
      folder: "ImageProduct-Ecom",
    });
    // Response
    res.status(200).json({
      uploadResult,
      message: "Upload success",
    });
  } catch (error) {
    console.log("Cloudinary Upload Error:", error);
    res.status(500).json({
      message: "Server Error: Failed to upload image",
    });
  }
};

// Image - Remove
exports.RemoveImage = async (req, res, next) => {
  try {
    // json
    const { public_id } = req.body;
    //Validated
    if (!public_id) {
      return res.status(400).json({ message: "No Public ID provided" });
    }
    const result = await cloudinary.uploader.destroy(public_id);
    // check cloudinary send back - { result: 'ok' }, 'not found'
    if (result.result === "ok") {
      res.status(200).json({
        message: "Image Deleted Successfully!!",
      });
    } else {
      res.status(400).json({
        message: "Image not found or already deleted",
      });
    }
  } catch (error) {
    console.log("Remove Image Error:", error);
    res.status(500).json({
      message: "Server Error: Failed to remove image",
    });
  }
};
