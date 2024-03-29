import React, { useEffect, useState } from 'react'
import { useAtom, useAtomValue } from 'jotai'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { userAtom } from '@src/stores/atoms/user'
import { createDogInfoAtom, createDogStepAtom } from '@src/stores/atoms/dog'
import { createDog } from '@src/apis/dog'
import CreateDogInfo from '@src/components/CreateDog/CreateDogInfo'
import CreateDogMbti from '@src/components/CreateDog/CreateDogMbti'
import CreateDogNote from '@src/components/CreateDog/CreateDogNote'
import CreateDogFile from '@src/components/CreateDog/CreateDogFile'
import * as c from '@src/container/style/CreateDogContainerStyle'

const CreateDogContainer = () => {
  const navigate = useNavigate()
  const user = useAtomValue(userAtom)
  const [createDogInfo, setCreateDogInfo] = useAtom(createDogInfoAtom)
  const [createDogStep, setCreateDogStep] = useAtom(createDogStepAtom)
  const [file, setFile] = useState<File[]>([])

  const { mutate } = useMutation({
    mutationKey: ['createDog'],
    mutationFn: createDog,
    onSuccess(result) {
      console.log('유기견 추가 성공')
      navigate(`/dogs/${result.dogNo}`)
    },
    onError(error) {
      console.error('유기견 추가 실패:', error)
    },
  })

  useEffect(() => {
    setCreateDogInfo(prevData => ({ ...prevData, userNo: user.userNo }))
  }, [setCreateDogInfo, user.userNo])

  const handleCreateDog = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()

    formData.append(
      'req',
      new Blob([JSON.stringify(createDogInfo)], {
        type: 'application/json',
      }),
    )

    for (let i = 0; i < file.length; i += 1) {
      formData.append('files', file[i])
    }
    mutate(formData)
  }

  const renderStepComponent = () => {
    switch (createDogStep) {
      case 1:
        return <CreateDogInfo />
      case 2:
        return (
          <>
            <CreateDogMbti />
            <CreateDogNote />
            <CreateDogFile file={file} setFile={setFile} />
          </>
        )
      default:
        return null
    }
  }

  const handlePrevStep = () => {
    if (createDogStep === 1) {
      navigate(-1)
    } else {
      setCreateDogStep(prevStep => prevStep - 1)
    }
  }

  const isNextButtonDisabled =
    createDogInfo.name.trim() === '' ||
    createDogInfo.kind.trim() === '' ||
    createDogInfo.age === 0

  const isSubmitDisabled =
    createDogInfo.eq === undefined ||
    createDogInfo.si === undefined ||
    createDogInfo.aw === undefined ||
    createDogInfo.fc === undefined ||
    createDogInfo.note.trim() === '' ||
    file.length === 0

  const handleNextStep = () => {
    setCreateDogStep(prevStep => prevStep + 1)
  }

  return (
    <c.Container>
      <c.TopContainer>
        <c.BackButtonWrap onClick={handlePrevStep}>
          <img src="/icon/icon_gray_arrow_left.png" alt="" />
        </c.BackButtonWrap>
        <c.Title>보호소 강아지 등록</c.Title>
        <c.Span />
      </c.TopContainer>
      <c.InputContainer>
        {renderStepComponent()}
        <c.ButtonContainer>
          {createDogStep < 2 && (
            <c.Button
              type="button"
              onClick={handleNextStep}
              disabled={isNextButtonDisabled}
            >
              다음
            </c.Button>
          )}
          <form onSubmit={handleCreateDog} encType="multipart/form-data">
            {createDogStep === 2 && (
              <c.Button type="submit" disabled={isSubmitDisabled}>
                등록하기
              </c.Button>
            )}
          </form>
        </c.ButtonContainer>
      </c.InputContainer>
    </c.Container>
  )
}

export default CreateDogContainer
