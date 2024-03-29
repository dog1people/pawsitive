import * as c from '@src/components/ChattingRoom/_style/CreateAppointmentModalStyle'
import XModal from '@src/common/XModal'
import { ChangeEvent, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { createAppointment } from '@src/apis/appointment'
import { useAtom } from 'jotai'
import { userAtom } from '@src/stores/atoms/user'
import { CreateAppointmentModalType } from '@src/types/appointment'

const CreateAppointmentModal = (props: CreateAppointmentModalType) => {
  const [user] = useAtom(userAtom)

  const { onClose, shelterName, dogName, chatRoomNo, sendAlarm } = props

  const [date, setDate] = useState('')
  const [time, setTime] = useState('10:00')

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value
    const formattedDate = new Date(selectedDate).toISOString().split('T')[0]
    setDate(formattedDate)
  }

  const handleTimeChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setTime(e.target.value)

  const { mutate } = useMutation({
    mutationKey: ['createAppointment'],
    mutationFn: createAppointment,
    onSuccess(res) {
      console.log('입양약속 등록 성공', res)
      sendAlarm(
        '새로운 입양약속이 등록되었습니다! 입양약속 보기 버튼을 눌러 날짜와 시간을 확인해보세요.',
      )
      window.location.reload()
    },
    onError(error) {
      console.error('입양약속 등록 실패:', error)
    },
  })

  const onSubmit = () => {
    if (date === '') {
      alert('날짜를 선택해주세요!')
    } else {
      const answer = confirm(`${date} ${time}에 입양약속을 잡으시겠습니까?`)
      if (answer) mutate({ userNo: user.userNo, chatRoomNo, date, time })
    }
  }

  return (
    <XModal onClose={onClose}>
      <c.Title>{shelterName}와 입양약속 잡기</c.Title>
      <c.Row>
        <div>이름</div>
        <div>{dogName}</div>
      </c.Row>
      <c.Row>
        <div>날짜</div>
        <input type="date" value={date} onChange={handleDateChange} />
      </c.Row>
      <c.Row>
        <div>시간</div>
        <select value={time} onChange={handleTimeChange}>
          <option value="10:00">오전 10시</option>
          <option value="11:00">오전 11시</option>
          <option value="14:00">오후 2시</option>
          <option value="15:00">오후 3시</option>
          <option value="16:00">오후 4시</option>
        </select>
      </c.Row>
      <c.SubmitButton type="button" onClick={onSubmit}>
        완료
      </c.SubmitButton>
    </XModal>
  )
}

export default CreateAppointmentModal
