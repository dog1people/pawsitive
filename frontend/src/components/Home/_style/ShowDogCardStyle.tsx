import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff3e9;
  border-radius: 10px;
  width: 90%;
  margin: 0 auto;
  padding: 17px;
  border: 1px solid #ebebeb;
  box-shadow: 2px 6px 8px rgba(0, 0, 0, 0.1);
`

export const Image = styled.img`
  width: 122px;
  height: 122px;
`
export const Title = styled.div`
  font-weight: 600;
  margin-top: 20px;
  font-size: 1.2em;
`

export const SubTitle = styled.div`
  margin-top: 12px;
  font-size: 0.9em;
  font-weight: 500;
`

export const Button = styled.button`
  background-color: #ffe3cb;
  border-radius: 7px;
  color: #ff9232;
  font-weight: 600;
  height: 40px;
  width: 50%;
  margin-top: 30px;
`
