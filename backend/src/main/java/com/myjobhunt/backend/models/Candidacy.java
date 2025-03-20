package com.myjobhunt.backend.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "candidacies")
@Data
public class Candidacy {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String company;
  private String jobTitle;
  @ElementCollection
  private List<String> interviewStatus;
  private String jobDescriptionLink;
  private String recruiterName;
  private String techStack;
  private String interviewDate;
  private String notes;
}
