//add tintuc
import { useForm, SubmitHandler } from 'react-hook-form'
import { Itintuc } from '../../../interfaces/tintuc';
import { useNavigate } from 'react-router-dom'
import Message from '../../action/Message/Message'
import { useAddTintucMutation } from '@/api/tintuc';
import Loading from '../../action/Loading/Loading'
const ThemTinTuc = () => {
  const [addtintuc, { isLoading }] = useAddTintucMutation();
  const navigate = useNavigate()
  const { handleSubmit, register, formState: { errors }, watch } = useForm<any>()
  const onSubmit: SubmitHandler<Itintuc> = async (inputAdd: Itintuc) => {
    try {
      await (addtintuc(inputAdd) as never)
      Message("success", "Thêm tin tức thành công")
      navigate('/admin/tintuc')
    } catch (error) {
      Message("error", "Thêm tin tức thất bại, đã có tin tức này rồi")
    }
  } 
  return (
    <div>
      <span className="text-2xl mb-6">Add New Tin Tức </span>
      <form className='mt-5' onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">
          <div>
            <div className='mb-2'>
              <label className=" mb-2" htmlFor="tieude">
                Tiêu Đề
              </label>
              <input {...register('tieude', { required: true })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="tieude" type="text" placeholder="Tiêu đề ..."></input>
              <p className='text-red-600 text-[20px]'>
                {errors.tieude?.type === 'required' && <small className="form-text text-muted">Trường tieu de là bắt buộc</small>}
              </p>
            </div>
            <div className='mb-2'>
              <label className=" my-2" htmlFor="noidung">
                Nội Dung
              </label>
              <input {...register('noidung', { required: true })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="noidung" type="text" placeholder="Nội dung..."></input>
              <p className='text-red-600 text-[20px]'>
                {errors.noidung?.type === 'required' && <small className="form-text text-muted">Trường Name là bắt buộc</small>}
              </p>
            </div>
            <div className='mb-2'>
              <label className=" my-2" htmlFor="trangthai">
                Trạng Thái
              </label>
              <select {...register("trang_thai", { required: true })} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option >Chọn trạng thái</option>
                <option>active</option>
                <option>deactive</option>
              </select>
              <p className='text-red-600 text-[20px]'>
                {errors.trang_thai?.type === 'required' && <small className="form-text text-muted">Trường Name là bắt buộc</small>}
              </p>
            </div>

          </div>
          <div >
          </div>
        </div>
        <div>
          <button className="middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true">Add Tin Tức</button>
        </div>
      </form>
    </div>
  )
}

export default ThemTinTuc