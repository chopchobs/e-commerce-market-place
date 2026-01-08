const prisma = require("../config/prisma");

// --- User Management ---
// router.get('/users')
exports.getListUsersAdmin = async (req, res, next) => {
  try {
    // code
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        enabled: true,
        createdAt: true,
        updatedAt: true,
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

// ---- Order ----
// route.put('/user/order');
exports.changOrderStatusAdmin = async (req, res, next) => {
  try {
    // code
    const { orderId, orderStatus } = req.body;
    const OrderUpdate = await prisma.order.update({
      where: { id: orderId },
      data: { orderStatus: orderStatus },
    });
    res.status(200).send({
      OrderUpdate,
      message: "Edit User Order Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to Edit User Order",
    });
  }
};
// route.get('/admin/orders');
exports.ListAdminOrder = async (req, res, next) => {
  try {
    //code
    const ListOrders = await prisma.order.findMany({
      include: {
        products: {
          include: {
            product: true,
          },
        },
        orderedBy: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            enabled: true,
            address: true,
          },
        },
      },
    });
    // console.log(ListOrders)
    res.status(200).send({
      ListOrders,
      message: "List Admin Order Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to List Admin Order",
    });
  }
};
// route.delete('/admin/orders-delete');
exports.deleteOrderAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedOrder = await prisma.order.delete({
      where: { id: Number(id) },
    });
    res.status(200).send({
      deletedOrder,
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete order",
    });
  }
};
