export function cleanLogoPath(dirtyName: string): string {
  const cleanName = dirtyName
    .toLowerCase()
    .normalize("NFD") // separates diacritics
    .replace(/[\u0300-\u036f]/g, "") // deletes diacritics
    .replace(/['’`]/g, "") // deletes apostrophes and quotes
    .replace(/\(.*?reserva.*?\)/gi, "") // removes (Reserva) and similar parentheticals
    .replace(/\b(reserva)\b/gi, "") // deletes reserva
    .trim()
    .replace(/\s+/g, "-") // spaces to hyphen
    .replace(/-+/g, "-") // deletes double hyphens
    .replace(/^-|-$/g, ""); // deletes hyphens at the start/end

  return `/logos/${cleanName}.svg`;
}
