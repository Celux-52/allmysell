"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { trackContactFormSubmit } from "@/lib/gtag";

interface ContactFormProps {
  dict: any;
}

export default function ContactForm({ dict }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
    honeypot: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        trackContactFormSubmit(formData.email, formData.company);
        setStatus("success");
        setFormData({ name: "", company: "", email: "", message: "", honeypot: "" });
      } else {
        const data = await response.json().catch(() => null);
        setErrorMessage(data?.error || "");
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-[#0A192F] mb-2">{dict.form_success_title}</h3>
        <p className="text-slate-500 mb-6">
          {dict.form_success_desc}
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
        >
          {dict.form_success_another}
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Honeypot field for anti-spam */}
      <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
        <input type="text" name="honeypot" tabIndex={-1} autoComplete="off" onChange={handleChange} value={formData.honeypot} />
      </div>
      {status === "error" && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">{errorMessage || dict.form_error}</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#0A192F]">{dict.form_name}</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#0A192F]">{dict.form_company}</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-[#0A192F]">{dict.form_email}</label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-[#0A192F]">{dict.form_message}</label>
        <textarea
          rows={4}
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all resize-none"
        ></textarea>
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-[#0A192F] hover:bg-indigo-600 text-white font-bold py-4 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {status === "loading" && <Loader2 className="w-5 h-5 animate-spin" />}
        {status === "loading" ? dict.form_sending : dict.form_submit}
      </button>
    </form>
  );
}
