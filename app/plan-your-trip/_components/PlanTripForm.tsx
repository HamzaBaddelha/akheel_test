"use client";

import { FormEvent, useMemo, useState } from "react";
import { useI18n } from "@/components/i18n/I18nProvider";
import {
  budgetOptions,
  destinationOptions,
  hotelLevelOptions,
  initialFormState,
  serviceOptions,
  tripTypeOptions,
} from "../_data/options";
import { FORM_SUBMIT_DELAY_MS, WHATSAPP_LINK, getTodayDateISO, wait } from "../_lib/helpers";
import { MultiSelectField, TripFormState } from "../_lib/types";
import { validateTripForm } from "../_lib/validation";
import FieldLabel from "./FieldLabel";
import PlanTripSuccess from "./PlanTripSuccess";

export default function PlanTripForm() {
  const { t } = useI18n();
  const [formState, setFormState] = useState<TripFormState>(initialFormState);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const minTravelDate = useMemo(() => getTodayDateISO(), []);
  const sectionShellClass =
    "rounded-3xl border border-white/60 bg-[#e8edf5] p-6 shadow-[14px_14px_32px_rgba(145,157,178,0.35),-14px_-14px_30px_rgba(255,255,255,0.9)] sm:p-8 lg:p-10";
  const fieldsetClass =
    "space-y-4 rounded-2xl border border-white/65 bg-[#e8edf5] p-5 shadow-[10px_10px_22px_rgba(145,157,178,0.28),-8px_-8px_18px_rgba(255,255,255,0.82)] sm:p-6";
  const controlClass =
    "w-full rounded-xl border border-transparent bg-[#e8edf5] px-4 py-3 text-sm text-foreground/90 outline-none shadow-[inset_5px_5px_10px_rgba(145,157,178,0.25),inset_-5px_-5px_10px_rgba(255,255,255,0.9)] transition focus:shadow-[inset_2px_2px_5px_rgba(145,157,178,0.34),inset_-2px_-2px_6px_rgba(255,255,255,0.95)]";
  const optionCardClass =
    "flex cursor-pointer items-center gap-2 rounded-xl border border-white/60 bg-[#e8edf5] px-3 py-2 text-sm text-foreground/85 shadow-[6px_6px_12px_rgba(145,157,178,0.2),-6px_-6px_12px_rgba(255,255,255,0.82)]";

  const updateField = <K extends keyof TripFormState>(field: K, value: TripFormState[K]) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const toggleMultiSelect = (field: MultiSelectField, value: string) => {
    setFormState((prev) => {
      const list = prev[field];
      const nextList = list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
      return { ...prev, [field]: nextList };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationError = validateTripForm(formState, {
      fullName: t("planTrip.form.validation.fullName"),
      mobile: t("planTrip.form.validation.mobile"),
      email: t("planTrip.form.validation.email"),
      travelDate: t("planTrip.form.validation.travelDate"),
      tripDuration: t("planTrip.form.validation.tripDuration"),
      travelers: t("planTrip.form.validation.travelers"),
      adults: t("planTrip.form.validation.adults"),
      children: t("planTrip.form.validation.children"),
      travelersBreakdown: t("planTrip.form.validation.travelersBreakdown"),
      budgetRange: t("planTrip.form.validation.budgetRange"),
      hotelLevel: t("planTrip.form.validation.hotelLevel"),
    });
    setSubmitError(validationError);
    if (validationError) return;

    setIsSubmitting(true);
    await wait(FORM_SUBMIT_DELAY_MS);
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormState(initialFormState);
  };

  return (
    <section
      id="trip-form"
      className={sectionShellClass}
      aria-labelledby="trip-form-title"
    >
      <div className="mb-8 max-w-3xl">
        <h2 id="trip-form-title" className="text-2xl font-bold text-primary sm:text-3xl">
          {t("planTrip.form.title")}
        </h2>
        <p className="mt-3 text-sm text-foreground/80 sm:text-base">
          {t("planTrip.form.subtitle")}
        </p>
      </div>

      {isSuccess ? (
        <PlanTripSuccess onReset={() => setIsSuccess(false)} />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8" noValidate>
          <fieldset className={fieldsetClass}>
            <legend className="px-1 text-base font-semibold text-primary">{t("planTrip.form.groups.contact")}</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <FieldLabel htmlFor="fullName">{t("planTrip.form.fields.fullName")}</FieldLabel>
                <input
                  id="fullName"
                  type="text"
                  autoComplete="name"
                  value={formState.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  className={controlClass}
                  required
                />
              </div>
              <div>
                <FieldLabel htmlFor="mobile">{t("planTrip.form.fields.mobile")}</FieldLabel>
                <input
                  id="mobile"
                  type="tel"
                  autoComplete="tel"
                  value={formState.mobile}
                  onChange={(e) => updateField("mobile", e.target.value)}
                  className={controlClass}
                  required
                />
              </div>
              <div>
                <FieldLabel htmlFor="email">{t("planTrip.form.fields.email")}</FieldLabel>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={formState.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className={controlClass}
                  required
                />
              </div>
            </div>
          </fieldset>

          <fieldset className={fieldsetClass}>
            <legend className="px-1 text-base font-semibold text-primary">{t("planTrip.form.groups.details")}</legend>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <FieldLabel htmlFor="destination">{t("planTrip.form.fields.destination")}</FieldLabel>
                <select
                  id="destination"
                  value={formState.destination}
                  onChange={(e) => updateField("destination", e.target.value)}
                  className={controlClass}
                >
                  {destinationOptions.map((destination, index) => (
                    <option key={destination} value={destination}>
                      {t(`planTrip.form.options.destinations.${index}`)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <FieldLabel htmlFor="travelDate">{t("planTrip.form.fields.travelDate")}</FieldLabel>
                <input
                  id="travelDate"
                  type="date"
                  min={minTravelDate}
                  value={formState.travelDate}
                  onChange={(e) => updateField("travelDate", e.target.value)}
                  className={controlClass}
                  required
                />
              </div>
              <div>
                <FieldLabel htmlFor="tripDuration">{t("planTrip.form.fields.tripDuration")}</FieldLabel>
                <input
                  id="tripDuration"
                  type="number"
                  min={1}
                  value={formState.tripDuration}
                  onChange={(e) => updateField("tripDuration", e.target.value)}
                  className={controlClass}
                  required
                />
              </div>
              <div>
                <FieldLabel htmlFor="travelers">{t("planTrip.form.fields.travelers")}</FieldLabel>
                <input
                  id="travelers"
                  type="number"
                  min={1}
                  value={formState.travelers}
                  onChange={(e) => updateField("travelers", e.target.value)}
                  className={controlClass}
                  required
                />
              </div>
              <div>
                <FieldLabel htmlFor="adults">{t("planTrip.form.fields.adults")}</FieldLabel>
                <input
                  id="adults"
                  type="number"
                  min={1}
                  value={formState.adults}
                  onChange={(e) => updateField("adults", e.target.value)}
                  className={controlClass}
                  required
                />
              </div>
              <div>
                <FieldLabel htmlFor="children">{t("planTrip.form.fields.children")}</FieldLabel>
                <input
                  id="children"
                  type="number"
                  min={0}
                  value={formState.children}
                  onChange={(e) => updateField("children", e.target.value)}
                  className={controlClass}
                />
              </div>
            </div>
          </fieldset>

          <fieldset className={fieldsetClass}>
            <legend className="px-1 text-base font-semibold text-primary">{t("planTrip.form.groups.budget")}</legend>
            <FieldLabel htmlFor="budgetRange">{t("planTrip.form.fields.budgetRange")}</FieldLabel>
            <select
              id="budgetRange"
              value={formState.budgetRange}
              onChange={(e) => updateField("budgetRange", e.target.value)}
              className={`${controlClass} sm:max-w-sm`}
              required
            >
              <option value="">{t("planTrip.form.options.selectBudget")}</option>
              {budgetOptions.map((budget, index) => (
                <option key={budget} value={budget}>
                  {t(`planTrip.form.options.budget.${index}`)}
                </option>
              ))}
            </select>
          </fieldset>

          <fieldset className={fieldsetClass}>
            <legend className="px-1 text-base font-semibold text-primary">{t("planTrip.form.groups.tripType")}</legend>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {tripTypeOptions.map((option, index) => (
                <label
                  key={option}
                  className={optionCardClass}
                >
                  <input
                    type="checkbox"
                    checked={formState.tripTypes.includes(option)}
                    onChange={() => toggleMultiSelect("tripTypes", option)}
                    className="h-4 w-4 rounded border-input text-primary focus:ring-ring"
                  />
                  {t(`planTrip.form.options.tripTypes.${index}`)}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className={fieldsetClass}>
            <legend className="px-1 text-base font-semibold text-primary">{t("planTrip.form.groups.hotelLevel")}</legend>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {hotelLevelOptions.map((option, index) => (
                <label
                  key={option}
                  className={optionCardClass}
                >
                  <input
                    type="radio"
                    name="hotelLevel"
                    value={option}
                    checked={formState.hotelLevel === option}
                    onChange={(e) => updateField("hotelLevel", e.target.value)}
                    className="h-4 w-4 border-input text-primary focus:ring-ring"
                    required
                  />
                  {t(`planTrip.form.options.hotelLevels.${index}`)}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className={fieldsetClass}>
            <legend className="px-1 text-base font-semibold text-primary">{t("planTrip.form.groups.services")}</legend>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {serviceOptions.map((option, index) => (
                <label
                  key={option}
                  className={optionCardClass}
                >
                  <input
                    type="checkbox"
                    checked={formState.requiredServices.includes(option)}
                    onChange={() => toggleMultiSelect("requiredServices", option)}
                    className="h-4 w-4 rounded border-input text-primary focus:ring-ring"
                  />
                  {t(`planTrip.form.options.services.${index}`)}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className={fieldsetClass}>
            <legend className="px-1 text-base font-semibold text-primary">{t("planTrip.form.groups.notes")}</legend>
            <FieldLabel htmlFor="additionalNotes">{t("planTrip.form.fields.additionalNotes")}</FieldLabel>
            <textarea
              id="additionalNotes"
              rows={5}
              value={formState.additionalNotes}
              onChange={(e) => updateField("additionalNotes", e.target.value)}
              placeholder={t("planTrip.form.placeholders.additionalNotes")}
              className={controlClass}
            />
          </fieldset>

          {submitError && (
            <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {submitError}
            </p>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-full border border-white/70 bg-[#e8edf5] px-7 py-3.5 text-sm font-semibold text-primary shadow-[7px_7px_16px_rgba(145,157,178,0.3),-7px_-7px_14px_rgba(255,255,255,0.9)] transition hover:shadow-[4px_4px_10px_rgba(145,157,178,0.28),-4px_-4px_10px_rgba(255,255,255,0.88)] disabled:cursor-not-allowed disabled:opacity-70 sm:text-base"
            >
              {isSubmitting ? t("planTrip.form.cta.submitting") : t("planTrip.form.cta.submit")}
            </button>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/70 bg-[#e8edf5] px-7 py-3.5 text-sm font-semibold text-primary shadow-[7px_7px_16px_rgba(145,157,178,0.3),-7px_-7px_14px_rgba(255,255,255,0.9)] transition hover:shadow-[4px_4px_10px_rgba(145,157,178,0.28),-4px_-4px_10px_rgba(255,255,255,0.88)] sm:text-base"
            >
              {t("planTrip.form.cta.whatsApp")}
            </a>
          </div>
        </form>
      )}
    </section>
  );
}
