import styled from 'styled-components'

export const Container = styled.header`
  display: flex;
  position: fixed;
  top: 0;
  width: 390px;
  height: 150px;
  z-index: 100;
  border-bottom: 1px solid #ebebeb;
  background-color: #fff;
`

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
`

export const TopWrap = styled.div`
  display: flex;
  height: 60px;
  align-items: center;
  justify-content: space-between;

  .arrow {
    width: 20px;
    cursor: pointer;
  }

  span {
    font-size: 1em;
    font-weight: 500;
  }

  .call {
    width: 14px;
    height: 16px;
    cursor: pointer;
  }
`

export const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 90px;
`

export const InfoDetailWrap = styled.div`
  display: flex;
  font-size: 0.9em;

  img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    border-radius: 6px;
  }

  span {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .name {
      margin-bottom: 4px;
    }
  }
`
export const DoneText = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 10px;
  font-size: 0.8em;
  color: #ff9232;
  border: 1px solid #ff9232;
  background-color: #fff;
  font-weight: 500;
`

export const ButtonWrap = styled.div`
  display: flex;
  margin-top: 8px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #d9d9d9;
    background-color: #fff;
    border-radius: 2px;
    padding: 4px 10px;
    font-size: 0.8em;
    font-weight: 500;
    margin-right: 10px;
  }
`
