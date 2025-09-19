import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../constants/pagination.constants";
import { PaginationParams } from "../types/pagination.type";

/**
 * Crea el rango de paginación basado en los parámetros de paginación.
 * @param paginationParams Parámetros de paginación (page y limit).
 * @returns Un objeto con las propiedades from (índice inicial) y to (índice final) para la consulta de datos.
 *
 * Ejemplo: Si page=2 y limit=10, from=10 y to=19, es decir, devuelve los elementos del 11 al 20.
 */
export const createRangePagination = (paginationParams: PaginationParams) => {
	const { page, limit } = paginationParams || { page: DEFAULT_PAGE, limit: DEFAULT_LIMIT };
	const from = (page - 1) * limit;
	const to = from + limit - 1;

	return { from, to };
};
