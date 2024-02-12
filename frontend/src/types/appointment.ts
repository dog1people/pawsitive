import { CloseFunctionType } from '@src/types/commonType'

export type AppointmentReqType = {
  userNo: number
  chatRoomNo: number
  date: string
  time: string
}

// 입양약속 생성 타입
export type CreateAppointmentModalType = {
  chatRoomNo: number
  shelterName: string
  dogName: string
} & CloseFunctionType

// 입양약속 확인 타입
export type ConfirmAppointmentModalType = {
  promise: {
    date: string
    isAccepted: boolean | null
    time: string
  }
} & CloseFunctionType &
  CreateAppointmentModalType
