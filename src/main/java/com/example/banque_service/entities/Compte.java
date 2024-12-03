package com.example.banque_service.entities;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Compte {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private  double solde;

    @Temporal(TemporalType.DATE)
    private LocalDate dateCreation;

    @Enumerated(EnumType.STRING)
    private TypeCompte type;


}