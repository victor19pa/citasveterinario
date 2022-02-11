
export const formatearFecha  = fecha => {
    const nuevaFecha = new Date(fecha)
    const opciones = {
        weekday: 'string',
        year: 'numeric',
        month: 'string',
        day: 'numeric'
    }

    return nuevaFecha.toLocaleDateString('es-ES', opciones)
}