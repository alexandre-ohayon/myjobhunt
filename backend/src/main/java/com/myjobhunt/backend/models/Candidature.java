package com.myjobhunt.backend.models;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "candidatures")
@Getter
@Setter
public class Candidature {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String company;
  private String jobName;
  private String interviewStatus;
  private String jobDescriptionLink;
  private String recruiterName;
  private String stack;
  private String dateEntretien;
  private Integer roundNumber;
  private String notes;
  private String conclusion;
}

