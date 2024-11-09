import { BackwardOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { Link, useParams } from "react-router-dom";
import { createCategory, getCategoryById, updateCategory } from "../../../../services/category";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const Category_Form = () => {

    const [form] = Form.useForm();

    const { id } = useParams();

    // call api categories
    const { data: category, isError, error, isFetching, isLoading } = useQuery({
        queryKey: ['category', id],
        queryFn: () => getCategoryById(id),
        enabled: !!id
    });

    const { mutate } = useMutation({
        mutationFn: async (dataForm) => {
            try {
                if (id) {
                    // console.log('update');

                    // console.log(dataForm);

                    const { data } = await updateCategory(dataForm);

                    console.log(data);

                } else {
                    // console.log('create form', dataForm);

                    const { data } = await createCategory(dataForm);

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

    console.log(category?.data?.data)

    // call api
    const onFinish = (dataForm: any) => {


        mutate(id ? { ...dataForm, id } : dataForm);
    }

    if (isLoading && isFetching) return <p>Loading...</p>
    if (isError) return <p>Error: {error.message}</p>

    return (
        <>
            <div className="heading flex justify-between items-center">
                <h5 className='font-semibold text-lg'>
                    {id ? 'Cập nhật danh mục' : 'Thêm mới danh mục'}
                </h5>

                <Link to={'/admin/categories'} className='flex items-center gap-2 btn bg-blue-200 py-1 px-4 rounded-md hover:text-white hover:bg-slate-500'>
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
                    initialValues={category?.data?.data}
                >
                    <Form.Item
                        label="Tên danh mục"
                        name="name"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            {id ? 'Cập nhật danh mục' : 'Thêm mới danh mục'}
                        </Button>
                    </Form.Item>
                </Form>
            </div >
        </>
    )
}

export default Category_Form