import * as m from '@src/components/style/KakaoMapStyle'
import { MutableRefObject, useCallback, useEffect, useRef } from 'react'
import Locations from '@src/components/Community/Locations'

const KakaoMap = () => {
  const mapRef = useRef<kakao.maps.Map | null>(null)
  const location: string | { latitude: number; longitude: number } = Locations()

  const initMap = useCallback(() => {
    if (typeof location !== 'string') {
      const container = document.getElementById('map')
      const options = {
        center: new kakao.maps.LatLng(location.latitude, location.longitude),
        level: 2,
      }

      const map = new kakao.maps.Map(container as HTMLElement, options)
      ;(mapRef as MutableRefObject<kakao.maps.Map>).current = map

      // 더미 데이터에서 위치 정보를 가져와 마커를 표시
      const dummyData = [
        {
          title: '마커1',
          latlng: new kakao.maps.LatLng(
            location.latitude + 0.0002,
            location.longitude + 0.0002,
          ),
        },
        {
          title: '마커2',
          latlng: new kakao.maps.LatLng(
            location.latitude - 0.0002,
            location.longitude - 0.0002,
          ),
        },
        {
          title: '마커3',
          latlng: new kakao.maps.LatLng(location.latitude, location.longitude),
        },
      ]

      dummyData.forEach(data => {
        const marker = new kakao.maps.Marker({
          position: data.latlng,
          map,
          title: data.title,
        })

        // 마커를 클릭했을 때의 이벤트 처리
        kakao.maps.event.addListener(marker, 'click', function () {
          alert(`마커 클릭 - ${data.title}`)
        })
      })
    }
  }, [location])

  useEffect(() => {
    kakao.maps.load(() => initMap())
  }, [mapRef, location, initMap])

  return (
    <div>
      <m.Container id="map" />
      <m.CurrentButton onClick={() => initMap()}>현재 위치</m.CurrentButton>
    </div>
  )
}

export default KakaoMap
