import { useRef } from 'react'
import { Control, FieldValues, Path, useController } from 'react-hook-form'
import { FileUpload, FileUploadProps, FileUploadSelectEvent } from 'primereact/fileupload'
import { Image } from 'primereact/image'

import { DCButton } from '@/components'
import { svgs } from '@/assets'

type FileUploadFieldProps<T extends FieldValues> = FileUploadProps & {
  name: Path<T>
  control: Control<T>
  label?: string
  required?: boolean
}

export function FileUploadField<T extends FieldValues>({
  name,
  control,
  label,
  required,
  ...rest
}: FileUploadFieldProps<T>) {
  const fileUploadRef = useRef<FileUpload>(null)
  const {
    field: { onChange, value }
  } = useController({
    name,
    control
  })

  const previewUrl: string = value?.objectURL || ''

  const itemTemplate = () => {
    const getIconByType = () => {
      const iconFile = {
        pdf: svgs.PDF_LOGO_ICON,
        zip: svgs.ZIP_LOGO_ICON,
        csv: svgs.EXCEL_LOGO_ICON,
        xlsx: svgs.EXCEL_LOGO_ICON
      }
      const fileType = value?.name?.split('.').pop() as keyof typeof iconFile

      return iconFile[fileType] || svgs.EMPTY_LOGO_ICON
    }

    return (
      <div className='flex items-center justify-between px-4 py-2'>
        <div className='flex items-center gap-2'>
          <div className='w-8 h-8 p-1 bg-neutral-0 rounded-md flex items-center justify-center'>
            <Image src={getIconByType()} alt='empty' className='w-6 h-6 object-cover' />
          </div>

          <p className='text-neutral-950 text-sm font-semibold'>{value?.name}</p>
        </div>

        <div className='flex items-center gap-6'>
          <p className='text-neutral-950 text-sm'>{((value?.size || 0) / (1024 * 1024)).toFixed(2)} MB</p>

          <DCButton
            label='Xem chi tiết'
            icon={<i className='pi pi-eye text-xs'></i>}
            size='small'
            severity='secondary'
            className='w-[156px]'
            onClick={() => window.open(previewUrl, '_blank')}
          />
        </div>
      </div>
    )
  }

  const emptyTemplate = () => {
    return (
      <div className='flex items-center justify-between px-4 py-2'>
        <div className='flex items-center gap-2'>
          <div className='w-8 h-8 p-1 bg-neutral-0 rounded-md flex items-center justify-center'>
            <Image src={svgs.EMPTY_LOGO_ICON} alt='empty' className='w-6 h-6 object-cover' />
          </div>

          <p className='text-neutral-600 text-sm font-semibold'>Kéo thả hoặc nhấn vào để tải file lên</p>
        </div>

        <DCButton
          label='Tải lên'
          icon={<i className='pi pi-upload text-xs'></i>}
          size='small'
          className='w-[156px]'
          onClick={handleFileChange}
        />
      </div>
    )
  }

  const handleFileChange = () => {
    fileUploadRef.current?.getInput().click()
  }

  const handleTemplateSelect = (e: FileUploadSelectEvent) => {
    onChange(e.files[0])
  }

  return (
    <div>
      {label && (
        <div className='flex items-center gap-1 mb-1'>
          <label className='text-sm font-semibold text-neutral-600'>{label}</label>

          {required && <span className='text-red-700'>*</span>}
        </div>
      )}

      <FileUpload
        ref={fileUploadRef}
        name={name}
        headerClassName='hidden'
        contentClassName='p-0 border-neutral-600 bg-neutral-50 border border-dashed rounded-md'
        multiple={false}
        progressBarTemplate={() => null}
        itemTemplate={itemTemplate}
        emptyTemplate={previewUrl ? itemTemplate : emptyTemplate}
        onSelect={handleTemplateSelect}
        {...rest}
      />

      <div className='flex items-center justify-between mt-2'>
        <p className='text-neutral-600 text-sm'>Hỗ trợ định dạng: PDF, DOC, DOCX, XLSX, XLS, ZIP, GZ, 7Z, và RAR</p>

        <p className='text-neutral-600 text-sm'>Kích thước tối đa: 200 MB</p>
      </div>
    </div>
  )
}
