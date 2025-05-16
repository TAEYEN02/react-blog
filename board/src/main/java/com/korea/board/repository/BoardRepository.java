package com.korea.board.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.korea.board.model.BoardEntity;

@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, Long>{
	List<BoardEntity> findAllByOrderByWritingTimeDesc();
}
