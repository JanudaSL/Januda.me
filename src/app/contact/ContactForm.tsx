"use client";

import React, { useCallback, useMemo, useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2, ArrowRight, Cookie } from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  jobRole: string;
  company: string;
  areaOfInterest: string;
  country: string;
  message: string;
  subscribe: boolean;
}

interface FormErrors {
  [key: string]: string;
}

interface ApiResponse {
  success?: boolean;
  message?: string;
  error?: string;
  [key: string]: unknown;
}

type Category = "sales" | "support" | "general";

const JOB_ROLE_OPTIONS = [
  "Executive / C-Level",
  "IT / Engineering",
  "Product Management",
  "Procurement",
  "Other",
];

const AREA_OF_INTEREST_OPTIONS = [
  "API Management",
  "Integration",
  "Identity & Access Management",
  "Choreo (Internal Developer Platform)",
  "Other",
];

const COUNTRY_OPTIONS = [
  "United States",
  "United Kingdom",
  "Sri Lanka",
  "India",
  "Australia",
  "Germany",
  "Other",
];

const API_CONFIG = {
  baseURL: "",
  endpoints: { contacts: "/api/contacts" },
};

const MESSAGE_MIN_LENGTH = 10;

const EMPTY_FORM: FormData = {
  fullName: "",
  email: "",
  phone: "",
  jobRole: "",
  company: "",
  areaOfInterest: "",
  country: "",
  message: "",
  subscribe: false,
};

// ─── Component ──────────────────────────────────────────────────────────

