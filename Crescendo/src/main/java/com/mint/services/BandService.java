package com.mint.services;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.mint.entities.Band;
import com.mint.entities.Credentials;
import com.mint.entities.Gig;
import com.mint.repositories.BandRepository;

@Service
public class BandService {

	BandRepository bandRepository;
	
	@Inject
	public BandService(BandRepository bandRepository)
	{
		super();
		this.bandRepository = bandRepository;
	}
	
	public Band getById(int id) {
		return this.bandRepository.getById(id);
	}

	public Band create(Band band) throws NoSuchAlgorithmException {
		band.setHashedPassword(band.getPassword());
		return this.bandRepository.create(band);
	}

	public Band update(Band band) {
		return this.bandRepository.update(band);
	}

	public Band deleteById(int id) {
		return this.bandRepository.deleteById(id);
	}

	public Band login(Band band) throws NoSuchAlgorithmException {
		Credentials credentials = new Credentials();
		credentials.setEmail(band.getEmail());
		credentials.setPassword(band.getPassword());
		credentials.setHashedPassword(credentials.getPassword());
		return this.bandRepository.login(credentials);
	}

	public List<Gig> getInvites(int id) {
		return this.bandRepository.getInvites(id);
	}

	public List<Gig> getGigs(int id) {
		return this.bandRepository.getGigs(id);
	}

	public void resolveInvite(int bandId, int gigId, String status) {
		this.bandRepository.resolveInvite(bandId, gigId, status);
		
	}

}
