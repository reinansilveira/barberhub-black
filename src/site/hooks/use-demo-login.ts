"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export function useDemoLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("rafael@barberhub.com.br");
  const [password, setPassword] = useState("demonstracao");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => router.push("/painel"), 600);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    togglePassword: () => setShowPassword((value) => !value),
    submitting,
    submit,
  };
}
