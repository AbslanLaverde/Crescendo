package com.mint.entities;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="gigs")
public class Gig {


	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String gigName;
	private Date   startTime;
	private String location;
	
	@ManyToOne
	@JoinColumn(name = "promoter_id")
	private int promoter;	
	
	
	private boolean Security;
	private boolean closed;
	private int maxCapacity;
	private String websiteURL;
	
	
	@ManyToMany
	@JoinTable(name = "band_gig",
		joinColumns = {@JoinColumn(name="band_id")},
		inverseJoinColumns = {@JoinColumn(name="gig_id")})
	private List<Band> bands;


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getGigName() {
		return gigName;
	}


	public void setGigName(String gigName) {
		this.gigName = gigName;
	}


	public Date getStartTime() {
		return startTime;
	}


	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}


	public String getLocation() {
		return location;
	}


	public void setLocation(String location) {
		this.location = location;
	}


	public int getPromoter() {
		return promoter;
	}


	public void setPromoter(int promoter) {
		this.promoter = promoter;
	}


	public boolean isSecurity() {
		return Security;
	}


	public void setSecurity(boolean security) {
		Security = security;
	}


	public boolean isClosed() {
		return closed;
	}


	public void setClosed(boolean closed) {
		this.closed = closed;
	}


	public int getMaxCapacity() {
		return maxCapacity;
	}


	public void setMaxCapacity(int maxCapacity) {
		this.maxCapacity = maxCapacity;
	}


	public String getWebsiteURL() {
		return websiteURL;
	}


	public void setWebsiteURL(String websiteURL) {
		this.websiteURL = websiteURL;
	}


	public List<Band> getBands() {
		return bands;
	}


	public void setBands(List<Band> bands) {
		this.bands = bands;
	}


	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (Security ? 1231 : 1237);
		result = prime * result + ((bands == null) ? 0 : bands.hashCode());
		result = prime * result + (closed ? 1231 : 1237);
		result = prime * result + ((gigName == null) ? 0 : gigName.hashCode());
		result = prime * result + id;
		result = prime * result + ((location == null) ? 0 : location.hashCode());
		result = prime * result + maxCapacity;
		result = prime * result + promoter;
		result = prime * result + ((startTime == null) ? 0 : startTime.hashCode());
		result = prime * result + ((websiteURL == null) ? 0 : websiteURL.hashCode());
		return result;
	}


	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Gig other = (Gig) obj;
		if (Security != other.Security)
			return false;
		if (bands == null) {
			if (other.bands != null)
				return false;
		} else if (!bands.equals(other.bands))
			return false;
		if (closed != other.closed)
			return false;
		if (gigName == null) {
			if (other.gigName != null)
				return false;
		} else if (!gigName.equals(other.gigName))
			return false;
		if (id != other.id)
			return false;
		if (location == null) {
			if (other.location != null)
				return false;
		} else if (!location.equals(other.location))
			return false;
		if (maxCapacity != other.maxCapacity)
			return false;
		if (promoter != other.promoter)
			return false;
		if (startTime == null) {
			if (other.startTime != null)
				return false;
		} else if (!startTime.equals(other.startTime))
			return false;
		if (websiteURL == null) {
			if (other.websiteURL != null)
				return false;
		} else if (!websiteURL.equals(other.websiteURL))
			return false;
		return true;
	}


	@Override
	public String toString() {
		return "Gig [id=" + id + ", gigName=" + gigName + ", startTime=" + startTime + ", location=" + location
				+ ", promoter=" + promoter + ", Security=" + Security + ", closed=" + closed + ", maxCapacity="
				+ maxCapacity + ", websiteURL=" + websiteURL + ", bands=" + bands + "]";
	}


	public Gig(int id, String gigName, Date startTime, String location, int promoter, boolean security, boolean closed,
			int maxCapacity, String websiteURL, List<Band> bands) {
		super();
		this.id = id;
		this.gigName = gigName;
		this.startTime = startTime;
		this.location = location;
		this.promoter = promoter;
		Security = security;
		this.closed = closed;
		this.maxCapacity = maxCapacity;
		this.websiteURL = websiteURL;
		this.bands = bands;
	}


	public Gig() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
	
	
}