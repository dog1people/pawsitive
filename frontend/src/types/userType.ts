export type UserType = {
  userNo: number
  email: string
  name: string
  password: string
  address: string
  role: string
  birth: string
  gender: string
  type: number
  stage: number
}

export type AfterAdoptionUserInfo = {
  adoptedDays: number
  answerCount: number
  memoryCount: number
}

// 회원가입
export type JoinUserType = {
  name: string
  role: string
  email: string
  pw: string
  birth: string
  gender: string
  address: string
  type: number
}

export type JoinUserResponseType = {
  userNo: number
  email: string
  name: string
  address: string
  role: string
  birth: string
  gender: string
  type: number
  stage: number
}

export type JoinUserErrorType = {
  name: string
  dob: string
  email: string
  emailVerify: string
  pwCheck: string
}

// 이메일 인증
export type EmailCodeVerifyType = {
  email: string
  authCode: string
}

export type EmailCodeVerifyResponseType = {
  email: string
  result: boolean
}

// 로그인
export type LoginUserType = {
  id: string
  password: string
}
export type JwtTokenType = {
  grantType: string
  accessToken: string
  refreshToken: string
}
export type LoginUserResponseType = {
  jwtToken: JwtTokenType
  userNo: number
  email: string
  name: string
  password: string
  role: string
  address: string
  birth: string
  gender: string
  type: number
  stage: number
}
export type LoginRefreshType = {
  postData: {
    email: string
    refreshToken: string
  }
  grantType: string
  accessToken: string
}

export type UpdateUserStageReqType = {
  userNo: number
  field: string
  value: number
}

export type UserInformationType = {
  userNo: number
  email: string
  name: string
  password: string
  role: string
  address: string
  birth: string
  gender: string
  type: number
  stage: number
}
