package com.korea.board.model;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BoardEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String title;
	private String author;
	private String content;
	
	@Column(name = "writing_time")
	private LocalDateTime writingTime;

	@PrePersist
	public void setWritingTimeBeforeSave() {
		if (this.writingTime == null) {
			this.writingTime = LocalDateTime.now();
		}
	}

	@PreUpdate
	public void setWritingTimeBeforeUpdate() {
		this.writingTime = LocalDateTime.now();
	}

}
