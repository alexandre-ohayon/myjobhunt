package com.myjobhunt.backend.repositories;

import com.myjobhunt.backend.models.Candidacy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CandidacyRepository extends JpaRepository<Candidacy, Long> {
}
