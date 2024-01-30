import MainColorMoveCard from '@src/common/MainColorMoveCard'
import LightColorMoveCard from '@src/common/LightColorMoveCard'

const Index = () => {
  return (
    <div>
      <MainColorMoveCard
        title="유기견 입양한 후기 보러가요!"
        subTitle="포지티버의 후기 확인하기"
        url="/community "
      />
      <LightColorMoveCard title="더 많은 펫과사전 찾아보기" url="/dictionary" />
    </div>
  )
}

export default Index