import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, CheckCircle2, Loader2 } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Container } from '../components/common/Container';
import { DemoTag } from '../components/common/DemoTag';
import { SERVICES } from '../data/services';
import { SITE_CONFIG } from '../data/config';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  description: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const BUDGET_RANGES = [
  'Under $15,000',
  '$15,000 – $40,000',
  '$40,000 – $100,000',
  '$100,000+',
  'Not sure yet',
];

const MAX_DESC_LENGTH = 1000;

export default function Contact() {
  useDocumentMeta(
    'Contact ALPHORAA AI INNOVATIONS',
    'Start a conversation about Agentic AI, custom automation, or enterprise software engineering.'
  );

  const [searchParams] = useSearchParams();
  const initialServiceSlug = searchParams.get('service') || '';

  const matchedService = SERVICES.find((s) => s.slug === initialServiceSlug);

  const [values, setValues] = useState<FormValues>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    service: matchedService ? matchedService.title : '',
    budget: '',
    description: '',
  });

  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null);

  const fieldRefs = {
    fullName: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    company: useRef<HTMLInputElement>(null),
    service: useRef<HTMLSelectElement>(null),
    budget: useRef<HTMLSelectElement>(null),
    description: useRef<HTMLTextAreaElement>(null),
  };

  useEffect(() => {
    if (matchedService) {
      setValues((prev) => ({ ...prev, service: matchedService.title }));
    }
  }, [matchedService]);

  const validateField = (name: keyof FormValues, val: string): string => {
    const trimmed = val.trim();
    switch (name) {
      case 'fullName':
        return trimmed.length < 2 ? 'Please enter your full name (at least 2 characters).' : '';
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
          ? ''
          : 'Please enter a valid business email address.';
      case 'phone': {
        const digitsOnly = trimmed.replace(/[\s\-+()]/g, '');
        if (!/^[+\d\s\-()]+$/.test(trimmed) || digitsOnly.length < 7 || digitsOnly.length > 15) {
          return 'Enter a valid phone number (7 to 15 digits, +, spaces, or dashes allowed).';
        }
        return '';
      }
      case 'company':
        return trimmed.length < 2 ? 'Please enter your company or organization name.' : '';
      case 'service':
        return trimmed ? '' : 'Please select a service.';
      case 'budget':
        return trimmed ? '' : 'Please select a project budget range.';
      case 'description':
        return trimmed.length < 20
          ? 'Please describe your project goals (at least 20 characters).'
          : '';
      default:
        return '';
    }
  };

  const handleChange = (name: keyof FormValues, val: string) => {
    setValues((prev) => ({ ...prev, [name]: val }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, val) }));
    }
  };

  const handleBlur = (name: keyof FormValues) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, values[name]) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fieldOrder: Array<keyof FormValues> = [
      'fullName',
      'email',
      'phone',
      'company',
      'service',
      'budget',
      'description',
    ];
    const nextErrors: FormErrors = {};
    const nextTouched: Partial<Record<keyof FormValues, boolean>> = {};

    let firstInvalid: keyof FormValues | null = null;
    for (const key of fieldOrder) {
      nextTouched[key] = true;
      const err = validateField(key, values[key]);
      if (err) {
        nextErrors[key] = err;
        if (!firstInvalid) firstInvalid = key;
      }
    }

    setTouched(nextTouched);
    setErrors(nextErrors);

    if (firstInvalid) {
      fieldRefs[firstInvalid].current?.focus();
      return;
    }

    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedData(values);
    }, 1500);
  };

  const handleReset = () => {
    setSubmittedData(null);
    setValues({
      fullName: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      budget: '',
      description: '',
    });
    setTouched({});
    setErrors({});
  };

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
        title="Let's Build Something Intelligent"
        subtitle="Share your operational challenge or project concept. Note: this preview uses a simulated frontend enquiry form."
        demoLabel="Frontend demo contact page"
      />

      <section className="py-14 sm:py-20 bg-black">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Placeholder Contact Details + Stylized Location Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-7 rounded-3xl bg-[#0A0A0A] border border-white/10 space-y-5">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-display text-xl font-bold text-white">
                    Contact Details
                  </h2>
                  <DemoTag label="Placeholder details" />
                </div>

                <ul className="space-y-4 text-sm text-[#9CA3AF]">
                  <li className="flex items-start gap-3">
                    <span className="w-9 h-9 rounded-xl bg-[#141414] text-[#5BB4F5] flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-[#EAF4FB]">Email</p>
                      <a
                        href={`mailto:${SITE_CONFIG.contactPlaceholders.email}`}
                        className="hover:text-[#5BB4F5] transition-colors"
                      >
                        {SITE_CONFIG.contactPlaceholders.email}
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="w-9 h-9 rounded-xl bg-[#141414] text-[#5BB4F5] flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-[#EAF4FB]">Phone</p>
                      <span>{SITE_CONFIG.contactPlaceholders.phone}</span>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="w-9 h-9 rounded-xl bg-[#141414] text-[#5BB4F5] flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-[#EAF4FB]">Office Address</p>
                      <span>{SITE_CONFIG.contactPlaceholders.address}</span>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="w-9 h-9 rounded-xl bg-[#141414] text-[#5BB4F5] flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-[#EAF4FB]">Office Hours</p>
                      <span>{SITE_CONFIG.contactPlaceholders.hours}</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Stylized SVG Location Card */}
              <div className="p-6 rounded-3xl keep-dark bg-[#0B0B0B] border border-white/10 text-white overflow-hidden relative">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#F36B21] mb-2">
                  Global Remote Collaboration
                </p>
                <p className="text-sm text-[#EAF4FB]/85 leading-relaxed mb-4">
                  Structured discovery workshops and engineering sprints tailored across time zones.
                </p>
                <svg viewBox="0 0 360 120" fill="none" className="w-full h-28" aria-hidden="true">
                  <path d="M20 90 Q100 30 180 65 T340 40" stroke="#1769AA" strokeWidth="2" strokeDasharray="4 4" />
                  <circle cx="48" cy="76" r="5" fill="#FFFFFF" />
                  <circle cx="180" cy="65" r="7" fill="#F36B21" />
                  <circle cx="310" cy="46" r="5" fill="#FFFFFF" />
                  <circle cx="180" cy="65" r="16" stroke="#F36B21" strokeOpacity="0.4" />
                </svg>
              </div>
            </div>

            {/* Right Column: Validated Enquiry Form */}
            <div className="lg:col-span-7">
              <div className="p-7 sm:p-10 rounded-3xl bg-[#0A0A0A] border border-white/10 shadow-[0_12px_36px_-12px_rgba(18,59,96,0.08)]">
                <AnimatePresence mode="wait">
                  {submittedData ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6 py-4"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-[#141414] text-[#5BB4F5] flex items-center justify-center">
                        <CheckCircle2 className="w-7 h-7" aria-hidden="true" />
                      </div>

                      <div>
                        <DemoTag label="Demo form. No data is sent." />
                        <h2 className="font-display text-2xl font-bold text-white mt-2">
                          Enquiry Simulated Successfully
                        </h2>
                        <p className="mt-2 text-sm text-[#9CA3AF] leading-relaxed">
                          Thank you, {submittedData.fullName}. Below is a summary of your simulated submission. Because this is a frontend-only preview, no information was transmitted.
                        </p>
                      </div>

                      <div className="p-5 rounded-2xl bg-black border border-white/10 space-y-2 text-sm">
                        <p>
                          <span className="font-semibold text-[#EAF4FB]">Business Email:</span>{' '}
                          <span className="text-[#9CA3AF]">{submittedData.email}</span>
                        </p>
                        <p>
                          <span className="font-semibold text-[#EAF4FB]">Company:</span>{' '}
                          <span className="text-[#9CA3AF]">{submittedData.company}</span>
                        </p>
                        <p>
                          <span className="font-semibold text-[#EAF4FB]">Service:</span>{' '}
                          <span className="text-[#9CA3AF]">{submittedData.service}</span>
                        </p>
                        <p>
                          <span className="font-semibold text-[#EAF4FB]">Budget Range:</span>{' '}
                          <span className="text-[#9CA3AF]">{submittedData.budget}</span>
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleReset}
                        className="px-6 py-3 rounded-xl gradient-accent-cta text-white text-sm font-semibold min-h-[44px] hover:brightness-105 transition-all cursor-pointer"
                      >
                        Send another enquiry
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onSubmit={handleSubmit}
                      noValidate
                      className="space-y-5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/5">
                        <h2 className="font-display text-xl font-bold text-white">
                          Project Enquiry Form
                        </h2>
                        <DemoTag label="Demo form. No data is sent." />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Full Name */}
                        <div>
                          <label htmlFor="fullName" className="block text-xs font-semibold text-[#EAF4FB] mb-1.5">
                            Full Name <span className="text-[#F36B21]">*</span>
                          </label>
                          <input
                            ref={fieldRefs.fullName}
                            id="fullName"
                            type="text"
                            value={values.fullName}
                            onChange={(e) => handleChange('fullName', e.target.value)}
                            onBlur={() => handleBlur('fullName')}
                            aria-invalid={Boolean(errors.fullName)}
                            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                            placeholder="Alex Morgan"
                            className={`w-full px-4 py-3 rounded-xl border text-sm bg-black focus:bg-[#141414] focus:outline-none ${
                              errors.fullName ? 'border-red-500' : 'border-white/10 focus:border-[#1769AA]'
                            }`}
                          />
                          {errors.fullName && (
                            <p id="fullName-error" className="mt-1.5 text-xs text-red-600">
                              {errors.fullName}
                            </p>
                          )}
                        </div>

                        {/* Business Email */}
                        <div>
                          <label htmlFor="email" className="block text-xs font-semibold text-[#EAF4FB] mb-1.5">
                            Business Email <span className="text-[#F36B21]">*</span>
                          </label>
                          <input
                            ref={fieldRefs.email}
                            id="email"
                            type="email"
                            value={values.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            onBlur={() => handleBlur('email')}
                            aria-invalid={Boolean(errors.email)}
                            aria-describedby={errors.email ? 'email-error' : undefined}
                            placeholder="alex@company.com"
                            className={`w-full px-4 py-3 rounded-xl border text-sm bg-black focus:bg-[#141414] focus:outline-none ${
                              errors.email ? 'border-red-500' : 'border-white/10 focus:border-[#1769AA]'
                            }`}
                          />
                          {errors.email && (
                            <p id="email-error" className="mt-1.5 text-xs text-red-600">
                              {errors.email}
                            </p>
                          )}
                        </div>

                        {/* Phone */}
                        <div>
                          <label htmlFor="phone" className="block text-xs font-semibold text-[#EAF4FB] mb-1.5">
                            Phone Number <span className="text-[#F36B21]">*</span>
                          </label>
                          <input
                            ref={fieldRefs.phone}
                            id="phone"
                            type="tel"
                            value={values.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            onBlur={() => handleBlur('phone')}
                            aria-invalid={Boolean(errors.phone)}
                            aria-describedby={errors.phone ? 'phone-error' : undefined}
                            placeholder="+1 555 010 2040"
                            className={`w-full px-4 py-3 rounded-xl border text-sm bg-black focus:bg-[#141414] focus:outline-none ${
                              errors.phone ? 'border-red-500' : 'border-white/10 focus:border-[#1769AA]'
                            }`}
                          />
                          {errors.phone && (
                            <p id="phone-error" className="mt-1.5 text-xs text-red-600">
                              {errors.phone}
                            </p>
                          )}
                        </div>

                        {/* Company Name */}
                        <div>
                          <label htmlFor="company" className="block text-xs font-semibold text-[#EAF4FB] mb-1.5">
                            Company Name <span className="text-[#F36B21]">*</span>
                          </label>
                          <input
                            ref={fieldRefs.company}
                            id="company"
                            type="text"
                            value={values.company}
                            onChange={(e) => handleChange('company', e.target.value)}
                            onBlur={() => handleBlur('company')}
                            aria-invalid={Boolean(errors.company)}
                            aria-describedby={errors.company ? 'company-error' : undefined}
                            placeholder="Organization Inc."
                            className={`w-full px-4 py-3 rounded-xl border text-sm bg-black focus:bg-[#141414] focus:outline-none ${
                              errors.company ? 'border-red-500' : 'border-white/10 focus:border-[#1769AA]'
                            }`}
                          />
                          {errors.company && (
                            <p id="company-error" className="mt-1.5 text-xs text-red-600">
                              {errors.company}
                            </p>
                          )}
                        </div>

                        {/* Service Required */}
                        <div>
                          <label htmlFor="service" className="block text-xs font-semibold text-[#EAF4FB] mb-1.5">
                            Service Required <span className="text-[#F36B21]">*</span>
                          </label>
                          <select
                            ref={fieldRefs.service}
                            id="service"
                            value={values.service}
                            onChange={(e) => handleChange('service', e.target.value)}
                            onBlur={() => handleBlur('service')}
                            aria-invalid={Boolean(errors.service)}
                            aria-describedby={errors.service ? 'service-error' : undefined}
                            className={`w-full px-4 py-3 rounded-xl border text-sm bg-black focus:bg-[#141414] focus:outline-none ${
                              errors.service ? 'border-red-500' : 'border-white/10 focus:border-[#1769AA]'
                            }`}
                          >
                            <option value="">Select a service...</option>
                            {SERVICES.map((s) => (
                              <option key={s.id} value={s.title}>
                                {s.title}
                              </option>
                            ))}
                            <option value="Other">Other</option>
                          </select>
                          {errors.service && (
                            <p id="service-error" className="mt-1.5 text-xs text-red-600">
                              {errors.service}
                            </p>
                          )}
                        </div>

                        {/* Budget */}
                        <div>
                          <label htmlFor="budget" className="block text-xs font-semibold text-[#EAF4FB] mb-1.5">
                            Project Budget <span className="text-[#F36B21]">*</span>
                          </label>
                          <select
                            ref={fieldRefs.budget}
                            id="budget"
                            value={values.budget}
                            onChange={(e) => handleChange('budget', e.target.value)}
                            onBlur={() => handleBlur('budget')}
                            aria-invalid={Boolean(errors.budget)}
                            aria-describedby={errors.budget ? 'budget-error' : undefined}
                            className={`w-full px-4 py-3 rounded-xl border text-sm bg-black focus:bg-[#141414] focus:outline-none ${
                              errors.budget ? 'border-red-500' : 'border-white/10 focus:border-[#1769AA]'
                            }`}
                          >
                            <option value="">Select budget range...</option>
                            {BUDGET_RANGES.map((b) => (
                              <option key={b} value={b}>
                                {b}
                              </option>
                            ))}
                          </select>
                          {errors.budget && (
                            <p id="budget-error" className="mt-1.5 text-xs text-red-600">
                              {errors.budget}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label htmlFor="description" className="block text-xs font-semibold text-[#EAF4FB]">
                            Project Description <span className="text-[#F36B21]">*</span>
                          </label>
                          <span className="text-[11px] font-mono text-[#9CA3AF] tabular-nums">
                            {values.description.length} / {MAX_DESC_LENGTH}
                          </span>
                        </div>
                        <textarea
                          ref={fieldRefs.description}
                          id="description"
                          rows={4}
                          maxLength={MAX_DESC_LENGTH}
                          value={values.description}
                          onChange={(e) => handleChange('description', e.target.value)}
                          onBlur={() => handleBlur('description')}
                          aria-invalid={Boolean(errors.description)}
                          aria-describedby={errors.description ? 'description-error' : undefined}
                          placeholder="Outline the workflow you want to improve, key systems involved, and desired timeline..."
                          className={`w-full px-4 py-3 rounded-xl border text-sm bg-black focus:bg-[#141414] focus:outline-none ${
                            errors.description ? 'border-red-500' : 'border-white/10 focus:border-[#1769AA]'
                          }`}
                        />
                        {errors.description && (
                          <p id="description-error" className="mt-1.5 text-xs text-red-600">
                            {errors.description}
                          </p>
                        )}
                      </div>

                      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <p className="text-xs text-[#9CA3AF]">
                          Demo form. No data is sent to any external server.
                        </p>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl gradient-accent-cta text-white text-sm font-semibold min-h-[48px] hover:brightness-105 transition-all disabled:opacity-70 cursor-pointer whitespace-nowrap"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                              <span>Simulating Submission...</span>
                            </>
                          ) : (
                            <span>Submit Enquiry (Demo)</span>
                          )}
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
