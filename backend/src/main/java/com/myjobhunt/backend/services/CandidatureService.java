package com.myjobhunt.backend.services;

import com.myjobhunt.backend.models.Candidature;
import com.myjobhunt.backend.repositories.CandidatureRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CandidatureService {

  private final CandidatureRepository repository;

  public CandidatureService(CandidatureRepository repository) {
    this.repository = repository;
  }

  public List<Candidature> getAllCandidatures() {
    return repository.findAll();
  }

  public Candidature getCandidatureById(Long id) {
    return repository.findById(id).orElseThrow(() -> new RuntimeException("Candidature not found for id: " + id));
  }

  public Candidature saveCandidature(Candidature candidature) {
    return repository.save(candidature);
  }

  public void deleteCandidature(Long id) {
    repository.deleteById(id);
  }
}
