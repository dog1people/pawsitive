package com.pawsitive.chatgroup.controller;

import static org.springframework.http.HttpStatus.OK;

import com.pawsitive.chatgroup.dto.response.ChatSessionRes;
import com.pawsitive.chatgroup.dto.response.ChatTokenRes;
import com.pawsitive.chatgroup.service.OpenviduService;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author 이하늬
 * @since 1.0
 */
@Tag(name = "11.Openvidu")
@RequiredArgsConstructor
@RestController
@RequestMapping("/openvidu/api/sessions")
public class OpenViduController {
    private final OpenviduService openviduService;


    @PostMapping
    @Operation(summary = "화상 채팅방 커넥션 생성", description = "화상 채팅방 커넥션을 생성해 sessionId를 반환합니다.",
        responses = {
            @ApiResponse(responseCode = "200", description = "화상 채팅방 커넥션 생성 성공"),
        }
    )
    public ResponseEntity<ChatSessionRes> createSessions(
        @RequestBody(required = false) Map<String, Object> params)
        throws OpenViduJavaClientException, OpenViduHttpException {

        return ResponseEntity
            .status(OK)
            .body(openviduService.createSessions(params));
    }

    @PostMapping("/{sessionId}/connections")
    @Operation(summary = "화상 채팅방 토큰 얻기", description = "sessionId에 대한 화상 채팅방 토큰을 반환합니다.",
        responses = {
            @ApiResponse(responseCode = "200", description = "화상 채팅방 토 조회 성공"),
        }
    )
    public ResponseEntity<ChatTokenRes> createConnection(
        @PathVariable("sessionId") String sessionId,
        @RequestBody(required = false) Map<String, Object> params)
        throws OpenViduJavaClientException, OpenViduHttpException {

        return ResponseEntity
            .status(OK)
            .body(openviduService.getToken(sessionId, params));
    }
}