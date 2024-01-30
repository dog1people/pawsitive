package com.pawsitive.communitygroup.response;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * @author 이하늬
 * @since 1.0
 */
@Getter
@AllArgsConstructor
public class CommunityCommentDetailRes {
    private String memberEmail;
    private String memberName;
    private String content;
    private LocalDateTime createdAt;
}