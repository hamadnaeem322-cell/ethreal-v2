import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Each field carries weight. Please complete the vow.");
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setForm({ name: "", email: "", message: "" });
      toast.success("Your message has crossed the field. We will answer in kind.");
    }, 900);
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative bg-[#050505] text-[#f2ebe5] py-32 md:py-44 border-t border-white/5"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-12 gap-12 md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="col-span-12 md:col-span-5"
        >
          <span className="eyebrow text-[#e29578]">Contact</span>
          <h2
            data-testid="contact-headline"
            className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight"
          >
            Send word
            <br />
            <span className="italic text-[#e29578]">across the field.</span>
          </h2>
          <p className="mt-8 font-body text-[#f2ebe5]/65 leading-[1.85] max-w-md">
            For words, memories, or quiet correspondence.
          </p>
        </motion.div>

        <motion.form
          data-testid="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
          className="col-span-12 md:col-span-6 md:col-start-7 space-y-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <div>
              <label className="eyebrow text-[#a39e98]">Your Name</label>
              <input
                data-testid="contact-name-input"
                className="ib-input"
                type="text"
                placeholder="The name you go by"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="eyebrow text-[#a39e98]">Correspondence</label>
              <input
                data-testid="contact-email-input"
                className="ib-input"
                type="email"
                placeholder="you@somewhere.world"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          <div className="pt-4">
            <label className="eyebrow text-[#a39e98]">Your Message</label>
            <textarea
              data-testid="contact-message-input"
              rows={5}
              className="ib-input resize-none"
              placeholder="Speak quietly. We are listening."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>

          <div className="pt-12 flex items-center justify-between">
            <span className="eyebrow text-[#a39e98] hidden md:inline">
              No reply is unread
            </span>
            <button
              type="submit"
              data-testid="contact-submit"
              disabled={sending}
              className="ib-cta disabled:opacity-60"
            >
              {sending ? "Sending…" : "Send the Vow"}
              <span className="ib-cta-arrow" />
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};
