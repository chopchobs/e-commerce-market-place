const prisma = require("../config/prisma");
//--- Cart Management---
// Cart Add - (.post)
exports.createUserCart = async (req, res, next) => {
  try {
    // code , Not use data price from pathname url
    const { cart } = req.body;
    const { id } = req.user;
    // Validate User
    const user = await prisma.user.findFirst({
      where: {
        id: Number(id),
      },
    });
    // Validate User
    if (!user) return res.status(404).json({ message: "User not found" });

    // Prepare Data for Create Cart
    let productsForCreate = [];
    let cartTotal = 0;

    // Validate Product & Stock
    for (const item of cart) {
      const productFromDb = await prisma.product.findUnique({
        where: { id: item.id },
        select: {
          id: true,
          title: true,
          price: true,
          quantity: true,
        },
      });
      // check Product Found
      if (!productFromDb) {
        return res.status(404).json({
          message: `Product ID ${item.id} not found`,
        });
      }
      // Check Stock ( จำนวนที่ขอ > จำนวนที่มี )
      if (item.count > productFromDb.quantity) {
        return res.status(400).json({
          message: `Sorry, product '${productFromDb.title}' is out of stock (Available: ${productFromDb.quantity})`,
        });
      }
      // Prepare data for record
      productsForCreate.push({
        productId: productFromDb.id,
        count: item.count,
        price: productFromDb.price, // 🛡️ Security Point: ใช้ราคาจริงจาก DB
      });
      // Calculate
      cartTotal += productFromDb.price * item.count;
    }
    // Delete old data
    await prisma.productOnCart.deleteMany({
      where: { cart: { orderedById: user.id } },
    });
    // Delete old cart
    await prisma.cart.deleteMany({
      where: { orderedById: user.id },
    });

    // Create New Cart
    const newCart = await prisma.cart.create({
      data: {
        products: {
          create: productsForCreate,
        },
        cartTotal: cartTotal,
        orderedById: user.id,
      },
    });
    res.status(200).json({
      message: "Cart updated successfully",
      cartTotal: cartTotal,
      data: newCart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error: Cannot create cart" });
  }
};
// Cart List - (.get)
exports.listUserCart = async (req, res, next) => {
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
        products: [],
        cartTotal: 0,
        message: "No cart found",
      });
    }

    // Calculate
    const cartTotal = UserCart.cartTotal;
    const shipping = 0; // defeat 0
    const vatRate = 0.07; // TEXT 7%
    const vatAmount = cartTotal * vatRate;
    const netTotal = cartTotal + vatAmount + shipping;

    // ส่งกลับไปให้หน้าบ้านใช้
    res.status(200).json({
      UserCartId: UserCart.id,
      products: UserCart.products,
      cartTotal: cartTotal, // ราคาสินค้าล้วน

      // 👇 ส่งค่าที่คำนวณเพิ่มไปด้วย
      shipping: shipping,
      vat: vatAmount,
      netTotal: netTotal, // ยอดสุทธิ (รวมทุกอย่าง)

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

// --- Address Management ---
// Address Add - (.post)
exports.saveAddress = async (req, res, next) => {
  try {
    // code
    const { id } = req.user;
    const { address, name, phoneNumber } = req.body;
    const addressUser = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        address: address,
        name: name,
        phoneNumber: phoneNumber,
      },
    });
    res.send({
      addressUser,
      message: "Add address Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// --- Order Management ---
// Order Add - (.post)
exports.saveUserOrder = async (req, res, next) => {
  try {
    // code
    // Stripe
    const { id, amount, currency, status } = req.body.paymentIntent;
    const amountTHB = Number(amount) / 100;
    const UserCart = await prisma.cart.findFirst({
      where: {
        orderedBy: {
          id: Number(req.user.id),
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

    // Create New Order
    const CreateOrder = await prisma.order.create({
      data: {
        products: {
          create: UserCart.products.map((item) => ({
            productId: item.productId,
            count: item.count,
            price: item.price,
          })),
        },
        orderedBy: { connect: { id: Number(req.user.id) } },
        cartTotal: UserCart.cartTotal,
        stripePaymentId: id,
        amount: amountTHB,
        status: status,
        currency: currency,
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
      where: { orderedById: Number(req.user.id) },
    });
    res.json({ ok: true, CreateOrder });
  } catch (error) {
    console.log(error);
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
    console.log(error);
    res.status(500).json({ message: "Failed to User Order" });
  }
};
