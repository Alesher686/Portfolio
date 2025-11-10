import React, { useState } from 'react';

import { motion } from 'framer-motion';

import s from './contactForm.module.scss';

interface IContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const ContactForm = () => {
  const [formData, setFormData] = useState<IContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Здесь будет логика отправки формы
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Имитация отправки
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Ошибка отправки формы:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={s.contactSection}>
      <div className={s.container}>
        <div className={s.content}>
          <motion.div
            className={s.formWrapper}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {isSubmitted ? (
              <div className={s.successMessage}>
                <h3>Спасибо за ваше сообщение!</h3>
                <p>Я свяжусь с вами в ближайшее время.</p>
                <button className={s.resetButton} onClick={() => setIsSubmitted(false)}>
                  Отправить ещё одно сообщение
                </button>
              </div>
            ) : (
              <form className={s.form} onSubmit={handleSubmit}>
                <div className={s.inputGroup}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ваше имя"
                    className={s.input}
                    required
                  />
                </div>

                <div className={s.inputGroup}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Ваш email"
                    className={s.input}
                    required
                  />
                </div>

                <div className={s.inputGroup}>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Тема сообщения"
                    className={s.input}
                    required
                  />
                </div>

                <div className={s.inputGroup}>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Ваше сообщение..."
                    className={s.textarea}
                    rows={5}
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  className={s.submitButton}
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
