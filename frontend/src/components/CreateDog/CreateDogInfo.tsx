import { useAtom } from 'jotai'
import { createDogInfoAtom } from '@src/stores/atoms/dog'
import * as s from '@src/components/style/CreateDogInfoStyle'

const CreateDogInfo = () => {
  const [createDogData, setCreateDogData] = useAtom(createDogInfoAtom)

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameInput = e.target.value
    setCreateDogData(prevData => ({ ...prevData, name: nameInput }))
  }

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ageInput = Number(e.target.value)
    setCreateDogData(prevData => ({ ...prevData, age: ageInput }))
  }

  const handleKindSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const kindSelect = e.target.value
    setCreateDogData(prevData => ({ ...prevData, kind: kindSelect }))
  }

  const handleSexChange = (sex: string) => {
    setCreateDogData(prevData => ({ ...prevData, sex }))
  }

  const handleIsNaturalizedChange = (isNaturalized: boolean) => {
    setCreateDogData(prevData => ({ ...prevData, isNaturalized }))
  }

  return (
    <s.Container>
      <s.InputContainer>
        <s.Title htmlFor="name">이름</s.Title>
        <s.Input
          id="name"
          type="text"
          value={createDogData.name}
          onChange={handleNameChange}
          placeholder="이름을 입력해주세요"
        />
      </s.InputContainer>
      <s.InputContainer>
        <s.Title htmlFor="age">추정 출생연도</s.Title>
        <s.Input
          type="text"
          value={createDogData.age !== 2021 ? createDogData.age : ''}
          onChange={handleAgeChange}
          placeholder="ex) 2023"
        />
      </s.InputContainer>
      <s.InputContainer>
        <s.Title htmlFor="kind">품종</s.Title>
        <select
          id="kind"
          value={createDogData.kind}
          onChange={handleKindSelectChange}
        >
          <option value="말티즈">말티즈</option>
          <option value="비숑">비숑</option>
          <option value="치와와">치와와</option>
          <option value="푸들">푸들</option>
          <option value="포메라니안">포메라니안</option>
          <option value="시바견">시바견</option>
          <option value="시츄">시츄</option>
          <option value="도베르만">도베르만</option>
          <option value="리트리버">리트리버</option>
          <option value="기타">기타</option>
        </select>
      </s.InputContainer>
      <s.TwoInputContainer>
        <s.InputContainer>
          <s.Title>성별</s.Title>
          <s.ButtonContainer>
            <s.Button
              $isSelected={createDogData.sex === 'M'}
              onClick={() => handleSexChange('M')}
            >
              수컷
            </s.Button>
            <s.Button
              $isSelected={createDogData.sex === 'F'}
              onClick={() => handleSexChange('F')}
            >
              암컷
            </s.Button>
          </s.ButtonContainer>
        </s.InputContainer>
        <s.InputContainer>
          <s.Title>중성화 여부</s.Title>
          <s.ButtonContainer>
            <s.Button
              $isSelected={createDogData.isNaturalized}
              onClick={() => handleIsNaturalizedChange(true)}
            >
              중성화 O
            </s.Button>
            <s.Button
              $isSelected={!createDogData.isNaturalized}
              onClick={() => handleIsNaturalizedChange(false)}
            >
              중성화 X
            </s.Button>
          </s.ButtonContainer>
        </s.InputContainer>
      </s.TwoInputContainer>
    </s.Container>
  )
}

export default CreateDogInfo
