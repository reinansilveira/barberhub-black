"use client";

import { HERO_VIDEO, IMAGES } from "../site.data";
import { useDemoLogin } from "../hooks/use-demo-login";
import { Logo } from "./Logo";

export function BlackLogin() {
  const login = useDemoLogin();

  return (
    <div className="login">
      <video
        className="login__video"
        src={HERO_VIDEO}
        poster={IMAGES.hero}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="login__veil" aria-hidden="true" />

      <div className="login__logo">
        <Logo />
      </div>

      <section className="login__card">
        <p className="eyebrow">Área do profissional</p>
        <h1 className="title title--sm">
          Bem-vindo <em>de volta</em>
        </h1>
        <p className="login__demo">Demonstração: os dados já vêm preenchidos, é só entrar.</p>

        <form className="login__form" onSubmit={login.submit}>
          <label className="login__field">
            <span>E-mail</span>
            <input
              type="email"
              autoComplete="email"
              value={login.email}
              onChange={(event) => login.setEmail(event.target.value)}
            />
          </label>

          <label className="login__field">
            <span>Senha</span>
            <span className="login__password">
              <input
                type={login.showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={login.password}
                onChange={(event) => login.setPassword(event.target.value)}
              />
              <button
                type="button"
                onClick={login.togglePassword}
                aria-pressed={login.showPassword}
                aria-label={login.showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {login.showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </span>
          </label>

          <button className="btn btn--gold" disabled={login.submitting} data-magnetic>
            {login.submitting ? "Entrando..." : "Entrar no painel"}
          </button>
        </form>
      </section>
    </div>
  );
}
