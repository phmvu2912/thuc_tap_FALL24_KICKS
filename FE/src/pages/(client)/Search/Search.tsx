import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getProducts } from '../../../services/product';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Card from '../../../components/(client)/Card/Card';

const Search = () => {
  const queryClient = useQueryClient();
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState('default')
  const navigate = useNavigate();

  const useQueryParams = () => {
    const { search } = useLocation();
    return new URLSearchParams(search);
  };

  const queryParams = useQueryParams();
  const searchQuery = queryParams.get('query') || '';

  const { data, isLoading, isError, error, isFetching, isPending } = useQuery({
    queryKey: ['products', searchQuery, sort],
    queryFn: () => getProducts({ query: searchQuery }),
    enabled: true
  })

  // Xử lý dữ liệu sau khi data thay đổi
  useEffect(() => {
    if (data) {
      setProducts(data?.data?.data || []);
    }
  }, [data]);

  useEffect(() => {
    if (!searchQuery) {
      setProducts([]); // Hoặc giữ lại dữ liệu nếu cần
    }
  }, [searchQuery]);

  console.log(products)

  return (
    <div className="container mx-auto">
      <div className="heading flex items-center justify-between">
        <div>
          <h5 className="font-semibold text-2xl">
            Kết quả tìm kiếm dựa trên <span className="text-[#DB4444] font-bold">"{searchQuery}"</span>
          </h5>
          <p>
            Hiện có <span className="text-[#DB4444] font-semibold">{products?.length}</span> kết quả trùng khớp
          </p>
        </div>
        <div>Lọc</div>
      </div>

      <div className="content py-16">
        {
          products.length > 0 ? (
            <div className={` grid grid-cols-4 gap-4 justify-between`}>
              {
                products?.map((item: any, index: number) => (
                  <Card props={item} key={index} />
                ))
              }
            </div>
          ) : (
            <div className="h-[50vh] flex justify-center items-center">
              <p className='text-2xl'>
                Không tìm thấy sản phẩm mà bạn muốn!{' '}
                <Link to="/" className="text-[#DB4444] font-semibold underline">
                  Quay lại trang chủ
                </Link>
              </p>
            </div>
          )}
      </div>
    </div>
  );
};

export default Search;
