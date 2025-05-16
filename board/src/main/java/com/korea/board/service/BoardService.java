package com.korea.board.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.korea.board.dto.BoardDTO;
import com.korea.board.model.BoardEntity;
import com.korea.board.repository.BoardRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService {

	private final BoardRepository repository;

	public List<BoardDTO> allData() {
		List<BoardEntity> list = repository.findAllByOrderByWritingTimeDesc();
		return list.stream().map(BoardDTO::new).toList();
	}

	public List<BoardDTO> create(BoardDTO dto) {
		BoardEntity entity = BoardDTO.toEntity(dto);
		entity = repository.save(entity);
		return List.of(new BoardDTO(entity));
	}

	public boolean deleteBoard(Long id) {
		Optional<BoardEntity> board = repository.findById(id);
		if (board.isPresent()) {
			try {
				repository.deleteById(id);
				return true;
			} catch (Exception e) {
				e.printStackTrace();
				return false;
			}
		} else {
			return false;
		}
	}

	public List<BoardDTO> update(BoardEntity entity) {
		Optional<BoardEntity> board = repository.findById(entity.getId());
		board.ifPresent(BoardEntity -> {
			BoardEntity.setTitle(entity.getTitle());
			BoardEntity.setAuthor(entity.getAuthor());
			BoardEntity.setContent(entity.getContent());
			BoardEntity.setWritingTime(entity.getWritingTime());

			repository.save(BoardEntity);
		});
		return allData();
	}

	@Transactional
	public void deleteBoardsByIds(List<Long> ids) {
		repository.deleteAllByIdInBatch(ids);
	}

}
