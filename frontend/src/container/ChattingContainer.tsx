import { useAtom } from 'jotai/index'
import { userAtom } from '@src/stores/atoms/user'
import { useQuery } from '@tanstack/react-query'
import { ChatRoomType } from '@src/types/chatType'
import { fetchChatRooms } from '@src/apis/chat'
import { useNavigate } from 'react-router-dom'
import ChattingListItem from '@src/components/Chatting/ChattingListItem'
import * as c from '@src/container/style/ChattingContainerStyle'

const ChattingContainer = () => {
  const [user] = useAtom(userAtom)
  const navigate = useNavigate()

  const { data, isLoading } = useQuery<ChatRoomType[]>({
    queryKey: ['fetchChatRooms'],
    queryFn: () => fetchChatRooms(user.userNo),
  })

  const goChatRoom = (id: string) => navigate(`/chat/${id}`)

  return (
    <c.Container>
      <p>{user.name}님의 채팅방 목록</p>
      <c.Wrap>
        {!isLoading &&
          data &&
          data.map(item => (
            <div
              key={item.chatRoomNo}
              onClick={() => goChatRoom(item.chatRoomNo)}
            >
              <ChattingListItem
                chatRoomNo={item.chatRoomNo}
                name={item.name}
                createdAt={item.createdAt}
                dogNo={item.dogNo}
                id={item.id}
                userNo={item.userNo}
              />
            </div>
          ))}
      </c.Wrap>
    </c.Container>
  )
}

export default ChattingContainer
