"use client";

import { useState } from "react";
import { Mail, ShieldCheck, Trash2, User, X } from "lucide-react";
import { ApiError, fieldError } from "@/lib/api";
import { useAuth, type AuthUser } from "@/contexts/AuthContext";
import { useTranslation } from "@/contexts/LocaleContext";
import type { ValidationErrors } from "@/types/api";

export default function ProfileModal({
  user,
  onClose,
}: {
  user: AuthUser;
  onClose: () => void;
}) {
  const { updateProfile, deleteAccount } = useAuth();
  const { t } = useTranslation();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState<ValidationErrors>();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const save = async () => {
    setIsSubmitting(true);
    setMessage("");
    setErrors(undefined);
    try {
      await updateProfile({
        name,
        email,
        ...(password
          ? {
              current_password: currentPassword,
              password,
              password_confirmation: passwordConfirmation,
            }
          : {}),
      });
      setPassword("");
      setPasswordConfirmation("");
      setCurrentPassword("");
      setMessage("Profil berhasil diperbarui.");
    } catch (error) {
      if (error instanceof ApiError) setErrors(error.errors);
      setMessage(error instanceof Error ? error.message : "Profil gagal diperbarui.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const remove = async () => {
    if (!currentPassword) {
      setMessage("Masukkan password saat ini untuk menghapus akun.");
      return;
    }
    if (!window.confirm("Hapus akun secara permanen? Tindakan ini tidak dapat dibatalkan.")) return;
    setIsSubmitting(true);
    try {
      await deleteAccount(currentPassword);
      onClose();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Akun gagal dihapus.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fields = [
    { key: "name", label: t("auth.name"), value: name, set: setName, type: "text", icon: User },
    { key: "email", label: t("auth.email"), value: email, set: setEmail, type: "email", icon: Mail },
    { key: "current_password", label: t("profile.currentPassword"), value: currentPassword, set: setCurrentPassword, type: "password", icon: ShieldCheck },
    { key: "password", label: t("profile.newPassword"), value: password, set: setPassword, type: "password", icon: ShieldCheck },
    { key: "password_confirmation", label: t("profile.confirmNewPassword"), value: passwordConfirmation, set: setPasswordConfirmation, type: "password", icon: ShieldCheck },
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm" onClick={onClose}>
      <section role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()} className="max-h-[calc(100svh-24px)] w-full max-w-lg overflow-y-auto rounded-lg border border-[#c9a84c]/30 bg-[#012f2b] font-graziemille text-[#c9b99a] shadow-2xl">
        <header className="flex items-center justify-between border-b border-[#c9a84c]/20 px-6 py-5">
          <div><h2 className="font-gilland text-2xl text-[#f8c56c]">{t("profile.title")}</h2><p className="mt-1 text-xs text-[#c9b99a]/45">{user.is_admin ? t("profile.administrator") : t("profile.customer")}</p></div>
          <button type="button" onClick={onClose} aria-label={t("common.close")}><X /></button>
        </header>
        <form className="space-y-4 p-6" onSubmit={(event) => { event.preventDefault(); void save(); }}>
          {fields.map(({ key, label, value, set, type, icon: Icon }) => (
            <label key={key} className="block text-[10px] tracking-[2px] text-[#c9b99a]/55">
              {label}
              <span className="mt-2 flex items-center border border-[#c9a84c]/20 bg-[#012724] px-3">
                <Icon size={16} className="shrink-0" />
                <input type={type} value={value} onChange={(event) => set(event.target.value)} required={key === "name" || key === "email"} className="w-full bg-transparent px-3 py-3 text-sm tracking-normal text-[#f5edd6] outline-none" />
              </span>
              {fieldError(errors, key) && <span className="mt-1 block tracking-normal text-[#ff7b86]">{fieldError(errors, key)}</span>}
            </label>
          ))}
          {message && <p role="status" className={`text-sm ${message.includes("berhasil") ? "text-[#f8c56c]" : "text-[#ff7b86]"}`}>{message}</p>}
          <button disabled={isSubmitting} className="w-full bg-[#f8c56c] py-3 text-xs font-bold tracking-[3px] text-[#012421] disabled:opacity-60">{isSubmitting ? t("profile.processing") : t("profile.save")}</button>
          <button type="button" disabled={isSubmitting} onClick={() => void remove()} className="flex w-full items-center justify-center gap-2 border border-[#ff6673]/40 py-3 text-xs tracking-[2px] text-[#ff6673]"><Trash2 size={15} /> HAPUS AKUN</button>
        </form>
      </section>
    </div>
  );
}
