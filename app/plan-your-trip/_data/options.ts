import { TripFormState } from "../_lib/types";

export const destinationOptions = [
  "Not sure yet",
  "Morocco",
  "Tunis",
  "Georgia",
  "Azerbaijan",
  "Bosnia",
  "Saudi Arabia",
  "Turkey",
  "Maldives",
] as const;

export const budgetOptions = [
  "Less than 5,000 SAR",
  "5,000 - 10,000 SAR",
  "10,000 - 20,000 SAR",
  "Open Budget",
] as const;

export const flightTypeOptions = ["Economy Flight", "Business Class", "First Class Flight"] as const;
export const tripTypeOptions = ["Family", "Honeymoon", "Adventure", "Relaxation", "Shopping"] as const;
export const hotelLevelOptions = ["3 Stars", "4 Stars", "5 Stars", "Luxury"] as const;
export const serviceOptions = ["Flights", "Hotel", "Transportation", "Tours", "Tour Guide"] as const;

export const initialFormState: TripFormState = {
  fullName: "",
  mobile: "",
  email: "",
  destination: "Not sure yet",
  travelDate: "",
  tripDuration: "",
  travelers: "",
  adults: "1",
  children: "0",
  budgetRange: "",
  flightType: "",
  tripTypes: [],
  hotelLevel: "",
  requiredServices: [],
  additionalNotes: "",
};
