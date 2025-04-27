// src/pages/Cliente/authContext.tsx
import { createContext, useContext, useState } from "react";
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
  const [inicioSesion, setInicioSesion] = useState(false);
  const [usuarioLogin, setUsuarioLogin] = useState<Usuario | null>(null);

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
