
import Message from '../../action/Message/Message';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ImageProduct } from '@/interfaces/imageProduct';
import UpLoand from '../../Image/ImageProduct';
import { useAddImageProductMutation, useUpdateImageProductMutation } from '@/api/imageProduct';
const UpdateimageProduct = () => {
  const navigate = useNavigate()
  const [UpdateImageProduct] = useUpdateImageProductMutation();
  const { handleSubmit, register, formState: { errors }, watch } = useForm<any>()
  const [img, setImg] = useState<any>([]);
  const handleImage = (url: string) => {
    setImg([...img, url]);
  };
  const handleImageRemove = (url: string) => {
    setImg((prevImg: any) => prevImg.filter((imageUrl: string) => imageUrl !== url));
  };
  const onSubmit: SubmitHandler<any> = async ({trang_thai, image,...FormData }:any) => {
    const data = {
      trang_thai: trang_thai,
      image: img,
    }
    try {
      await (UpdateImageProduct(data) as never)
      Message("success", "Thêm ảnh tin tức thành công")
      navigate('/admin/imageProduct')
    } catch (error) {
      Message("error", "Thêm ảnh tin tức thất bại, đã có tin tức này rồi")
    }

  }
  return (
    <div>
      <span className="text-2xl mb-6">Add New Image Tin Tức </span>
      <form className='mt-5' onSubmit={handleSubmit(onSubmit)} >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">

          <div className='mb-2'>
            <label className=" my-2" htmlFor="image">
              Hình Ảnh
            </label>
            <UpLoand onImageUpLoad={handleImage} onImageRemove={handleImageRemove} />
          </div>

          <div className='mb-2'>
            <label className=" my-2" htmlFor="trang_thai">
              Trạng Thái
            </label>
            <select {...register("trang_thai", { required: true })} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option >Tùy chọn trạng thái</option>
              <option>active</option>
              <option>deactive</option>
            </select>
            <p className='text-red-600 text-[20px]'>
              {errors.trang_thai?.type === 'required' && <small className="form-text text-muted">Trường Name là bắt buộc</small>}
            </p>
          </div>
        </div>
        <div>
          <button className="middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true">Add Ảnh Product</button>
        </div>
      </form>
    </div>
  )
}
export default UpdateimageProduct