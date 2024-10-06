import express from "express";
import Product from "../models/Product.js";

// ! GET ALL
const getProducts = async (req, res) => {
    try {

        const products = await Product.find().populate('category');

        // * Kiểm tra xem có sản phẩm nào không
        if (products === 0) {
            return res.status(400).json(
                {
                    status: false,
                    data: [],
                    message: "Không có sản phẩm nào!"
                }
            );
        }

        return res.status(200).json(
            {
                status: true,
                data: products,
                message: "Lấy danh sách sản phẩm thành công!"
            }
        )

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: 'Có lỗi xảy ra khi lấy danh sách sản phẩm!'
        })
    }
}

export { getProducts };