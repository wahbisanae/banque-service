package com.example.banque_service;

import com.example.banque_service.entities.Compte;
import com.example.banque_service.entities.TypeCompte;
import com.example.banque_service.repositories.CompteRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;

@SpringBootApplication
public class BanqueServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BanqueServiceApplication.class, args);
	}
	@Bean
	CommandLineRunner start(CompteRepository compteRepository) {
		return args -> {


			compteRepository.save(new Compte(null, Math.random() * 9000, LocalDate.now(), TypeCompte.EPARGNE));
			compteRepository.save(new Compte(null, Math.random() * 9000, LocalDate.now(), TypeCompte.COURANT));
			compteRepository.save(new Compte(null, Math.random() * 9000, LocalDate.now(), TypeCompte.EPARGNE));
			compteRepository.findAll().forEach(c -> {
				System.out.println(c.toString());
			});
		};

	}

}
