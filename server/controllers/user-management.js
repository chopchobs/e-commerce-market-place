const prisma = require("../config/prisma");

// router.get('/users')
exports.ListUsers = async (req, res, next) => {
  try {
    // code
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        enabled: true,
        address: true,
      },
    });
    res.status(200).json({ users });
  } catch (error) {
    next(error);
    res.status(500).json({ message: "Failed to List User" });
  }
};
// router.post('Change - Enabled') login
exports.AddChangeStatus = async (req, res, next) => {
  try {
    // code
    const { id, enabled } = req.body;
    const UpdateStatusEnabled = await prisma.user.update({
      where: { id: Number(id) },
      data: { enabled: enabled },
      select: {
        id: true,
        email: true,
        role: true,
        enabled: true,
        address: true,
      },
    });
    res.send({
      UpdateStatusEnabled,
      message: "Add Change Status Successfully",
    });
  } catch (error) {
    next(error);
    res.status(500).send({ message: "Failed to Add Change Status" });
  }
};
// router.post('Change - Role') admin or user
exports.AddChangeRole = async (req, res, next) => {
  try {
    // code
    const { id, role } = req.body;
    const UpdateStatusRole = await prisma.user.update({
      where: { id: Number(id) },
      data: { role: role },
      select: {
        id: true,
        email: true,
        role: true,
        enabled: true,
        address: true,
      },
    });
    res.status(200).send({
      UpdateStatusRole,
      message: "Add Change Role Successfully",
    });
  } catch (error) {
    next(error);
    res.status(500).json({ message: "Failed to Add Change Role" });
  }
};

// Cart Add - (.post)
exports.UserCart = async (req, res, next) => {
  try {
    // code
    const { cart } = req.body;
    const { id } = req.user;
    // Check User - Id
    const user = await prisma.user.findFirst({
      where: {
        id: Number(id),
      },
    });
    // Delete All-Cart by User
    await prisma.productOnCart.deleteMany({
      where: {
        cart: {
          orderedById: user.id,
        },
      },
    });
    //  Delete Order
    await prisma.cart.deleteMany({
      where: { orderedById: user.id },
    });
    // Prepare Product
    let products = cart.map((item) => ({
      productId: item.id,
      count: item.count,
      price: item.price,
    }));
    // Calculate
    let cartTotal = products.reduce(
      (sum, item) => sum + item.price * item.count,
      0
    );
    // Create Cart
    const CreateCart = await prisma.cart.create({
      data: {
        products: {
          create: products,
        },
        cartTotal: cartTotal,
        orderedById: user.id,
      },
    });
    res.status(200).json({
      message: "Add Product in Cart Successfully",
    });
  } catch (error) {
    next(error);
    res.status(500).json({
      message: "Failed to List User Cart",
    });
  }
};
// Cart List - (.get)
exports.getUserCart = async (req, res, next) => {
  try {
    // code
    const { id } = req.user;
    const UserCart = await prisma.cart.findFirst({
      where: {
        orderedById: Number(id),
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
    // Not Have Cart
    if (!UserCart) {
      return res.status(200).json({
        products: [], // ส่ง array ว่าง
        cartTotal: 0, // ยอดเงิน 0
        message: "No cart found",
      });
    }
    // Have Cart
    res.status(200).json({
      UserCartId: UserCart.id,
      products: UserCart.products,
      cartTotal: UserCart.cartTotal,
      message: `List product's User Cart Successfully!!`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Failed to List product's User Cart` });
  }
};
// Cart Delete - (.delete)
exports.emptyUserCart = async (req, res, next) => {
  try {
    // code
    const { id } = req.user;
    const UserCart = await prisma.cart.findFirst({
      where: { orderedById: Number(id) },
    });
    if (!UserCart) {
      return res.status(400).send({ message: "No Cart" });
    }
    // Delete - Cart in Order
    await prisma.productOnCart.deleteMany({
      where: {
        cartId: UserCart.id,
      },
    });
    // Delete - Pro
    const Result = await prisma.cart.deleteMany({
      where: {
        orderedById: UserCart.id,
      },
    });
    res.status(200).json({
      DeletedCount: Result.count,
      message: "Cart Empty Successfully!!",
    });
  } catch (error) {
    next(error);
    res.status(500).json({
      message: "Failed to Delete Cart",
    });
  }
};

// Address Add - (.post)
exports.saveAddress = async (req, res, next) => {
  try {
    // code
    const { id } = req.user;
    const { address } = req.body;
    const addressUser = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        address: address,
      },
    });
    res.send({
      addressUser,
      message: "Add address Successfully",
    });
  } catch (error) {
    next(error);
    res.status(500).json({ message: "Failed to Add Address" });
  }
};

// Order Add - (.post)
exports.saveUserOrder = async (req, res, next) => {
  try {
    // code
    const { id } = req.user;
    const UserCart = await prisma.cart.findFirst({
      where: {
        orderedBy: {
          id: Number(id),
        },
      },
      include: {
        products: true,
      },
    });
    // Check Empty Cart
    if (!UserCart || UserCart.products.length === 0) {
      return res.status(400).json({
        ok: false,
        message: "Cart is Empty",
      });
    }
    // Check Quantity in Stock
    for (const item of UserCart.products) {
      // [ .findUnique ]
      const product = await prisma.product.findUnique({
        where: { id: item.productId }, // item.productId - User's id in Cart
        select: { quantity: true, title: true }, // Product
      });

      // console.log('User need:',item)
      // console.log('Product in Stock:',product)

      // CHECK \ sold-out \ not have
      if (!product || item.count > product.quantity) {
        return res.status(400).send({
          message: `Unable to complete the transaction because 
                    the product of ${product?.title || "product"} 
                    is out of stock.`,
        });
      }
    }
    // Create New Order
    const CreateOrder = await prisma.order.create({
      data: {
        products: {
          // Create - when pass CHECK
          create: UserCart.products.map((item) => ({
            productId: item.productId,
            count: item.count,
            price: item.price,
          })),
        },
        orderedBy: { connect: { id: Number(id) } },
        cartTotal: UserCart.cartTotal,
        stripePaymentId: "",
        amount: Number(UserCart.cartTotal),
        status: "Not Process",
        currentcy: "THB",
      },
    });
    // Update Product after Create Order
    const UpdateProduct = UserCart.products.map((item) => ({
      where: { id: item.productId },
      data: {
        // decrement- ลบค่าออกจากค่าเดิมที่มี (Prima)
        quantity: { decrement: item.count },
        sold: { increment: item.count },
      },
    }));
    // Promise.all
    await Promise.all(
      UpdateProduct.map((updated) => prisma.product.update(updated))
    );
    // Cart Order - delete
    await prisma.cart.deleteMany({
      where: { orderedById: Number(id) },
    });
    res.json({ ok: true, CreateOrder });
  } catch (error) {
    next(error);
    res.status(500).json({ message: "Failed to Add User Order" });
  }
};
// Order Get - (.get)
exports.getUserOrder = async (req, res, next) => {
  try {
    // code
    const { id } = req.user;
    const ListUserOrders = await prisma.order.findMany({
      where: {
        orderedById: Number(id),
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
    res.status(200).json({
      ok: true,
      ListUserOrders,
      message: "List User Order Successfully",
    });
  } catch (error) {
    next(error);
    res.status(500).json({ message: "Failed to User Order" });
  }
};
