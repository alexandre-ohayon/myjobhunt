package com.myjobhunt.backend.services;

import com.myjobhunt.backend.dtos.CandidacyDTO;
import com.myjobhunt.backend.exceptions.ResourceNotFoundException;
import com.myjobhunt.backend.models.Candidacy;
import com.myjobhunt.backend.repositories.CandidacyRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CandidacyService {

  private static final Logger logger = LoggerFactory.getLogger(CandidacyService.class);
  private final CandidacyRepository repository;

  public CandidacyService(CandidacyRepository repository) {
    this.repository = repository;
  }

  public List<CandidacyDTO> getAllCandidacies(int page, int size, String sortBy) {
    logger.info("Fetching all candidacies with pagination and sorting");
    Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
    Page<Candidacy> candidacies = repository.findAll(pageable);
    return candidacies.stream().map(this::convertToDTO).collect(Collectors.toList());
  }

  public CandidacyDTO getCandidacyById(Long id) {
    logger.info("Fetching candidacy with id: {}", id);
    Candidacy candidacy = repository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Candidacy not found for id: " + id));
    return convertToDTO(candidacy);
  }

  public CandidacyDTO saveCandidacy(CandidacyDTO candidacyDTO) {
    logger.info("Saving candidacy");
    Candidacy candidacy = convertToEntity(candidacyDTO);
    return convertToDTO(repository.save(candidacy));
  }

  public void deleteCandidacy(Long id) {
    logger.info("Deleting candidacy with id: {}", id);
    if (!repository.existsById(id)) {
      throw new ResourceNotFoundException("Candidacy not found for id: " + id);
    }
    repository.deleteById(id);
  }

  private CandidacyDTO convertToDTO(Candidacy candidacy) {
    CandidacyDTO dto = new CandidacyDTO();
    dto.setId(candidacy.getId());
    dto.setCompany(candidacy.getCompany());
    dto.setJobTitle(candidacy.getJobTitle());
    dto.setInterviewStatus(candidacy.getInterviewStatus());
    dto.setJobDescriptionLink(candidacy.getJobDescriptionLink());
    dto.setRecruiterName(candidacy.getRecruiterName());
    dto.setTechStack(candidacy.getTechStack());
    dto.setInterviewDate(candidacy.getInterviewDate());
    dto.setNotes(candidacy.getNotes());
    return dto;
  }

  private Candidacy convertToEntity(CandidacyDTO dto) {
    Candidacy candidacy = new Candidacy();
    candidacy.setId(dto.getId());
    candidacy.setCompany(dto.getCompany());
    candidacy.setJobTitle(dto.getJobTitle());
    candidacy.setInterviewStatus(dto.getInterviewStatus());
    candidacy.setJobDescriptionLink(dto.getJobDescriptionLink());
    candidacy.setRecruiterName(dto.getRecruiterName());
    candidacy.setTechStack(dto.getTechStack());
    candidacy.setInterviewDate(dto.getInterviewDate());
    candidacy.setNotes(dto.getNotes());
    return candidacy;
  }
}
