import { useRef } from 'react'
import { Control, FieldValues, Path, useController } from 'react-hook-form'
import { FileUpload, FileUploadProps, FileUploadSelectEvent } from 'primereact/fileupload'
import { Image } from 'primereact/image'

import { DCButton } from '@/components'

type PhotoUploadFieldProps<T extends FieldValues> = FileUploadProps & {
  name: Path<T>
  control: Control<T>
  label?: string
}

export function PhotoUploadField<T extends FieldValues>({ name, control, label, ...rest }: PhotoUploadFieldProps<T>) {
  const fileUploadRef = useRef<FileUpload>(null)
  const {
    field: { onChange, value }
  } = useController({
    name,
    control
  })

  const previewUrl: string = value?.objectURL || ''

  const itemTemplate = () => {
    return (
      <div className='px-12 py-6 flex items-center justify-center'>
        <Image
          src={previewUrl}
          alt='Image'
          imageClassName='rounded-md w-[240px] h-[150px] object-cover cursor-pointer'
          onClick={handleFileChange}
        />
      </div>
    )
  }

  const emptyTemplate = () => {
    return (
      <div className='text-center px-[50px] py-[33px]'>
        <i className='pi pi-images text-[24px] mb-1'></i>

        <p className='text-neutral-950 text-sm mb-3'>Kéo thả hoặc nhấn vào để tải hình lên</p>

        <div className='w-full mb-2 text-center'>
          <DCButton
            label='Tải lên'
            icon={<i className='pi pi-upload text-xs'></i>}
            size='small'
            className='w-[156px]'
            onClick={handleFileChange}
          />
        </div>

        <p className='mb-1 text-neutral-600 text-xs'>Hỗ trợ định dạng: JPG, JPEG, và PNG</p>

        <p className='text-neutral-600 text-xs'>Kích thước hình: 240x150 và tối đa 5mb</p>
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
    <FileUpload
      ref={fileUploadRef}
      name={name}
      accept='image/png, image/jpg, image/jpeg'
      headerClassName='hidden'
      contentClassName='p-0 border-neutral-600 bg-neutral-50 border border-dashed rounded-md'
      multiple={false}
      progressBarTemplate={() => null}
      itemTemplate={itemTemplate}
      emptyTemplate={previewUrl ? itemTemplate : emptyTemplate}
      onSelect={handleTemplateSelect}
      {...rest}
    />
  )
}
