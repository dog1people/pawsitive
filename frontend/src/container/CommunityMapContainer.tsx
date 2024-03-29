import KakaoMap from '@src/components/Community/KakaoMap'
import { useNavigate } from 'react-router-dom'
import * as c from '@src/container/style/CommunityListInfoContainerStyle'
import { CommunityListAtom } from '@src/stores/atoms/community'
import { useQuery } from '@tanstack/react-query'
import { CommunityResType } from '@src/types/communityType'
import { fetchCommunityList } from '@src/apis/community'
import { useEffect, useState } from 'react'
import CommunityCategorySection from '@src/components/CommunityList/CommunityCategorySection'
import { useAtom, useAtomValue } from 'jotai/index'
import { userAtom } from '@src/stores/atoms/user'

const CommunityMapContainer = () => {
  const user = useAtomValue(userAtom)
  const navigate = useNavigate()
  const [category, setCategory] = useState(0)
  const [communityListValue, setcommunityList] = useAtom(CommunityListAtom)

  // 무한 스크롤 아직 구현 못함
  const { data, refetch } = useQuery<CommunityResType>({
    queryKey: ['communityList'],
    queryFn: async () =>
      fetchCommunityList({
        page: 0,
        size: 30,
        sort: ['string'],
        categoryNo: category,
      }),
  })

  useEffect(() => {
    if (data) {
      const listValue = data.content
      setcommunityList(listValue)
    }
  }, [data, setcommunityList])

  const isMapChange = () => {
    navigate('/community')
  }

  useEffect(() => {
    refetch().then(r => r)
  }, [category, refetch])

  const goCreateCommunity = () => navigate('/community/create')

  return (
    <c.Container>
      <c.Header>
        <c.HeaderButton type="button" onClick={isMapChange}>
          목록보기
        </c.HeaderButton>
        {user.stage > 3 && (
          <c.CreateButton type="button" onClick={goCreateCommunity}>
            작성하기
          </c.CreateButton>
        )}
      </c.Header>

      <c.CategoryDiv>
        <CommunityCategorySection
          category={category}
          setCategory={setCategory}
        />
      </c.CategoryDiv>
      <KakaoMap dummyData={communityListValue} />
    </c.Container>
  )
}

export default CommunityMapContainer
