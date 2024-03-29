import * as n from '@src/common/style/NavbarStyle'
import { useLocation } from 'react-router-dom'

const Navbar = () => {
  const locationNow = useLocation()

  // if (locationNow.pathname.match(/^\/chat\/\d+$/)) return null
  if (locationNow.pathname === '/mypage/survey') return null
  if (locationNow.pathname === '/mypage/survey/done') return null
  if (locationNow.pathname === '/confirm/pawsitive') return null
  if (locationNow.pathname === '/mypage/findSimilarDog/result') return null
  if (locationNow.pathname === '/mypage/findSimilarDog') return null
  if (locationNow.pathname === '/signUp') return null
  if (locationNow.pathname === '/community/map') return null

  return (
    <n.Container>
      <n.MenuWrap>
        <n.MenuItem to="/">
          <n.Image src="/icon/icon_home.png" alt="" />
          <n.Label>홈</n.Label>
        </n.MenuItem>
        <n.MenuItem to="/chat">
          <n.Image src="/icon/icon_chat.png" alt="" />
          <n.Label>채팅</n.Label>
        </n.MenuItem>
        <n.MenuItem to="/dogs">
          <n.Image src="/icon/icon_pin.png" alt="" />
          <n.Label>공고</n.Label>
        </n.MenuItem>
        <n.MenuItem to="/community">
          <n.Image src="/icon/icon_footprint.png" alt="" />
          <n.Label>발자국</n.Label>
        </n.MenuItem>
        <n.MenuItem to="/mypage">
          <n.Image src="/icon/icon_mypage.png" alt="" />
          <n.Label>마이</n.Label>
        </n.MenuItem>
      </n.MenuWrap>
    </n.Container>
  )
}

export default Navbar
