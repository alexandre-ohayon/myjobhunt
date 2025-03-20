package com.myjobhunt.backend.dtos;

import lombok.Data;
import java.util.List;

@Data
public class CandidacyDTO {
  private Long id;
  private String company;
  private String jobTitle;
  private List<String> interviewStatus;
  private String jobDescriptionLink;
  private String recruiterName;
  private String techStack;
  private String interviewDate;
  private String notes;
}
