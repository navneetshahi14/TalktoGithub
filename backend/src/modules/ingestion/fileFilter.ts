const IGNORED_FOLDERS = ["node_modules", ".git", "dist", "build", ".next"];
const ALLOWED_EXTENSION = [
  ".ts",
  ".js",
  ".tsx",
  ".jsx",
  ".py",
  ".java",
  ".cpp",
  ".md",
  ".json",
];

export const filterUsefulFiles = (tree: any[]) => {
  return tree.filter((item) => {
    if (item.type !== "blob") return false;

    if (IGNORED_FOLDERS.some((f) => item.path.includes(f))) return false;

    return ALLOWED_EXTENSION.some((ext) => item.path.endsWith(ext));
  });
};
