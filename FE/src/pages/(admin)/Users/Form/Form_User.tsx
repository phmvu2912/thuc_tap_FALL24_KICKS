import { BackwardOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input, message, Select } from "antd";
import { Option } from "antd/es/mentions";
import { Link, useParams } from "react-router-dom";
import { getUserById, updateUser } from "../../../../services/user";

const Form_User = () => {

    const [form] = Form.useForm();

    const { id } = useParams();

    // call api user
    const { data: user, isError, error, isFetching, isLoading } = useQuery({
        queryKey: ['user', id],
        queryFn: () => getUserById(id),
        enabled: !!id
    });

    const { mutate } = useMutation({
        mutationFn: async (dataForm) => {
            try {

                const { data } = await updateUser(dataForm);

                console.log(data);

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

    console.log(user?.data?.data)

    // call api
    const onFinish = (dataForm: any) => {


        mutate({ ...dataForm, id });
    }

    if (isLoading && isFetching) return <p>Loading...</p>
    if (isError) return <p>Error: {error.message}</p>

    return (
        <>
            <div className="heading flex justify-between items-center">
                <h5 className='font-semibold text-lg'>
                    {id ? 'Cập nhật người dùng' : 'Thêm mới người dùng'}
                </h5>

                <Link to={'/admin/users'} className='flex items-center gap-2 btn bg-blue-200 py-1 px-4 rounded-md hover:text-white hover:bg-slate-500'>
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
                    initialValues={user?.data?.data}
                >
                    <Form.Item
                        label="Tên người dùng"
                        name="username"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="phoneNumber"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Chức vụ"
                        name='role'
                        rules={[{ required: true, message: 'Please select a role!' }]}
                    >
                        <Select>
                            <Option value="user">user</Option>
                            <Option value="admin">admin</Option>
                            <Option value="staff">staff</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            {id ? 'Cập nhật người dùng' : 'Thêm mới người dùng'}
                        </Button>
                    </Form.Item>
                </Form>
            </div >
        </>
    )
}

export default Form_User