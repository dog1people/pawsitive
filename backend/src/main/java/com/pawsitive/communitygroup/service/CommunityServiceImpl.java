package com.pawsitive.communitygroup.service;

import com.pawsitive.communitygroup.dto.request.CommunityCreateReq;
import com.pawsitive.communitygroup.dto.response.CommunityBoardDetailRes;
import com.pawsitive.communitygroup.dto.response.CommunityCommentDetailRes;
import com.pawsitive.communitygroup.dto.response.CommunityDetailRes;
import com.pawsitive.communitygroup.entity.CommunityBoard;
import com.pawsitive.communitygroup.exception.CommunityBoardNotFoundException;
import com.pawsitive.communitygroup.repository.CommunityBoardRepository;
import com.pawsitive.communitygroup.transfer.CommunityTransfer;
import com.pawsitive.usergroup.service.UserService;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class CommunityServiceImpl implements CommunityService {
    private final CommunityBoardRepository communityBoardRepository;
    private final CommunityCategoryService categoryService;
    private final CommunityImageService communityImageService;
    private final UserService userService;


    @Override
    public Page<CommunityBoardDetailRes> getCommunityList(Pageable pageable, Integer categoryNo) {
        Page<CommunityBoardDetailRes> communityList;
        if (categoryNo == null || categoryNo.equals(0)) {
            communityList = communityBoardRepository.getBoardList(pageable);
        } else {
            communityList = getCommunityListByCommunityCategoryNo(pageable, categoryNo);
        }
        for (CommunityBoardDetailRes board : communityList) {
            setImages(board);
            setAddress(board);
        }
        return communityList;
    }

    private void setImages(CommunityBoardDetailRes board) {
        board.setImages(communityBoardRepository.getCommunityImagesByDogNo(board.getBoardNo()));
    }


    @Override
    public Page<CommunityBoardDetailRes> getCommunityListByCommunityCategoryNo(Pageable pageable,
                                                                               int categoryNo) {
        Page<CommunityBoardDetailRes> communityList =
            communityBoardRepository.getBoardListByCategoryNo(pageable, categoryNo);
        for (CommunityBoardDetailRes board : communityList) {
            setImages(board);
            setAddress(board);
        }
        return communityList;
    }

    @Override
    public CommunityDetailRes getCommunity(int boardNo) {
        CommunityBoardDetailRes board = getCommunityBoard(boardNo);
        setAddress(board);
        setImages(board);
        return getCommunityByBoard(board);
    }

    @Override
    public CommunityBoardDetailRes getCommunityBoard(int boardNo) {
        // 엔티티 가져오기
        CommunityBoard communityBoard = getCommunityBoardEntity(boardNo);
//        CommunityBoard saved = updateHit(boardNo);

        // 응답 객체 생성
        CommunityBoardDetailRes communityBoardDetailRes =
            CommunityTransfer.entityToDto(communityBoard);
        setAddress(communityBoardDetailRes);

        return communityBoardDetailRes;
    }

    @Override
    public CommunityBoard getCommunityBoardEntity(int boardNo) {
        return communityBoardRepository.getCommunityBoardByCommunityBoardNo(boardNo)
            .orElseThrow(CommunityBoardNotFoundException::new);
    }

    @Override
    @Transactional
    public CommunityBoard updateHit(int boardNo) {
        CommunityBoard board = getCommunityBoardEntity(boardNo);
        board.setHit(board.getHit() + 1);
        return communityBoardRepository.save(board);
    }

    @Override
    public List<CommunityBoardDetailRes> getRecommendationCommunityList(int num) {
        List<CommunityBoardDetailRes> communityList =
            communityBoardRepository.getRecommendationBoardListLimitNum(num);
        for (CommunityBoardDetailRes board : communityList) {
            setAddress(board);
            setImages(board);
        }
        return communityList;
    }

    @Override
    @Transactional
    public CommunityBoardDetailRes createCommunityBoard(CommunityCreateReq req,
                                                        MultipartFile[] images) {
        CommunityBoard savedBoard = communityBoardRepository.save(CommunityBoard.builder()
            .member(userService.getMemberByUserNo(req.getUserNo()))
            .title(req.getTitle())
            .content(req.getContent())
            .isPublic(req.getIsPublic())
            .latitude(req.getLatitude())
            .longitude(req.getLongitude())
            .hit(0)
            .communityCategory(categoryService.getCategoryByCategoryNo(req.getCategoryNo()))
            .build());

        communityImageService.createCommunityImage(savedBoard, images);

        return getCommunityBoard(savedBoard.getCommunityBoardNo());
    }

    private CommunityDetailRes getCommunityByBoard(CommunityBoardDetailRes board) {
        setImages(board);
        setAddress(board);
        List<CommunityCommentDetailRes> commentList =
            communityBoardRepository.getCommentsByBoardNo(board.getBoardNo());

        return new CommunityDetailRes(board, commentList);
    }

    private void setAddress(CommunityBoardDetailRes board) {
        String address = board.getMemberAddress().split(" ")[0];
        board.setMemberAddress(address);
    }


    private List<CommunityDetailRes> getCommunityListByBoardList(
        List<CommunityBoardDetailRes> boardList) {
        List<CommunityDetailRes> communityList = new ArrayList<>();

        for (CommunityBoardDetailRes board : boardList) {
            communityList.add(getCommunityByBoard(board));
        }

        return communityList;
    }

}
