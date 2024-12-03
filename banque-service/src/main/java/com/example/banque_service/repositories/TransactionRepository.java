package com.example.banque_service.repositories;

import com.example.banque_service.entities.Transaction;
import com.example.banque_service.entities.Compte;
import com.example.banque_service.entities.TypeTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByCompte_Id(Long compteId);

    @Query("SELECT SUM(t.montant) FROM Transaction t WHERE t.type = :type")
    Double sumByType(TypeTransaction type);

    @Query("SELECT t FROM Transaction t WHERE t.compte.id = :compteId")
    List<Transaction> findByCompteId(Long compteId);

    List<Transaction> findByCompte(Compte compte);

}