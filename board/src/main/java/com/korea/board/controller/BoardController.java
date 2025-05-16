package com.korea.board.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.korea.board.dto.BoardDTO;
import com.korea.board.dto.IdListDTO;
import com.korea.board.model.BoardEntity;
import com.korea.board.service.BoardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/board")
@RequiredArgsConstructor
public class BoardController {

	private final BoardService service;

	@GetMapping
	public ResponseEntity<?> allData() {
		List<BoardDTO> list = service.allData();
		return ResponseEntity.ok(list);
	}

	@PostMapping
	public ResponseEntity<?> create(@RequestBody BoardDTO dto) {
		List<BoardDTO> list = service.create(dto);
		return ResponseEntity.ok(list);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteBoard(@PathVariable("id") Long id) {
		boolean result = service.deleteBoard(id);
		if (result) {
			return ResponseEntity.ok("삭제되었습니다");
		} else {
			return ResponseEntity.status(400).body("삭제에 실패했습니다. 아이디를 찾을 수 없거나 제약조건에 의해 삭제할 수 없습니다 : " + id);
		}
	}

	@PutMapping
	public ResponseEntity<?> update(@RequestBody BoardDTO dto) {
		BoardEntity entity = BoardDTO.toEntity(dto);
		List<BoardDTO> list = service.update(entity);
		return ResponseEntity.ok(list);
	}

	@DeleteMapping
	public ResponseEntity<?> deleteBoards(@RequestBody IdListDTO idListDto) {
		service.deleteBoardsByIds(idListDto.getIds());
		return ResponseEntity.ok().build();
	}

}
