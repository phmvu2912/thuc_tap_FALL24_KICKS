import { BackwardOutlined, DeleteFilled, PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Image, Input, message, Select, Tooltip, Upload, UploadFile, UploadProps } from "antd";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { createProduct, getProductById, updateProduct } from "../../../../services/product";
import { getCategories } from "../../../../services/category";

const Product_Form = () => {

    const [form] = Form.useForm();
    const { id } = useParams();
    const [fileLists, setFileLists] = useState<any>({});

    // call api product
    const { data: product, isError, error, isFetching, isLoading } = useQuery({
        queryKey: ['product', id],
        queryFn: () => getProductById(id),
        enabled: !!id // chỉ call api khi có id trên url
    });

    // call api category
    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories()
    });

    const { mutate } = useMutation({
        mutationFn: async (dataForm) => {
            try {
                if (id) {
                    // console.log('update');

                    // console.log(dataForm);

                    const { data } = await updateProduct(dataForm);

                    console.log(data);

                } else {
                    // console.log('create form', dataForm);

                    const { data } = await createProduct(dataForm);

                    console.log(data);
                }
            } catch (error) {
                console.log(error)
            }
        },
        onError: () => message.error('Có lỗi xảy ra, vui lòng thử lại sau'),
        onSuccess: () => {
            message.success('Thành công');

            !id && form.resetFields();

        }
    })

    const currentCategory = product?.data?.data?.category; // Đây là ID của category hiện tại
    // console.log('Current Category ID:', currentCategory); // Kiểm tra giá trị category hiện tại

    // fill data category
    useEffect(() => {
        if (id && product?.data?.data) {
            const { category, ...otherFields } = product.data.data;
            // Thiết lập tất cả các trường của form
            form.setFieldsValue({
                category: category?._id, // Thiết lập category bằng _id của category hiện tại
                ...otherFields, // Cập nhật thêm các trường khác nếu cần
            });
        }
    }, [product, form, id]);

    // xử lý ảnh
    const handleChange = (index: any) => ({ fileList: newFileList }: any) => {
        setFileLists((prevFileLists: any) => ({
            ...prevFileLists,
            [index]: newFileList.slice(-1), // Giữ lại file cuối cùng
        }));
    };

    // call api
    const onFinish = (dataForm: any) => {
        const sizes = Array.isArray(dataForm.sizes)
            ? dataForm.sizes.join(",")
            : dataForm.sizes;
        const sizeArray = sizes.split(",").map((size: any) => size.trim());

        const variants = dataForm.variants.map((variant: any, index: any) => ({
            ...variant,
            thumbnail: fileLists[index]?.[0]?.response?.secure_url || "", // Lấy URL từ fileLists
        }));

        const data = {
            ...dataForm,
            sizes: sizeArray,
            variants,
            ...(id && { id })
        };

        mutate(data);
    };


    if (isLoading && isFetching) return <p>Loading...</p>
    if (isError) return <p>Error: {error.message}</p>

    return (
        <>
            <div className="heading flex justify-between items-center">
                <h5 className='font-semibold text-lg'>
                    {id ? 'Cập nhật sản phẩm' : 'Thêm mới sản phẩm'}
                </h5>

                <Link to={'/admin/products'} className='flex items-center gap-2 btn bg-blue-200 py-1 px-4 rounded-md hover:text-white hover:bg-slate-500'>
                    <BackwardOutlined />
                    Quay lại
                </Link>
            </div>

            <div className="content py-6">
                <Form
                    form={form}
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        label="Tên sản phẩm"
                        name="title"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Danh mục"
                        name='category'
                        rules={[{ required: true, message: 'Please select a category!' }]}
                    >
                        <Select placeholder="Select an option"
                            defaultValue={currentCategory?._id} // Thiết lập giá trị mặc định
                        >
                            {
                                categories?.data?.data.map((category: any) => (
                                    <Select.Option key={category?._id} value={category?._id}>
                                        {category?.name} {/* Hiển thị tên danh mục */}
                                    </Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>

                    {/* Size */}
                    <Form.Item
                        label={
                            <span className="">
                                Size
                                <Tooltip
                                    title="Khi thay đổi dữ liệu của Size cần thêm dấu , vào sau mỗi size. VD: 39,40,41..."
                                    placement="right"
                                >
                                    <QuestionCircleOutlined style={{ marginLeft: 4, cursor: 'pointer' }} />
                                </Tooltip>
                            </span>
                        }
                        name='sizes'
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Mô tả"
                        name="description"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Input.TextArea rows={5} />
                    </Form.Item>

                    <Form.List name="variants">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name }) => (
                                    <Form.Item
                                        key={key}
                                        label={
                                            <span className="font-semibold text-lg">Biến thể {name + 1}</span>
                                        }
                                    >
                                        <div className="space-y-3 pl-4">

                                            {/* Color*/}
                                            <Form.Item
                                                label={
                                                    <span className="">Màu sắc</span>
                                                }
                                                name={[name, 'color']}
                                                rules={[{ required: true, message: 'Vui lòng nhập màu sắc!' }]}
                                            >
                                                <Input placeholder="Nhập màu sắc" />
                                            </Form.Item>

                                            {/* Stock*/}
                                            <Form.Item
                                                label={
                                                    <span className="">Số lượng</span>
                                                }
                                                name={[name, 'stock']}
                                                rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}

                                            >
                                                <Input placeholder="Nhập số lượng" />
                                            </Form.Item>

                                            {/* Price*/}
                                            <Form.Item
                                                label={
                                                    <span className="">Giá sản phẩm</span>
                                                }
                                                name={[name, 'price']}
                                                rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm!' }]}

                                            >
                                                <Input placeholder="Nhập giá sản phẩm" />
                                            </Form.Item>

                                            {/* Hiển thị ảnh hiện tại*/}
                                            <Form.Item
                                                shouldUpdate
                                                label={
                                                    <span className="">Ảnh sản phẩm biến thể</span>
                                                }
                                            >
                                                {({ getFieldValue }) => {
                                                    const thumbnail = getFieldValue(['variants', name, 'thumbnail']);
                                                    return thumbnail ? (
                                                        <Image
                                                            src={thumbnail}
                                                            alt="Thumbnail"
                                                            width={200}
                                                        />
                                                    ) : null;
                                                }}
                                            </Form.Item>

                                            {/* Thêm mới ảnh */}
                                            <Form.Item label="Thêm mới ảnh sản phẩm" name={['variants', name, 'thumbnail']}>
                                                <Upload
                                                    action="https://api.cloudinary.com/v1_1/phmvu2912/image/upload"
                                                    data={{ upload_preset: 'kicks_shop' }}
                                                    onChange={handleChange(name)}
                                                    fileList={fileLists[name] || []}
                                                    listType="picture-card"
                                                    maxCount={1}
                                                >
                                                    {(fileLists[name] || []).length < 1 && (
                                                        <button style={{ border: 0, background: 'none' }} type="button">
                                                            <PlusOutlined />
                                                            <div style={{ marginTop: 8 }}>Upload</div>
                                                        </button>
                                                    )}
                                                </Upload>
                                            </Form.Item>



                                            {/* Nút xóa biến thể */}
                                            <Button
                                                onClick={() => remove(name)}
                                                className="bg-red-500"
                                                danger
                                            >
                                                <DeleteFilled /> Xóa biến thể
                                            </Button>
                                        </div>
                                    </Form.Item>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} style={{ width: '100%' }}>
                                        Thêm biến thể
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            {id ? 'Cập nhật sản phẩm' : 'Thêm mới sản phẩm'}
                        </Button>
                    </Form.Item>
                </Form>
            </div >
        </>
    )
}

export default Product_Form