package com.pawsitive.chatgroup.repository;

import com.pawsitive.chatgroup.entity.ChatRoom;
import java.util.List;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface ChatRoomRepositoryCustom {
    List<ChatRoom> getChatRoomsByOrderByCreatedAtDesc(int userNo);

}