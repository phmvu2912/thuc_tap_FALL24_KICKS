import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Form, Input, message } from 'antd';
import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';
import { register } from '../../services/user';

const Login = () => {
  const [form] = Form.useForm();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (dataForm) => register(dataForm),
    onSuccess: (response) => {
      // Kiểm tra status trong response từ server
      if (response.status === 200) {
        message.success('Đăng ký thành công!');
        queryClient.invalidateQueries({ queryKey: ['user'] });
        form.resetFields()
      } else {
        console.warn('Unexpected success status:', response.status);
      }
    },
    onError: (error: Error) => {
      // Ép kiểu error thành AxiosError
      const axiosError = error as AxiosError;

      // Kiểm tra xem có response không
      if (axiosError.response) {
        // Nếu có response, kiểm tra status
        const status = axiosError.response.status;
        console.error('Error status:', status);

        // Xử lý các lỗi cụ thể từ server
        if (status === 400) {
          message.error('Đăng ký thất bại: !');
        } else if (status === 500) {
          message.error('Đăng ký thất bại: Lỗi server!');
        } else {
          message.error('Đăng ký thất bại!');
        }
      } else if (axiosError.request) {
        // Nếu không có response, có thể do không nhận được phản hồi từ server (lỗi mạng, timeout)
        console.error('No response from server:', axiosError.request);
        message.error('Đăng ký thất bại: Không có phản hồi từ server!');
      } else {
        // Nếu lỗi xảy ra khi cấu hình request (ví dụ: lỗi trong quá trình tạo request)
        console.error('Error in request setup:', axiosError.message);
        message.error('Đăng ký thất bại: Lỗi khi gửi yêu cầu!');
      }
    }
  })

  const onFinish = (values: any) => {
    // console.log(values);

    // loginPage ? console.log('Đăng nhập', values) : console.log('Đăng ký', values);
    mutate(values);
  };

  return (
    <div className='min-h-screen flex justify-center items-center container mx-auto'>
      <div className="w-full">
        <Form
          form={form}
          onFinish={onFinish}
          layout='vertical'
          className='space-y-6'
        >
          <h4 className="text-center text-lg font-bold w-full flex justify-center items-center">Đăng ký</h4>

          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input className='py-3' />
          </Form.Item>

          <Form.Item name="username" label="Tên hiển thị" rules={[{ required: true }]}>
            <Input className='py-3' />
          </Form.Item>

          <Form.Item name="password" label="Mật khẩu" rules={[{ required: true }]}>
            <Input.Password className='py-3' />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className='w-full flex flex-1 py-6 font-semibold bg-[#db4444]'>
              Đăng ký
            </Button>
          </Form.Item>
        </Form>


        <div className="text-center pt-4">
          <p>Đã có tài khoản? Đăng nhập <Link to={'/login'} className='font-semibold text-[#db4444] cursor-pointer' >tại đây.</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login