import MainColorMoveCard from '@src/common/MainColorMoveCard'
import HomeStatistics from '@src/components/Home/HomeStatistics'
import ShowDogCard from '@src/components/Home/DefaultStage/ShowDogCard'
import HomePopularCommunity from '@src/components/Home/HomePopularCommunity'
import DefaultStageHeader from '@src/components/Home/DefaultStage/DefaultStageHeader'
import * as c from '@src/components/Home/_style/CommonStageStyle'
import AdoptProcessCard from '@src/components/Home/DefaultStage/AdoptProcessCard'
import { userAtom } from '@src/stores/atoms/user'
import { useAtomValue } from 'jotai'

const Index = () => {
  const user = useAtomValue(userAtom)
  return (
    <div>
      <DefaultStageHeader />
      <c.Wrap>
        <AdoptProcessCard />
        {user.role === 'USER' && (
          <MainColorMoveCard
            title="포지티버가 되어 볼까요?"
            subTitle="체크리스트 확인 후 강아지들을 만나봐요"
            url="/confirm/pawsitive"
            backgroundColor="#FF9232"
          />
        )}
        <HomeStatistics />
        <ShowDogCard />
        <HomePopularCommunity />
      </c.Wrap>
    </div>
  )
}

export default Index
