package com.pawsitive.chatgroup.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class ChatCreateReq {

    private int chatRoomNo;
    private int senderNo;
    private String type;
    private String message;

}