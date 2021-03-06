package com.mint.repositories;

import java.util.HashSet;
import java.util.List;

import javax.inject.Inject;
import javax.persistence.Query;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;

import com.mint.entities.Band;
import com.mint.entities.Gig;
import com.mint.entities.Promoter;

@Repository
public class GigRepository {
	
	SessionFactory sf;
	
	@Inject
	public GigRepository(SessionFactory sf) {
		this.sf = sf;
	}
	
	@Transactional(propagation = Propagation.REQUIRED) 
	public Gig getById(int id) {
		Session session = sf.getCurrentSession();
		return session.get(Gig.class, id);
	}
	
	@Transactional(propagation = Propagation.REQUIRED)
	public Gig create(Gig gig) {
		Session session = sf.getCurrentSession();
		session.save(gig);
		return gig;
	}
	
	@Transactional(propagation = Propagation.REQUIRED)
	public Gig update(Gig gig) {
		Session session = sf.getCurrentSession();
		Gig checkGig = session.get(Gig.class, gig.getId());
		gig.setGigBands(checkGig.getGigBands());
		session.merge(gig);
		return gig;
	}

	@Transactional(propagation = Propagation.REQUIRED)
	public Gig deleteById(int id) {
		Session session = sf.getCurrentSession();
		Gig gig = session.get(Gig.class, id );
		if (gig == null) throw new HttpClientErrorException(HttpStatus.NOT_FOUND);
		session.delete(gig);
		return gig;
	}
	
	
	@Transactional(propagation = Propagation.REQUIRED)
	public List<Gig> getAllGigs() {
		Session session = sf.getCurrentSession();
		List<Gig> gigList = session.createSQLQuery("Select * from gigs").list();
		return gigList;
	}

	@Transactional(propagation = Propagation.REQUIRED)
	public List<Band> getBands(int id) {
		
		Session session = sf.getCurrentSession();
		String query = "select bands FROM BandGigs where gigs_id = :id and status = 'Approved'";
		List<Band> bandList = session.createQuery(query, Band.class).setParameter("id", id).list();
		return bandList;
	}
	
	@Transactional(propagation = Propagation.REQUIRED)
	public List<Band> getAllBands(int id) {
		
		Session session = sf.getCurrentSession();
		String query = "select bands FROM BandGigs where gigs_id = :id and status <> 'Denied'";
		List<Band> bandList = session.createQuery(query, Band.class).setParameter("id", id).list();
		return bandList;
	}

}

