import { DragEvent, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { FileUpload, FileUploadProps } from 'primereact/fileupload'
import { confirmDialog } from 'primereact/confirmdialog'
import { Button } from 'primereact/button'
import { PrimeIcons } from 'primereact/api'
import { Image } from 'primereact/image'

import { ToastService } from '@/features/shared/services'
import { FileWithObjectURL } from '@/features/shared/models'

interface UploadImageProps extends FileUploadProps {
  label?: string
  name: string
  value: FileWithObjectURL | null
  onChange: (payload: FileWithObjectURL | null) => void
}

export function UploadImage({
  label,
  name,
  value,
  accept = 'image/png, image/jpg, image/jpeg',
  onChange,
  ...props
}: UploadImageProps) {
  const { t } = useTranslation('shared')
  const fileUploadRef = useRef<FileUpload>(null)

  useEffect(() => {
    return () => {
      if (value?.objectURL) {
        URL.revokeObjectURL(value.objectURL)
      }
    }
  }, [value])

  const handlePhotoUpload = () => {
    fileUploadRef.current?.clear()
    fileUploadRef.current?.getInput()?.click()
  }

  const handlePhotoDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    fileUploadRef.current?.clear()
    const droppedFiles = Array.from(e.dataTransfer.files)

    if (droppedFiles.length > 1) {
      ToastService.error({
        summary: t('shared_toast_error_summary', { ns: 'shared' }),
        detail: t('shared_upload_multi_file_error')
      })
      return
    }

    const file = Object.assign(droppedFiles[0], {
      objectURL: URL.createObjectURL(droppedFiles[0])
    })

    if (value) {
      confirmDialog({
        message: t('shared_confirm_update_photo_question'),
        header: label,
        accept: () => onChange(file),
        reject: () => {}
      })
      return
    }

    onChange(file)
  }

  const handlePhotoSelect = (e: { files: File[] }) => {
    if (!e.files.length) return

    const acceptedFileTypes = accept.split(', ') || []

    if (!acceptedFileTypes.includes(e.files[0].type)) {
      ToastService.error({
        summary: t('shared_toast_error_summary', { ns: 'shared' }),
        detail: t('shared_accept_image_type_error')
      })
      return
    }

    const file = Object.assign(e.files[0], {
      objectURL: URL.createObjectURL(e.files[0])
    })

    if (value) {
      confirmDialog({
        message: t('shared_confirm_update_photo_question'),
        header: label,
        accept: () => onChange(file),
        reject: () => {}
      })

      return
    }

    onChange(file)
  }

  const handlePhotoPreview = () => {
    if (!value?.objectURL) return

    confirmDialog({
      message: (
        <Image
          src={value.objectURL}
          imageClassName='rounded-md w-full h-[240px] object-cover cursor-pointer col-start-2 col-end-6'
          className='grid grid-cols-6 gap-6'
        />
      ),
      header: label,
      acceptClassName: 'mr-0 col-start-2 col-end-6 h-9 text-sm',
      rejectClassName: 'hidden',
      acceptLabel: t('shared_btn_close'),
      reject: () => {}
    })
  }

  const handlePhotoRemove = () => {
    confirmDialog({
      message: t('shared_confirm_remove_photo_question'),
      header: label,
      accept: () => onChange(null),
      reject: () => {}
    })
  }

  return (
    <>
      <FileUpload
        ref={fileUploadRef}
        name={name}
        className='hidden'
        accept={accept}
        onSelect={handlePhotoSelect}
        {...props}
      />

      <div
        className='border-neutral-600 bg-neutral-50 border border-dashed rounded-md min-h-[200px]'
        onDrop={handlePhotoDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {value ? (
          <div className='px-10 py-6 relative group'>
            <div className='absolute inset-0 z-[2] hidden group-hover:block rounded-md'>
              <div className='bg-neutral-950 opacity-70 absolute inset-0 z-[1] hidden group-hover:block cursor-pointer' />

              <div className='flex items-center justify-center w-full h-full'>
                <Button
                  label={t('shared_btn_view')}
                  icon={PrimeIcons.EYE}
                  size='small'
                  type='button'
                  className='max-w-[156px] max-h-7 w-full z-[2]'
                  onClick={handlePhotoPreview}
                />
              </div>

              <div className='flex flex-col gap-2 absolute top-6 right-2'>
                <Button
                  icon={PrimeIcons.UPLOAD}
                  size='small'
                  type='button'
                  severity='secondary'
                  className='z-[2] max-h-7 max-w-7'
                  onClick={handlePhotoUpload}
                />
                <Button
                  icon={PrimeIcons.TRASH}
                  size='small'
                  type='button'
                  severity='danger'
                  className='z-[2] max-h-7 max-w-7'
                  onClick={handlePhotoRemove}
                />
              </div>
            </div>

            <div className='flex items-center justify-center'>
              <Image
                src={value.objectURL}
                imageClassName='rounded-md w-[240px] h-[150px] object-cover cursor-pointer'
              />
            </div>
          </div>
        ) : (
          <div className='text-center px-10 py-6 flex items-center justify-center'>
            <div>
              <i className='pi pi-images text-2xl mb-1'></i>

              <p className='text-neutral-950 text-sm mb-3'>{t('shared_select_or_drop_image')}</p>

              <div className='w-full mb-2 text-center'>
                <Button
                  label={t('shared_btn_upload')}
                  icon={PrimeIcons.UPLOAD}
                  size='small'
                  type='button'
                  className='max-w-[156px] max-h-7 w-full'
                  onClick={handlePhotoUpload}
                />
              </div>

              <p className='mb-1 text-neutral-600 text-xs'>{t('shared_accept_image_type')}</p>
              <p className='text-neutral-600 text-xs'>{t('shared_upload_image_rule')}</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
