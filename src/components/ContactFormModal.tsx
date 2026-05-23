import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useModalScroll } from "@/hooks/useModalScroll";
import { z } from "zod";
import { sendToTelegram, formatContactMessageForTelegram } from "@/lib/telegram";

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  message: z
    .string()
    .trim()
    .min(1, { message: "Message is required" })
    .max(2000, { message: "Message must be less than 2000 characters" }),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactFormModal = ({ isOpen, onClose }: ContactFormModalProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Disable Lenis smooth scroll when modal is open
  useModalScroll(isOpen);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "0px";
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrors({});
    setErrorMessage("");

    // Validate form data
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<ContactFormData> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      setStatus("idle");
      return;
    }

    try {
      // Format the message for Telegram
      const message = formatContactMessageForTelegram(result.data);

      // Send directly to Telegram
      const success = await sendToTelegram(message);

      if (!success) {
        throw new Error("Failed to send message to Telegram");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });

      // Auto-close after success
      setTimeout(() => {
        onClose();
        setStatus("idle");
      }, 2000);
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to send message"
      );
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", message: "" });
    setErrors({});
    setStatus("idle");
    setErrorMessage("");
    onClose();
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="contact-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-foreground/90 backdrop-blur-md"
        >
          {/* Modal Container */}
          <motion.div
            key="contact-modal-content"
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.05,
            }}
            className="relative mx-4 w-full max-w-lg max-h-[90vh] border-4 border-foreground bg-background shadow-[12px_12px_0px_0px_hsl(var(--accent))] flex flex-col"
          >
            {/* Close Button */}
            <motion.button
              onClick={resetForm}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute -right-3 -top-3 z-20 flex h-12 w-12 items-center justify-center border-2 border-foreground bg-background text-foreground shadow-[3px_3px_0px_0px_hsl(var(--foreground))] transition-colors hover:bg-destructive hover:text-destructive-foreground md:-right-4 md:-top-4"
            >
              <X size={24} />
            </motion.button>

            {/* Scrollable Content */}
            <div
              ref={scrollContainerRef}
              className="overflow-y-auto overscroll-contain flex-1 p-6 md:p-8"
            >
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="mb-6"
              >
                <h2 className="text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
                  Send a Message
                </h2>
                <p className="mt-2 text-muted-foreground">
                  I'll receive your message directly and get back to you soon.
                </p>
              </motion.div>

              {/* Success State */}
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                  >
                    <CheckCircle size={64} className="text-emerald-500" />
                  </motion.div>
                  <h3 className="mt-4 text-xl font-bold text-foreground">
                    Message Sent!
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Thank you for reaching out. I'll respond soon.
                  </p>
                </motion.div>
              )}

              {/* Form */}
              {status !== "success" && (
                <motion.form
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="space-y-4"
                >
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-bold uppercase tracking-wide text-foreground"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={`w-full border-2 bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 ${errors.name
                          ? "border-destructive"
                          : "border-foreground focus:border-accent"
                        }`}
                      disabled={status === "loading"}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-destructive">{errors.name}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-bold uppercase tracking-wide text-foreground"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={`w-full border-2 bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 ${errors.email
                          ? "border-destructive"
                          : "border-foreground focus:border-accent"
                        }`}
                      disabled={status === "loading"}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-destructive">{errors.email}</p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-bold uppercase tracking-wide text-foreground"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      rows={5}
                      className={`w-full resize-none border-2 bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 ${errors.message
                          ? "border-destructive"
                          : "border-foreground focus:border-accent"
                        }`}
                      disabled={status === "loading"}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Error Message */}
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 border-2 border-destructive bg-destructive/10 p-3"
                    >
                      <AlertCircle size={18} className="text-destructive" />
                      <p className="text-sm text-destructive">{errorMessage}</p>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={status === "loading"}
                    whileHover={{ x: -2, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex w-full items-center justify-center gap-2 border-2 border-foreground bg-foreground px-6 py-4 text-base font-bold uppercase tracking-wide text-background shadow-[4px_4px_0px_0px_hsl(var(--accent))] transition-all hover:shadow-[6px_6px_0px_0px_hsl(var(--accent))] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactFormModal;
