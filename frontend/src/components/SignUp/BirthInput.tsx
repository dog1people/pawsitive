import React, { useState } from 'react'
import { useAtom } from 'jotai'
import { signUpDataAtom } from '@src/stores/atoms/user'
import * as s from '@src/components/style/SignUpStyle'

const BirthInput = () => {
  const [signUpData, setSignUpData] = useAtom(signUpDataAtom)
  const [dobError, setDobError] = useState('')

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let dobInput = e.target.value

    dobInput = dobInput.replace(/[^\d-]/g, '')
    dobInput = dobInput.slice(0, 10)

    if (dobInput.length > 4 && dobInput[4] !== '-') {
      dobInput = `${dobInput.substring(0, 4)}-${dobInput.substring(4)}`
    }
    if (dobInput.length > 7 && dobInput[7] !== '-') {
      dobInput = `${dobInput.substring(0, 7)}-${dobInput.substring(7)}`
    }
    setSignUpData(prevData => ({ ...prevData, birth: dobInput }))

    const isNumberDobInput = () => /^\d{4}\.\d{2}\.\d{2}$/.test(dobInput)

    if (!isNumberDobInput()) {
      setDobError('8자리 숫자로 입력해주세요.')
    } else setDobError('')

    const [year, month, day] = dobInput.split('-').map(Number)

    const isValidYear = year >= 1900 && year <= new Date().getFullYear()
    const isValidMonth = month >= 1 && month <= 12
    const isValidDay = day >= 1 && day <= 31

    const isValidDobInput = isValidYear && isValidMonth && isValidDay

    if (!isValidDobInput) {
      setDobError('올바른 날짜 형식이 아닙니다.')
    } else {
      setDobError('')
    }
  }

  return (
    <s.InputContainer>
      <s.InputLabel htmlFor="name">생년월일을 입력해주세요.</s.InputLabel>
      <s.InputField
        type="text"
        id="dob"
        name="dob"
        value={signUpData.birth}
        onChange={handleDobChange}
        placeholder="YYYY-MM-DD"
        required
      />
      <div>{dobError}</div>
    </s.InputContainer>
  )
}

export default BirthInput