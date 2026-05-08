export type TripFormState = {
  fullName: string;
  mobile: string;
  email: string;
  destination: string;
  travelDate: string;
  tripDuration: string;
  travelers: string;
  adults: string;
  children: string;
  budgetRange: string;
  flightType: string;
  tripTypes: string[];
  hotelLevel: string;
  requiredServices: string[];
  additionalNotes: string;
};

export type MultiSelectField = "tripTypes" | "requiredServices";

export type ProcessStep = {
  titleKey: string;
  descriptionKey: string;
};

export type DestinationHighlight = {
  nameKey: string;
  image: string;
  noteKey: string;
};

export type Testimonial = {
  nameKey: string;
  quoteKey: string;
};
