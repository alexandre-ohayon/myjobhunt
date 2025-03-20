package com.myjobhunt.backend.controllers;

import com.myjobhunt.backend.dtos.CandidacyDTO;
import com.myjobhunt.backend.services.CandidacyService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/candidacies")
@CrossOrigin(origins = "http://localhost:4200")
public class CandidacyController {

  private final CandidacyService service;

  public CandidacyController(CandidacyService service) {
    this.service = service;
  }

  @GetMapping
  public List<CandidacyDTO> getAllCandidacies(
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size,
      @RequestParam(defaultValue = "id") String sortBy) {
    return service.getAllCandidacies(page, size, sortBy);
  }

  @GetMapping("/{id}")
  public CandidacyDTO getCandidacyById(@PathVariable Long id) {
    return service.getCandidacyById(id);
  }

  @PostMapping
  public CandidacyDTO createCandidacy(@RequestBody CandidacyDTO candidacyDTO) {
    return service.saveCandidacy(candidacyDTO);
  }

  @PutMapping("/{id}")
  public CandidacyDTO updateCandidacy(@PathVariable Long id, @RequestBody CandidacyDTO candidacyDTO) {
    candidacyDTO.setId(id);
    return service.saveCandidacy(candidacyDTO);
  }

  @DeleteMapping("/{id}")
  public void deleteCandidacy(@PathVariable Long id) {
    service.deleteCandidacy(id);
  }
}
