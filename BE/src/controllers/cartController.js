import Cart from "../models/Cart.js";

// Lấy giỏ hàng theo userId
export const getCartByUserId = async (req, res) => {
    try {
        
        const { userId } = req.params;

        const cart = await Cart.findOne({ userId }).exec();

        if (!cart) {
            return res.status(404).json({ message: "Giỏ hàng không tồn tại!" });
        }

        return res.status(200).json({ cart });

    } catch (error) {
        console.log(error)
    }
};

// Thêm sản phẩm vào giỏ hàng
export const addItemToCart = async (req, res) => {
    try {
        const {
            userId,
            productId,
            title,
            thumbnail,
            price,
            size,
            color,
            quantity
        } = req.body;

        // Tính tổng giá cho mục này
        const totalPrice = price * quantity;

        // Tìm giỏ hàng của người dùng
        let cart = await Cart.findOne({ userId });

        // Nếu giỏ hàng chưa tồn tại, tạo mới
        if (!cart) {
            cart = new Cart({
                userId,
                items: [],
                totalQuantity: 0,
                totalPrice: 0
            });
        }

        // Kiểm tra xem sản phẩm có cùng `productId`, `size`, và `color` đã tồn tại trong giỏ chưa
        const existingItem = cart.items.find(
            (item) => item.productId.toString() === productId && item.size === size && item.color === color
        );

        if (existingItem) {
            // Nếu sản phẩm đã tồn tại, chỉ cập nhật số lượng và tổng giá
            existingItem.quantity += quantity;
            existingItem.totalPrice += totalPrice;
        } else {
            // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
            cart.items.push({
                productId,
                title,
                thumbnail,
                price,
                size,
                color,
                quantity,
                totalPrice
            });
        }

        // Cập nhật `totalQuantity` và `totalPrice` của giỏ hàng
        cart.totalQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);
        cart.totalPrice = cart.items.reduce((acc, item) => acc + item.totalPrice, 0);

        // Lưu lại giỏ hàng
        await cart.save();

        return res.status(200).json({ message: "Item added to cart successfully", cart });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Xóa sp khỏi giỏ hàng
export const removeItemFromCart = async (req, res) => {
    try {
        const { userId, productId, size, color } = req.body;

        // Tìm giỏ hàng của người dùng
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Giỏ hàng không tồn tại!" });
        }

        // Kiểm tra xem sản phẩm có tồn tại trong giỏ không
        const existingItemIndex = cart.items.findIndex(
            (item) =>
                item.productId.toString() === productId &&
                item.size === size &&
                item.color === color
        );

        if (existingItemIndex === -1) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại trong giỏ hàng!" });
        }

        // Lấy thông tin sản phẩm để cập nhật tổng số lượng và tổng giá
        const removedItem = cart.items[existingItemIndex];

        // Xóa sản phẩm khỏi giỏ hàng
        cart.items.splice(existingItemIndex, 1);

        // Cập nhật lại `totalQuantity` và `totalPrice` của giỏ hàng
        cart.totalQuantity -= removedItem.quantity;
        cart.totalPrice -= removedItem.totalPrice;

        // Lưu lại giỏ hàng
        await cart.save();

        return res.status(200).json({ message: "Sản phẩm đã được xóa khỏi giỏ hàng", cart });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

