package com.example.banque_service.DTO;

import com.example.banque_service.entities.TypeTransaction;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
@Data
public class TransactionRequest {

    // Getters et Setters
    @NotNull
    private Long compteId;

    @NotNull
    @Positive
    private double montant;

    @NotNull
    private LocalDate date;

    @NotNull
    private TypeTransaction type;

}
