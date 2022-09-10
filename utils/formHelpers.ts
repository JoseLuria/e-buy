export const handleCreateSlug = (title: string) => {
  return title.trim().replaceAll(" ", "-").replaceAll("'", "").toLowerCase();
};
