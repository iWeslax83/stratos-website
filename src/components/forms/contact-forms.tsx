"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Check, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type FormType = "sponsor" | "membership";
type Status = "idle" | "submitting" | "success" | "error";

const MEMBERSHIP_HASHES = new Set(["#uyelik", "#katil", "#bize-katil", "#membership"]);

// Honeypot field name — must match server. Real users won't see/fill this.
const HONEYPOT = "website_url";

function useFormGuards() {
  const renderedAt = useRef<number>(Date.now());
  return renderedAt;
}

function HoneypotField() {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden opacity-0">
      <label>
        Web siteniz (boş bırakın)
        <input
          type="text"
          name={HONEYPOT}
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </label>
    </div>
  );
}

export function ContactForms() {
  const [active, setActive] = useState<FormType>("sponsor");

  useEffect(() => {
    const sync = () => {
      if (MEMBERSHIP_HASHES.has(window.location.hash.toLowerCase())) {
        setActive("membership");
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <div id="uyelik">
      <div className="flex gap-2 border-b border-white/10">
        <TabButton
          active={active === "sponsor"}
          onClick={() => setActive("sponsor")}
        >
          Sponsor Sorgusu
        </TabButton>
        <TabButton
          active={active === "membership"}
          onClick={() => setActive("membership")}
        >
          Üyelik Başvurusu
        </TabButton>
      </div>
      <div className="mt-8">
        {active === "sponsor" ? <SponsorForm /> : <MembershipForm />}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative px-4 py-3 text-xs font-display font-semibold uppercase tracking-[0.2em] transition-colors",
        active
          ? "text-[var(--color-brand-300)]"
          : "text-ink-300 hover:text-white",
      )}
    >
      {children}
      {active && (
        <span className="absolute inset-x-0 -bottom-px h-[2px] bg-[var(--color-brand-300)]" />
      )}
    </button>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[0.7rem] uppercase tracking-[0.2em] text-ink-300">
      {children}
    </label>
  );
}

const inputClasses =
  "mt-2 block w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-ink-50 placeholder:text-ink-500 focus:border-[var(--color-brand-300)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-300)]/40";

// Native <select> renders with the OS dropdown (light popup, default arrow) and
// clashes with the dark theme. Strip the native chrome, paint our own chevron,
// and force a dark option list.
const selectClasses = cn(
  inputClasses,
  "cursor-pointer appearance-none bg-no-repeat pr-11",
  "[background-position:right_1rem_center] [background-size:0.7rem]",
  "[background-image:url(\"data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2012%208'%20fill='none'%3E%3Cpath%20d='M1%201.5L6%206.5L11%201.5'%20stroke='%237dd3fc'%20stroke-width='1.75'%20stroke-linecap='round'%20stroke-linejoin='round'/%3E%3C/svg%3E\")]",
  "[&>option]:bg-[var(--color-ink-900)] [&>option]:text-ink-100",
);

function SponsorForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const renderedAt = useFormGuards();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "sponsor",
          ...data,
          _elapsed: Date.now() - renderedAt.current,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const detail =
          body.detail && typeof body.detail === "object"
            ? `: ${body.detail.message ?? JSON.stringify(body.detail)}`
            : body.detail
              ? `: ${body.detail}`
              : "";
        throw new Error(`${body.error ?? "Gönderim başarısız."}${detail}`);
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Bilinmeyen hata.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="relative grid gap-5">
      <HoneypotField />
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <FieldLabel>Şirket / Kurum</FieldLabel>
          <input name="company" required className={inputClasses} placeholder="Şirket adı" />
        </div>
        <div>
          <FieldLabel>İletişim Kişisi</FieldLabel>
          <input name="name" required className={inputClasses} placeholder="Ad Soyad" />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <FieldLabel>E-posta</FieldLabel>
          <input
            type="email"
            name="email"
            required
            className={inputClasses}
            placeholder="ornek@kurum.com"
          />
        </div>
        <div>
          <FieldLabel>Telefon (opsiyonel)</FieldLabel>
          <input name="phone" className={inputClasses} placeholder="+90 5xx xxx xx xx" />
        </div>
      </div>
      <div>
        <FieldLabel>Mesajınız</FieldLabel>
        <textarea
          name="message"
          required
          rows={5}
          className={cn(inputClasses, "resize-y")}
          placeholder="Beklentilerinizi ve sormak istediklerinizi yazın."
        />
      </div>

      <StatusLine status={status} errorMsg={errorMsg} successMsg="Sponsor talebiniz iletildi, en kısa sürede yanıt vereceğiz." />

      <div className="flex justify-end">
        <Button type="submit" size="md" variant="primary">
          {status === "submitting" ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Gönderiliyor
            </>
          ) : (
            <>
              Sponsor Talebi Gönder <Send size={14} />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

function MembershipForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const renderedAt = useFormGuards();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "membership",
          ...data,
          _elapsed: Date.now() - renderedAt.current,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const detail =
          body.detail && typeof body.detail === "object"
            ? `: ${body.detail.message ?? JSON.stringify(body.detail)}`
            : body.detail
              ? `: ${body.detail}`
              : "";
        throw new Error(`${body.error ?? "Gönderim başarısız."}${detail}`);
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Bilinmeyen hata.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="relative grid gap-5">
      <HoneypotField />
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <FieldLabel>Ad Soyad</FieldLabel>
          <input name="name" required className={inputClasses} placeholder="Ad Soyad" />
        </div>
        <div>
          <FieldLabel>Sınıf</FieldLabel>
          <input name="grade" required className={inputClasses} placeholder="ör. 11/A" />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <FieldLabel>Okul E-postası</FieldLabel>
          <input
            type="email"
            name="email"
            required
            className={inputClasses}
            placeholder="ornek@bursafenlisesi.k12.tr"
          />
        </div>
        <div>
          <FieldLabel>Telefon (opsiyonel)</FieldLabel>
          <input name="phone" className={inputClasses} placeholder="+90 5xx xxx xx xx" />
        </div>
      </div>
      <div>
        <FieldLabel>İlgilendiğiniz departman</FieldLabel>
        <select name="department" required className={selectClasses} defaultValue="">
          <option value="" disabled>
            Bir departman seçin
          </option>
          <option value="cizim">Çizim</option>
          <option value="mekanik">Mekanik</option>
          <option value="yazilim">Yazılım</option>
          <option value="sponsorluk">Sponsorluk</option>
        </select>
      </div>
      <div>
        <FieldLabel>Kendinizden bahsedin</FieldLabel>
        <textarea
          name="message"
          required
          rows={5}
          className={cn(inputClasses, "resize-y")}
          placeholder="Hangi konularla ilgileniyorsunuz? Daha önce neler yaptınız?"
        />
      </div>

      <StatusLine status={status} errorMsg={errorMsg} successMsg="Başvurun bize ulaştı, yakında geri döneceğiz." />

      <div className="flex justify-end">
        <Button type="submit" size="md" variant="primary">
          {status === "submitting" ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Gönderiliyor
            </>
          ) : (
            <>
              Başvuru Gönder <Send size={14} />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

function StatusLine({
  status,
  errorMsg,
  successMsg,
}: {
  status: Status;
  errorMsg: string | null;
  successMsg: string;
}) {
  if (status === "success") {
    return (
      <p className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-3 py-2.5 text-sm text-emerald-300">
        <Check size={16} /> {successMsg}
      </p>
    );
  }
  if (status === "error") {
    return (
      <p className="flex items-center gap-2 rounded-lg border border-rose-500/30 bg-rose-500/5 px-3 py-2.5 text-sm text-rose-300">
        <AlertCircle size={16} /> {errorMsg ?? "Bir hata oluştu, tekrar deneyin."}
      </p>
    );
  }
  return null;
}
