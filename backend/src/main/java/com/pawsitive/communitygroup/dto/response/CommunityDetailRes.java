package com.pawsitive.communitygroup.dto.response;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CommunityDetailRes {
    private CommunityBoardDetailRes board;
    private List<CommunityCommentDetailRes> comments;

}
