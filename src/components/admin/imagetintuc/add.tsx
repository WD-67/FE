
import Message from '../../action/Message/Message';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Iimagetintuc } from '../../../interfaces/imagetintuc';
import { Itintuc } from '../../../interfaces/tintuc';
import UpLoand from '../../Image/UploadImageTintuc';
import { useAddImagetintucMutation } from '@/api/imagetintuc';
import { useGetTintucQuery } from '@/api/tintuc';
const ThemImageTinTuc = () => {
  const navigate = useNavigate()
  const [addImagetintuc] = useAddImagetintucMutation();
  const { handleSubmit, register, formState: { errors }, watch } = useForm<any>()
  const [img, setImg] = useState<any>([]);
  const handleImage = (url: string) => {
    setImg([...img, url]);
  };
  const handleImageRemove = (url: string) => {
    setImg((prevImg: any) => prevImg.filter((imageUrl: string) => imageUrl !== url));
  };
  const onSubmit: SubmitHandler<any> = async ({trang_thai,Id_news,...FormData }:any) => {
    const data = {
      trang_thai: trang_thai,
      Id_news: Id_news,
      image: img,
    }
    try {
      await (addImagetintuc(data) as never)
      Message("success", "Thêm ảnh tin tức thành công")
      navigate('/admin/imagetintuc')
    } catch (error) {
      Message("error", "Thêm ảnh tin tức thất bại, đã có tin tức này rồi")
    }

  }
  const { data: tintucData ,refetch} = useGetTintucQuery(); 
  return (
    <div>
      <span className="text-2xl mb-6">Add New Image Tin Tức </span>
      <form className='mt-5' onSubmit={handleSubmit(onSubmit)} >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">
          <div>
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Tiêu Đề</label>
            <select {...register("Id_news", { required: true })} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option >Tùy chọn tiêu đề</option>
              <option >loan</option>
            
              {
                 tintucData &&  tintucData.length > 0 ?  tintucData.map((tintuc: Itintuc) =>
                  <option value={tintuc._id}>{tintuc.tieude}</option>
                ) : ""
              }
            </select>
            <p className='text-red-600 text-[20px]'>
              {errors.Id_news?.type === 'required' && <small className="form-text text-muted">Category field is required</small>}
            </p>
          </div>
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
            data-ripple-light="true">Add Ảnh Tin Tức</button>
        </div>
      </form>
    </div>
  )
}
export default ThemImageTinTuc