package com.mint.controllers;

import javax.inject.Inject;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.mint.entities.Band;
import com.mint.entities.Promoter;
import com.mint.services.SignUpService;

@RestController
@RequestMapping("signup")
public class SignUpController {
	
	private SignUpService signUpService;
	
	@Inject
	public SignUpController(SignUpService signUpService) {
		super();
		this.signUpService = signUpService;
	}

	@PostMapping("promoter")
	@ResponseStatus(HttpStatus.CREATED)
	public Promoter createPromoter(@RequestBody Promoter promoter) {
		return this.signUpService.create(promoter);
	}
	
	@PostMapping("band")
	@ResponseStatus(HttpStatus.CREATED)
	public Band createBand(@RequestBody Band band) {
		return this.signUpService.create(band);
	}
	
	
}