export default function ContactFormClean() {
  const [category, setCategory] = useState<Category>("sales");
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = useCallback((): FormErrors => {
    const e: FormErrors = {};
    if (!formData.fullName.trim()) e.fullName = "Name is required";
    if (!formData.email.trim()) e.email = "Corporate email is required";
    else if (!validateEmail(formData.email)) e.email = "Enter a valid email address";
    if (!formData.phone.trim()) e.phone = "Phone number is required";
    if (!formData.jobRole) e.jobRole = "Please select a job role";
    if (!formData.company.trim()) e.company = "Company is required";
    if (!formData.areaOfInterest) e.areaOfInterest = "Please select an area of interest";
    if (!formData.country) e.country = "Please select a country";
    if (!formData.message.trim()) e.message = "Please tell us how we can help";
    else if (formData.message.trim().length < MESSAGE_MIN_LENGTH)
      e.message = `Message must be at least ${MESSAGE_MIN_LENGTH} characters`;
    return e;
  }, [formData]);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const { name, value, type } = e.target;
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    },
    [errors]
  );

  const submitToAPI = async (data: FormData): Promise<ApiResponse> => {
    const url = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.contacts}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        category,
        fullName: data.fullName.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone.trim(),
        jobRole: data.jobRole,
        company: data.company.trim(),
        areaOfInterest: data.areaOfInterest,
        country: data.country,
        message: data.message.trim(),
        subscribe: data.subscribe,
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      let msg = `HTTP error! status: ${response.status}`;
      try {
        const errData = await response.json();
        msg = errData.message || errData.error || msg;
      } catch {}
      throw new Error(msg);
    }
    return await response.json();
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const formErrors = validateForm();
      setErrors(formErrors);
      if (Object.keys(formErrors).length > 0) return;

      setIsSubmitting(true);
      setSubmitStatus("idle");
      setErrorMessage("");

      try {
        await submitToAPI(formData);
        setSubmitStatus("success");
        setFormData(EMPTY_FORM);
        setTimeout(() => setSubmitStatus("idle"), 6000);
      } catch (error) {
        setSubmitStatus("error");
        setErrorMessage(
          error instanceof Error ? error.message : "Something went wrong. Please try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, validateForm]
  );

  const written = useMemo(
    () =>
      Object.entries(formData).filter(
        ([k, v]) => k !== "subscribe" && String(v).trim().length > 0
      ).length,
    [formData]
  );

  return (
    <section className="w-full bg-[#FFF3EC] px-4 py-14 sm:px-6 sm:py-20">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        .font-ui { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }

        @keyframes fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pop-in {
          0% { opacity: 0; transform: scale(0.92); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes shake-x {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-4px); }
          40% { transform: translateX(4px); }
          60% { transform: translateX(-3px); }
          80% { transform: translateX(3px); }
        }
        .anim-fade-up { animation: fade-up 0.5s cubic-bezier(0.22,1,0.36,1) both; }
        .anim-fade-in { animation: fade-in 0.4s ease both; }
        .anim-pop { animation: pop-in 0.35s cubic-bezier(0.22,1,0.36,1) both; }
        .anim-shake { animation: shake-x 0.4s ease both; }

        @media (prefers-reduced-motion: reduce) {
          .anim-fade-up, .anim-fade-in, .anim-pop, .anim-shake { animation: none !important; }
        }

        .input-field {
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
        }
        .input-field:hover:not(:focus) { border-color: #C7CAD1; }
        .cat-card {
          transition: transform 0.15s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .cat-card:hover { transform: translateY(-2px); }
        .btn-cta {
          transition: transform 0.15s ease, background-color 0.2s ease;
        }
        .btn-cta:hover:not(:disabled) { transform: translateY(-2px); background-color: #E6620A; }
        .btn-cta:active:not(:disabled) { transform: translateY(0) scale(0.98); }
      `}</style>

      <div className="font-ui mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-[380px_1fr]">
        {/* ── Left: category cards ───────────────────────────────── */}
        <div className="flex flex-col gap-5">
          <button
            type="button"
            onClick={() => setCategory("sales")}
            className={[
              "cat-card anim-fade-up rounded-2xl border-2 bg-white p-6 text-left shadow-sm",
              category === "sales" ? "border-[#FF7A00]" : "border-transparent",
            ].join(" ")}
          >
            <h3 className="text-xl font-semibold text-[#1F2A44]">
              Products/Services/Sales Inquiries
            </h3>
            <p className="mt-2.5 text-[15px] leading-relaxed text-[#5B6478]">
              Need more information on our products, service offerings and
              pricing? Our sales team can guide you on the right solutions to
              meet your goals and maximize value.
            </p>
          </button>

          <div
            className="anim-fade-up rounded-2xl bg-gradient-to-br from-[#FFEDE1] to-[#FFE1CE] p-6"
            style={{ animationDelay: "0.06s" }}
          >
            <h3 className="text-xl font-semibold text-[#1F2A44]">Need Technical Support?</h3>
            <p className="mt-2.5 text-[15px] leading-relaxed text-[#5B6478]">
              For existing customers or those using our products.
            </p>
            <button
              type="button"
              onClick={() => setCategory("support")}
              className="btn-cta mt-4 inline-flex items-center gap-2 rounded-full bg-[#FF7A00] px-5 py-2.5 text-sm font-semibold text-white"
            >
              Get Support
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div
            className="anim-fade-up rounded-2xl bg-gradient-to-br from-[#FFEDE1] to-[#FFE1CE] p-6"
            style={{ animationDelay: "0.12s" }}
          >
            <h3 className="text-xl font-semibold text-[#1F2A44]">General Inquiries</h3>
            <p className="mt-2.5 text-[15px] leading-relaxed text-[#5B6478]">
              For partnership, marketing, careers, certification, or general
              inquiries.
            </p>
            <button
              type="button"
              onClick={() => setCategory("general")}
              className="btn-cta mt-4 inline-flex items-center gap-2 rounded-full bg-[#FF7A00] px-5 py-2.5 text-sm font-semibold text-white"
            >
              Reach Out
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ── Right: form ─────────────────────────────────────────── */}
        <div
          className="anim-fade-up relative rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.05),0_12px_32px_-16px_rgba(16,24,40,0.12)] sm:p-8"
          style={{ animationDelay: "0.08s" }}
        >
          <h2 className="text-2xl font-bold tracking-tight text-[#1F2A44] sm:text-3xl">
            {category === "sales" && "Products/Services/Sales Inquiries"}
            {category === "support" && "Technical Support"}
            {category === "general" && "General Inquiries"}
          </h2>

          {submitStatus === "success" && (
            <div className="anim-pop mt-6 flex items-center gap-3 rounded-xl border border-[#BBF7D0] bg-[#F0FDF4] px-4 py-3.5">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-[#22C55E]" />
              <p className="text-sm font-medium text-[#166534]">
                Thanks — your message has been sent. We&apos;ll be in touch soon.
              </p>
            </div>
          )}
          {submitStatus === "error" && (
            <div className="anim-pop anim-shake mt-6 flex items-center gap-3 rounded-xl border border-[#FECACA] bg-[#FEF2F2] px-4 py-3.5">
              <AlertCircle className="h-5 w-5 flex-shrink-0 text-[#DC2626]" />
              <p className="text-sm font-medium text-[#991B1B]">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <TextInput
                name="fullName"
                placeholder="Name *"
                value={formData.fullName}
                onChange={handleChange}
                error={errors.fullName}
              />
              <TextInput
                name="email"
                type="email"
                placeholder="Corporate Email *"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <TextInput
                name="phone"
                type="tel"
                placeholder="Phone *"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
              />
              <SelectInput
                name="jobRole"
                placeholder="Job Role"
                value={formData.jobRole}
                onChange={handleChange}
                error={errors.jobRole}
                options={JOB_ROLE_OPTIONS}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <TextInput
                name="company"
                placeholder="Company *"
                value={formData.company}
                onChange={handleChange}
                error={errors.company}
              />
              <SelectInput
                name="areaOfInterest"
                placeholder="Area of Interest"
                value={formData.areaOfInterest}
                onChange={handleChange}
                error={errors.areaOfInterest}
                options={AREA_OF_INTEREST_OPTIONS}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <SelectInput
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                error={errors.country}
                options={COUNTRY_OPTIONS}
              />
              <div />
            </div>

            <div>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="How Can We Help You? *&#10;(Please provide a description of your requirement)"
                value={formData.message}
                onChange={handleChange}
                aria-invalid={!!errors.message}
                className={[
                  "input-field font-ui w-full resize-none rounded-xl border bg-white px-4 py-3 text-[15px] text-[#1F2A44] placeholder-[#9CA3AF] outline-none",
                  errors.message
                    ? "border-[#FCA5A5] focus:border-[#DC2626] focus:shadow-[0_0_0_4px_rgba(220,38,38,0.08)]"
                    : "border-[#D1D5DB] focus:border-[#FF7A00] focus:shadow-[0_0_0_4px_rgba(255,122,0,0.10)]",
                ].join(" ")}
              />
              {errors.message && (
                <p className="anim-fade-in mt-1.5 text-sm text-[#DC2626]">{errors.message}</p>
              )}
            </div>

            <label className="flex cursor-pointer items-start gap-3 text-[15px] leading-relaxed text-[#374151]">
              <input
                type="checkbox"
                name="subscribe"
                checked={formData.subscribe}
                onChange={handleChange}
                className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-[#D1D5DB] text-[#FF7A00] focus:ring-[#FF7A00]"
              />
              Yes, I would like to receive emails to learn about new releases,
              security announcements, and other updates.
            </label>

            <div className="flex flex-col-reverse items-center gap-4 pt-2 sm:flex-row sm:justify-between">
              <p className="text-sm text-[#9CA3AF]">{written}/7 fields completed</p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-cta flex w-full items-center justify-center gap-2 rounded-full bg-[#FF7A00] px-8 py-3 text-sm font-semibold text-white shadow-[0_4px_12px_-4px_rgba(255,122,0,0.5)] focus:outline-none focus:ring-2 focus:ring-[#FF7A00] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Submit
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* cookie icon, purely decorative — matches reference screenshot corner */}
      <div className="fixed bottom-5 left-5 hidden h-11 w-11 items-center justify-center rounded-full bg-[#3C9A4B] shadow-lg lg:flex">
        <Cookie className="h-5 w-5 text-white" />
      </div>
    </section>
  );
}

// ─── Shared bits ────────────────────────────────────────────────────────

function TextInput({
  name,
  placeholder,
  value,
  onChange,
  error,
  type = "text",
}: {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
}) {
  return (
    <div>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        className={[
          "input-field font-ui w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-[#1F2A44] placeholder-[#9CA3AF] outline-none",
          error
            ? "border-[#FCA5A5] focus:border-[#DC2626] focus:shadow-[0_0_0_4px_rgba(220,38,38,0.08)]"
            : "border-[#D1D5DB] focus:border-[#FF7A00] focus:shadow-[0_0_0_4px_rgba(255,122,0,0.10)]",
        ].join(" ")}
      />
      {error && <p className="anim-fade-in mt-1.5 text-sm text-[#DC2626]">{error}</p>}
    </div>
  );
}

function SelectInput({
  name,
  placeholder,
  value,
  onChange,
  error,
  options,
}: {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  options: string[];
}) {
  return (
    <div>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        className={[
          "input-field font-ui w-full appearance-none rounded-xl border bg-white bg-[right_1rem_center] bg-no-repeat px-4 py-3 text-[15px] outline-none",
          value ? "text-[#1F2A44]" : "text-[#9CA3AF]",
          error
            ? "border-[#FCA5A5] focus:border-[#DC2626] focus:shadow-[0_0_0_4px_rgba(220,38,38,0.08)]"
            : "border-[#D1D5DB] focus:border-[#FF7A00] focus:shadow-[0_0_0_4px_rgba(255,122,0,0.10)]",
        ].join(" ")}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='9' viewBox='0 0 14 9'%3E%3Cpath d='M1 1l6 6 6-6' stroke='%239CA3AF' stroke-width='1.6' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
        }}
      >
        <option value="" disabled>
          {placeholder} *
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && <p className="anim-fade-in mt-1.5 text-sm text-[#DC2626]">{error}</p>}
    </div>
  );
}