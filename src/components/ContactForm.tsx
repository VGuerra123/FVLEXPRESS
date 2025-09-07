'use client';

import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, User, MessageSquare, Send } from "lucide-react";

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await emailjs.send(
        "service_xxxxxx", // 🔹 tu serviceID de EmailJS
        "template_xxxxxx", // 🔹 tu templateID de EmailJS
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: "diegoffuentes@fvtransportesltdacom.com"
        },
        "public_key_xxxxxx" // 🔹 tu publicKey de EmailJS
      );
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="contact-form" className="py-20 bg-gradient-to-br from-white via-blue-50 to-blue-100">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-black text-blue-800 mb-6">Contáctanos</h2>
        <p className="text-lg text-blue-700 mb-10">
          Completa el formulario y nuestro equipo se pondrá en contacto contigo en breve.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur-md shadow-soft rounded-3xl p-8 space-y-6 border border-blue-200/40"
        >
          {/* Nombre */}
          <div className="flex items-center border border-blue-200 rounded-xl p-4 bg-white/80">
            <User className="text-blue-600 mr-3" />
            <input
              type="text"
              name="name"
              placeholder="Tu nombre"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-transparent outline-none text-blue-800"
            />
          </div>

          {/* Email */}
          <div className="flex items-center border border-blue-200 rounded-xl p-4 bg-white/80">
            <Mail className="text-blue-600 mr-3" />
            <input
              type="email"
              name="email"
              placeholder="Tu correo electrónico"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-transparent outline-none text-blue-800"
            />
          </div>

          {/* Mensaje */}
          <div className="flex items-start border border-blue-200 rounded-xl p-4 bg-white/80">
            <MessageSquare className="text-blue-600 mr-3 mt-1" />
            <textarea
              name="message"
              placeholder="Escribe tu mensaje..."
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full bg-transparent outline-none text-blue-800 resize-none"
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-soft hover:shadow-medium"
          >
            <Send className="w-5 h-5" />
            {status === "loading"
              ? "Enviando..."
              : status === "success"
              ? "¡Mensaje enviado!"
              : status === "error"
              ? "Error al enviar"
              : "Enviar Mensaje"}
          </button>
        </form>
      </div>
    </section>
  );
};
