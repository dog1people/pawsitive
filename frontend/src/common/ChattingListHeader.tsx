import * as c from '@src/components/Chatting/_style/ChattingListHeaderStyle'
import { ChattingListHeaderPropsType } from '@src/types/chatType'

const ChattingListHeader: React.FC<ChattingListHeaderPropsType> = ({
  title,
}) => {
  return (
    <c.Container>
      <c.Wrap>{title}</c.Wrap>
    </c.Container>
  )
}

export default ChattingListHeader
