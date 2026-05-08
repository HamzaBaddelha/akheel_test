import { TripFormState } from "./types";

type ValidationMessages = {
  fullName: string;
  mobile: string;
  email: string;
  travelDate: string;
  tripDuration: string;
  travelers: string;
  adults: string;
  children: string;
  travelersBreakdown: string;
  budgetRange: string;
  flightType: string;
  hotelLevel: string;
};

export function validateTripForm(formState: TripFormState, messages: ValidationMessages) {
  const travelers = Number(formState.travelers);
  const adults = Number(formState.adults);
  const children = Number(formState.children);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email.trim());
  const mobileValid = formState.mobile.replace(/\s/g, "").length >= 8;

  if (!formState.fullName.trim()) return messages.fullName;
  if (!mobileValid) return messages.mobile;
  if (!emailValid) return messages.email;
  if (!formState.travelDate) return messages.travelDate;
  if (!formState.tripDuration || Number(formState.tripDuration) < 1) return messages.tripDuration;
  if (!formState.travelers || travelers < 1) return messages.travelers;
  if (!formState.adults || adults < 1) return messages.adults;
  if (children < 0) return messages.children;
  if (adults + children > travelers) return messages.travelersBreakdown;
  if (!formState.budgetRange) return messages.budgetRange;
  if (!formState.flightType) return messages.flightType;
  if (!formState.hotelLevel) return messages.hotelLevel;

  return "";
}
