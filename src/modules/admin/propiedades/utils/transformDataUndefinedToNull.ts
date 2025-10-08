export const transformDataUndefinedToNull = (obj: unknown): unknown => {
	if (obj === undefined) {
		return null;
	}

	if (Array.isArray(obj)) {
		return obj.map(transformDataUndefinedToNull);
	}

	if (typeof obj === "object" && obj !== null) {
		const transformed: Record<string, unknown> = {};
		for (const [key, value] of Object.entries(obj)) {
			transformed[key] = transformDataUndefinedToNull(value);
		}
		return transformed;
	}

	return obj;
};
