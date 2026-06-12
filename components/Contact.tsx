"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }
      
      setSuccess(true);
      e.currentTarget.reset();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center border-t border-surface-variant relative" id="contact">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex justify-center items-center opacity-20">
        <div className="w-[120vw] h-[120vw] border border-outline-variant rounded-full absolute scale-150"></div>
        <div className="w-[90vw] h-[90vw] border border-outline-variant rounded-full absolute scale-110"></div>
        <div className="w-[60vw] h-[60vw] border border-outline-variant rounded-full absolute scale-75"></div>
        <div className="w-[30vw] h-[307px] border border-outline-variant rounded-full absolute scale-50"></div>
      </div>
      
      <div className="w-full max-w-container-max mx-auto px-gutter md:px-margin-desktop relative z-10 flex flex-col justify-center h-full py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full">
          {/* Left Side Links */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="col-span-1 md:col-span-6 flex flex-col justify-center space-y-8"
          >
            <h1 
              className="font-unica text-[60px] md:text-[100px] lg:text-[140px] leading-[0.8] font-light tracking-tighter text-primary uppercase" 
              style={{ textShadow: "2px 2px 0px var(--color-outline-variant)" }}
            >
              LET&apos;S<br/>BUILD
            </h1>
            <div className="flex flex-col space-y-4 pt-8 border-t border-outline-variant w-max">
              <a 
                className="font-ui-button text-ui-button text-on-surface hover:text-primary link-hover flex items-center gap-2 w-max text-xs md:text-sm" 
                href="mailto:hello@yn-sys.dev"
              >
                hello@yn-sys.dev <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
              </a>
              <a 
                className="font-ui-button text-ui-button text-on-surface hover:text-primary link-hover flex items-center gap-2 w-max text-xs md:text-sm" 
                href="https://github.com/muarijshakeel"
                target="_blank" rel="noopener noreferrer"
              >
                GitHub <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
              </a>
              <a 
                className="font-ui-button text-ui-button text-on-surface hover:text-primary link-hover flex items-center gap-2 w-max text-xs md:text-sm" 
                href="https://www.linkedin.com/in/muarijshakeel"
                target="_blank" rel="noopener noreferrer"
              >
                LinkedIn <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
              </a>
            </div>
          </motion.div>
          
          {/* Right Side Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="col-span-1 md:col-span-5 md:col-start-8 flex flex-col justify-center"
          >
            <form 
              className="space-y-8 bg-surface-container-lowest/50 p-8 md:p-12 border border-outline-variant relative" 
              onSubmit={handleSubmit}
            >
              <div className="absolute -right-[2px] -bottom-[2px] w-full h-full border border-primary z-[-1] pointer-events-none"></div>
              <div className="space-y-2">
                <label className="font-label-mono text-label-mono text-outline-variant block uppercase tracking-widest" htmlFor="name">Name</label>
                <input className="brutal-input font-body-md text-body-md" id="name" name="name" placeholder="Enter your name" required type="text"/>
              </div>
              <div className="space-y-2">
                <label className="font-label-mono text-label-mono text-outline-variant block uppercase tracking-widest" htmlFor="email">Email</label>
                <input className="brutal-input font-body-md text-body-md" id="email" name="email" placeholder="Enter your email" required type="email"/>
              </div>
              <div className="space-y-2">
                <label className="font-label-mono text-label-mono text-outline-variant block uppercase tracking-widest" htmlFor="message">Message</label>
                <textarea className="brutal-input font-body-md text-body-md resize-none" id="message" name="message" placeholder="Tell me about your project..." required rows={3}></textarea>
              </div>
              {error && (
                <div className="p-4 border border-red-500/50 bg-red-500/10 text-red-500 text-sm font-mono">
                  {error}
                </div>
              )}
              {success && (
                <div className="p-4 border border-green-500/50 bg-green-500/10 text-green-500 text-sm font-mono">
                  Message sent successfully. I will get back to you soon.
                </div>
              )}
              <button 
                className="font-ui-button text-ui-button border border-primary px-8 py-4 w-full uppercase tracking-widest hover:bg-primary hover:text-background transition-colors flex justify-between items-center group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" 
                type="submit"
                disabled={isSubmitting || success}
              >
                <span>{isSubmitting ? "Sending..." : success ? "Sent" : "Send Message"}</span>
                {!isSubmitting && !success && <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
