package com.korea.board.dto;

import java.time.format.DateTimeFormatter;

import com.korea.board.model.BoardEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BoardDTO {
	private Long id;
	private String title;
	private String author;
	private String writingTime;
	private String content;
	
	public BoardDTO(BoardEntity entity) {
		this.id = entity.getId();
		this.title = entity.getTitle();
		this.author = entity.getAuthor();
		this.content = entity.getContent();
		
		if (entity.getWritingTime() != null) {
            this.writingTime = entity.getWritingTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        }
	}
	
	public static BoardEntity toEntity(BoardDTO dto) {
		return BoardEntity.builder()
				.id(dto.getId())
				.title(dto.getTitle())
				.author(dto.getAuthor())
				.content(dto.getContent())
				.build();
	}
}
