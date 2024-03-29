import styled from 'styled-components'
import DogFileSection from '@src/components/DogDetail/DogFileSection'
import ShelterName from '@src/components/DogDetail/ShelterName'
import DogAdditionalInfo from '@src/components/DogDetail/DogAdditionalInfo'
import ChatStartButton from '@src/components/DogDetail/ChatStartButton'
import ShelterInfoSection from '@src/components/DogDetail/ShelterInfoSection'
import SameShelterDogs from '@src/components/DogDetail/SameShelterDogs'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { DogType } from '@src/types/dogType'
import { fetchDogDetails } from '@src/apis/dog'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { dogDetailAtom, dogLikedAtom } from '@src/stores/atoms/dog'
import { useEffect } from 'react'
import { userAtom } from '@src/stores/atoms/user'
import AdoptProcessInfoComponent from '@src/components/DogDetail/AdoptProcessInfoComponent'
import TipSection from '@src/components/DogDetail/TipSection'

const Container = styled.div`
  padding-bottom: 80px;
`

const DogDetailContainer = () => {
  const user = useAtomValue(userAtom)
  const { dogNo } = useParams<{ dogNo: string }>()
  const [dogDetail, setDogDetail] = useAtom(dogDetailAtom)
  const setUserLike = useSetAtom(dogLikedAtom)

  const { data, isLoading, refetch } = useQuery<DogType | null>({
    queryKey: ['dogDetail', user.userNo, dogNo],
    queryFn: () => fetchDogDetails(Number(dogNo), user.userNo),
  })

  useEffect(() => {
    if (!isLoading && data) {
      setDogDetail(data)
      setUserLike(data.userLiked)
    }
  }, [data, isLoading, dogDetail, setDogDetail, setUserLike])

  useEffect(() => {
    refetch().then(r => r)
  }, [refetch])

  const isNotButtonShow =
    user.role === 'SHELTER' && user.name !== dogDetail.userName

  const isAdopted = dogDetail.statusNo !== 0

  return (
    <Container>
      {!isLoading && data && (
        <>
          <DogFileSection
            files={data.files}
            name={data.name}
            sex={data.sex}
            neutralized={data.neutralized}
            kind={data.kind}
            hit={data.hit}
            age={data.age}
          />
          <ShelterName
            userName={data.userName}
            address={data.address}
            dogNo={data.dogNo}
          />
          <DogAdditionalInfo note={data.note} />
          {!!data.contentNo && data.contentTitle && (
            <TipSection
              contentNo={data.contentNo}
              contentTitle={data.contentTitle}
            />
          )}
          <ShelterInfoSection
            address={data.address}
            createdAt={data.createdAt}
            userName={data.userName}
          />
          <AdoptProcessInfoComponent />
          <SameShelterDogs dogDetail={dogDetail} />
          {!isNotButtonShow && !isAdopted && <ChatStartButton />}
        </>
      )}
    </Container>
  )
}

export default DogDetailContainer
