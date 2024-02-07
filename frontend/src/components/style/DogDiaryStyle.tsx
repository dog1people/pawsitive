import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  width: 188px;
  height: 175px;
  border-radius: 9px;
  background: #ffe3cb;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0 11px;
  margin-left: 6px;
`
export const LinkDiv = styled(Link)`
  width: 110px;
  margin-left: 5px;
`

export const BoneBowl = styled.img`
  width: 100%;
  padding-top: 10px;
  padding-bottom: 18px;
`

export const TitleContainer = styled.div`
  height: 25%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`

export const SubTitle = styled.div`
  width: 100%;
  text-align: center;
  font-size: 10px;
  font-weight: 600;
  color: black;
  margin-bottom: 5px;
`

export const Title = styled.div`
  width: 100%;
  text-align: center;
  font-size: 16px;
  font-weight: 800;
  color: #ff9232;
`
