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

  private String entreprise;
  private String poste;
  private String statut;
  private String lien;
  private String recruteur;
  private String stack;
  private String dateEntretien;
  private Integer numeroEntretien;
  private String notes;
  private String conclusion;
}

