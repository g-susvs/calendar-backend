/**
 * Validar si el valor es una fecha
 * @param {*} value Solo acepta números
 * @returns Retorna true o false si la fecha es valida
 */
export const isDate = value => {
	if (!value || isNaN(new Date(value))) {
		return false;
	}
	return true;
};
