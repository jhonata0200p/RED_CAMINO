import usuariosData from "../data/db.json";

// Busca un usuario por correo y contraseña
export async function login(correo, password) {

    const correoNormalizado = (correo || "").trim().toLowerCase();
    const passwordNormalizado = (password || "").trim();

    const usuarios = usuariosData?.usuarios || [];

    return usuarios.find(usuario =>

        String(usuario.correo || "").toLowerCase() === correoNormalizado &&
        String(usuario.password || "") === passwordNormalizado

    ) || null;

}