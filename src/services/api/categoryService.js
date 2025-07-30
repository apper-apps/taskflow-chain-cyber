import categoriesData from "@/services/mockData/categories.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory storage for development
let categories = [...categoriesData];

export const getAll = async () => {
  await delay(200);
  return [...categories];
};

export const getById = async (id) => {
  await delay(150);
  const category = categories.find(cat => cat.Id === parseInt(id));
  if (!category) {
    throw new Error("Category not found");
  }
  return { ...category };
};

export const getByName = async (name) => {
  await delay(150);
  const category = categories.find(cat => cat.name.toLowerCase() === name.toLowerCase());
  if (!category) {
    throw new Error("Category not found");
  }
  return { ...category };
};