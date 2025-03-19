package com.myjobhunt.backend.controllers;

import com.myjobhunt.backend.models.Candidature;
import com.myjobhunt.backend.services.CandidatureService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/candidatures")
@CrossOrigin(origins = "http://localhost:4200")
public class CandidatureController {

  private final CandidatureService service;

  public CandidatureController(CandidatureService service) {
    this.service = service;
  }

  @GetMapping
  public List<Candidature> getAllCandidatures() {
    return service.getAllCandidatures();
  }

  @GetMapping("/{id}")
  public Candidature getCandidatureById(@PathVariable Long id) {
    return service.getCandidatureById(id);
  }

  @PostMapping
  public Candidature createCandidature(@RequestBody Candidature candidature) {
    return service.saveCandidature(candidature);
  }

  @PutMapping("/{id}")
  public Candidature updateCandidature(@PathVariable Long id, @RequestBody Candidature candidature) {
    candidature.setId(id);
    return service.saveCandidature(candidature);
  }

  @DeleteMapping("/{id}")
  public void deleteCandidature(@PathVariable Long id) {
    service.deleteCandidature(id);
  }
}
