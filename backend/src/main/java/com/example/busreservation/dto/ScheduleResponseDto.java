package com.example.busreservation.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public class ScheduleResponseDto {
    private Long id;
    private String busNumber;
    private String busName;
    private String serviceType;
    private String serviceCategory;
    private String sourceCity;
    private String destinationCity;
    private String departureTime;
    private String arrivalTime;
    private String duration;
    private LocalDate journeyDate;
    private BigDecimal fare;
    private int totalSeats;
    private int availableSeats;
    private Double rating = 4.5;
    private List<String> amenities;
    private List<PointDto> boardingPoints;
    private List<PointDto> droppingPoints;

    public static class PointDto {
        private String name;
        private String time;

        public PointDto() {}
        public PointDto(String name, String time) {
            this.name = name;
            this.time = time;
        }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getTime() { return time; }
        public void setTime(String time) { this.time = time; }
    }

    public ScheduleResponseDto() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getBusNumber() { return busNumber; }
    public void setBusNumber(String busNumber) { this.busNumber = busNumber; }

    public String getBusName() { return busName; }
    public void setBusName(String busName) { this.busName = busName; }

    public String getServiceType() { return serviceType; }
    public void setServiceType(String serviceType) { this.serviceType = serviceType; }

    public String getServiceCategory() { return serviceCategory; }
    public void setServiceCategory(String serviceCategory) { this.serviceCategory = serviceCategory; }

    public String getSourceCity() { return sourceCity; }
    public void setSourceCity(String sourceCity) { this.sourceCity = sourceCity; }

    public String getDestinationCity() { return destinationCity; }
    public void setDestinationCity(String destinationCity) { this.destinationCity = destinationCity; }

    public String getDepartureTime() { return departureTime; }
    public void setDepartureTime(String departureTime) { this.departureTime = departureTime; }

    public String getArrivalTime() { return arrivalTime; }
    public void setArrivalTime(String arrivalTime) { this.arrivalTime = arrivalTime; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public LocalDate getJourneyDate() { return journeyDate; }
    public void setJourneyDate(LocalDate journeyDate) { this.journeyDate = journeyDate; }

    public BigDecimal getFare() { return fare; }
    public void setFare(BigDecimal fare) { this.fare = fare; }

    public int getTotalSeats() { return totalSeats; }
    public void setTotalSeats(int totalSeats) { this.totalSeats = totalSeats; }

    public int getAvailableSeats() { return availableSeats; }
    public void setAvailableSeats(int availableSeats) { this.availableSeats = availableSeats; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public List<String> getAmenities() { return amenities; }
    public void setAmenities(List<String> amenities) { this.amenities = amenities; }

    public List<PointDto> getBoardingPoints() { return boardingPoints; }
    public void setBoardingPoints(List<PointDto> boardingPoints) { this.boardingPoints = boardingPoints; }

    public List<PointDto> getDroppingPoints() { return droppingPoints; }
    public void setDroppingPoints(List<PointDto> droppingPoints) { this.droppingPoints = droppingPoints; }
}
