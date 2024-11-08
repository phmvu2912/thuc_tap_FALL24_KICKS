import { Button, Form, Input } from 'antd';
import { useState } from 'react';

const Login = () => {
    const [form] = Form.useForm();

    const [loginPage, setLoginPage] = useState(true);

    const handleFormChange = () => {
        setLoginPage(!loginPage);
    }

    const onFinish = (values: any) => {
        console.log(values);

        loginPage ? console.log('Đăng nhập', values) : console.log('Đăng ký', values);
    };

    return (
        <>
            {
                loginPage ? (
                    <Form
                        form={form}
                        onFinish={onFinish}
                        layout='vertical'
                        className='space-y-2'
                    >
                        <h4 className="text-center text-lg font-bold w-full flex justify-center items-center">Đăng nhập</h4>

                        <Form.Item name="username" label="Tài khoản" rules={[{ required: true }]}>
                            <Input className='py-3' />
                        </Form.Item>

                        <Form.Item>
                            <Form.Item name="password" label="Mật khẩu" rules={[{ required: true }]}>
                                <Input.Password className='py-3' />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className='w-full flex flex-1 py-6 font-semibold bg-[#db4444]'>
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>
                ) : (
                    <Form
                        form={form}
                        onFinish={onFinish}
                        layout='vertical'
                        className='space-y-2'
                    >
                        <h4 className="text-center text-lg font-bold w-full flex justify-center items-center">Đăng ký</h4>

                        <Form.Item name="username" label="Tài khoản" rules={[{ required: true }]}>
                            <Input className='py-3' />
                        </Form.Item>

                        <Form.Item>
                            <Form.Item name="password" label="Mật khẩu" rules={[{ required: true }]}>
                                <Input.Password className='py-3' />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className='w-full flex flex-1 py-6 font-semibold bg-[#db4444]'>
                                Đăng ký
                            </Button>
                        </Form.Item>
                    </Form>
                )
            }


            <div className="text-center pt-4">
                <p>
                    {loginPage ? 'Chưa có tài khoản? Đăng ký' : 'Đã có tài khoản? Đăng nhập'} <span
                        className='font-semibold text-[#db4444] cursor-pointer'
                        onClick={() => handleFormChange()}>tại đây.</span>
                </p>
            </div>
        </>
    )
}

export default Login