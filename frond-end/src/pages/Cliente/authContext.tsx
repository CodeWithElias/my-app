// src/pages/Cliente/authContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import Usuario from './Cliente'

// Definir la estructura del contexto
interface AuthContextType {
  inicioSesion: boolean;
  setInicioSesion: (value: boolean) => void;
  usuarioLogin: Usuario | null;
  setUsuarioLogin: (value: Usuario | null) => void;
}

// Crear el contexto con el tipo correcto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [inicioSesion, setInicioSesion] = useState(() => {
    const storedInicioSesion = localStorage.getItem('inicioSesion');
    return storedInicioSesion ? JSON.parse(storedInicioSesion) : false;
  });

  const [usuarioLogin, setUsuarioLogin] = useState<Usuario | null>(() => {
    const storedUsuarioLogin = localStorage.getItem('usuarioLogin');
    return storedUsuarioLogin ? JSON.parse(storedUsuarioLogin) : null;
  });

  useEffect(() => {
    localStorage.setItem('inicioSesion', JSON.stringify(inicioSesion));
  }, [inicioSesion]);

  useEffect(() => {
    localStorage.setItem('usuarioLogin', JSON.stringify(usuarioLogin));
  }, [usuarioLogin]);

  return (
    <AuthContext.Provider value={{ inicioSesion, setInicioSesion, usuarioLogin, setUsuarioLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ `useAuth()` ahora devuelve el tipo correcto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
