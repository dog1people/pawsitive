package com.pawsitive.usergroup.controller;

import static org.springframework.http.HttpStatus.OK;

import com.pawsitive.auth.jwt.JwtToken;
import com.pawsitive.common.dto.BaseResponseBody;
import com.pawsitive.usergroup.dto.request.SilentRefreshReq;
import com.pawsitive.usergroup.dto.request.UserSurveyReq;
import com.pawsitive.usergroup.dto.request.UserTypeStagePatchReq;
import com.pawsitive.usergroup.dto.response.MemberDogVisitListRes;
import com.pawsitive.usergroup.dto.response.UpdateFieldRes;
import com.pawsitive.usergroup.dto.response.UserRes;
import com.pawsitive.usergroup.dto.response.UserSurveyRes;
import com.pawsitive.usergroup.service.MemberDogVisitService;
import com.pawsitive.usergroup.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Tag(name = "01.User")
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;

    private final MemberDogVisitService memberDogVisitService;

    /**
     * User 인증 필터 테스트용 메서드입니다.
     *
     * @return OK 응답객체
     */
    @GetMapping("/me/{userNo}")
    @Operation(summary = "유저 정보 반환",
        description = "현재 로그인한 User의 정보를 반환한다.",
        tags = {"01.User"},
        responses = {
            @ApiResponse(responseCode = "200", description = "유저가 로그인 되어있음"),
            @ApiResponse(responseCode = "401", description = "로그인 되어있지 않음 (권한 없음)")
        }
    )
    public ResponseEntity<UserRes> me(@PathVariable Integer userNo) {
        return ResponseEntity
            .status(OK)
            .body(userService.getUserResByUserNo(userNo));
    }

    @GetMapping("/matrix/{userNo}")
    @Operation(summary = "유저 행렬 가져오기 (테스트용)",
        description = "조회에 따라 행렬이 잘 들어가는지 확인하기 위해서 만들었습니다.",
        tags = {"01.User"}
    )
    public ResponseEntity<List<Double>> getMemberDogMatrix(@PathVariable int userNo) {
        return ResponseEntity
            .status(OK)
            .body(memberDogVisitService.getMatrixAsList(userNo));
    }

    @GetMapping("/visited/{userNo}")
    @Operation(summary = "유저 방문기록 가져오기 (테스트용)",
        description = "조회에 따라 방문기록이 잘 들어가는지 확인하기 위해서 만들었습니다.",
        tags = {"01.User"}
    )
    public ResponseEntity<MemberDogVisitListRes> getMemberDogVisit(@PathVariable int userNo) {
        return ResponseEntity
            .status(OK)
            .body(memberDogVisitService.getVisitList(userNo));
    }

    /**
     * 유저 정보를 수정하는 컨트롤러 메서드입니다.
     *
     * @param req 수정할 값을 가지고 있는 요청 DTO 객체
     * @return OK 응답객체
     */
    @PostMapping("/update")
    @Operation(summary = "유저 정보 수정하기",
        description = "로그인한 회원의 정보를 수정한다.",
        tags = {"01.User"},
        responses = {
            @ApiResponse(responseCode = "200", description = "회원 정보 수정 성공"),
            @ApiResponse(responseCode = "401", description = "현재 로그인 한 회원의 계정이 유효하지 않습니다."),
        }
    )
    public ResponseEntity<UpdateFieldRes> updateField(@RequestBody UserTypeStagePatchReq req) {
        return ResponseEntity
            .status(OK)
            .body(userService.updateField(req));
    }


    /**
     * 리프레시 토큰을 갱신하는 컨트롤러 메서드입니다.
     *
     * @param req            이메일, refreshToken을 가진 요청 DTO 객체
     * @param authentication 인증 객체
     * @return 재발급된 JWT 토큰 객체
     */
    @PostMapping("/silent-refresh")
    @Operation(
        summary = "JWT 토큰 재발급",
        description = "전달된 RefreshToken 값을 확인하여 JWT Token을 재발급한다.",
        tags = {"01.User"},
        responses = {
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "권한 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
        }
    )
    public ResponseEntity<JwtToken> silentRefresh(@RequestBody SilentRefreshReq req,
                                                  Authentication authentication) {
        log.info("userController : silent-refresh = {}", authentication.toString());

        return ResponseEntity
            .status(OK)
            .body(userService.reissueJwtToken(req, authentication));
    }

    /**
     * 로그인한 유저가 로그아웃 하는 컨트롤러 메서드입니다.
     *
     * @param email 유저 이메일
     * @return OK 응답 객체
     */
    @PostMapping("/logout")
    @Operation(
        summary = "로그아웃",
        description = "현재 로그인한 유저를 로그아웃 처리 한다.",
        tags = {"01.User"},
        responses = {
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "권한 없음"),
            @ApiResponse(responseCode = "404", description = "로그아웃 오류 (로그인 데이터 없음)"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
        }
    )
    public ResponseEntity<BaseResponseBody> logout(@RequestBody String email) {
        userService.signOut(email);
        return ResponseEntity
            .status(OK)
            .body(BaseResponseBody.of(OK, "로그아웃 완료"));
    }

    @PostMapping("/survey")
    @Operation(
        summary = "입양 설문 저장 (등록 / 수정)",
        description = "작성한 입양 설문을 저장한다.",
        tags = {"01.User"},
        responses = {
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "권한 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
        }
    )
    public ResponseEntity<UserSurveyRes> createSurvey(@RequestBody UserSurveyReq req) {
        return ResponseEntity
            .status(OK)
            .body(userService.createSurvey(req));
    }

    @GetMapping("/survey")
    @Operation(
        summary = "입양 설문 조회",
        description = "userNo에 해당하는 입양 설문을 조회한다.",
        tags = {"01.User"},
        responses = {
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "400", description = "userNo에 해당하는 입양 설문 값이 없음"),
            @ApiResponse(responseCode = "401", description = "권한 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
        }
    )
    public ResponseEntity<UserSurveyRes> getSurvey(@RequestParam int userNo) {
        return ResponseEntity
            .status(OK)
            .body(userService.getSurvey(userNo));
    }

//    @DeleteMapping("/{userId}")
//    public ResponseEntity<UserCheckRes> deleteUser(@PathVariable String userId,
//                                                   Authentication authentication) {
//        // 로그인 한 사용자가 아닐 경우
//        if (Objects.isNull(authentication.getDetails())) {
//            throw new UserNotLoginException();
//        }
//
//        // 회원 탈퇴 성공했을 경우
//        userService.deleteUserByUserId(userId);
//        return ResponseEntity
//            .status(NO_CONTENT)
//            .body(UserCheckRes.of(NO_CONTENT, "Success"));
//    }

}
