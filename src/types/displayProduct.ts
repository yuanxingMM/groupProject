export interface SubCategory {
    _id: string;
    name: string;
    subcategories: SubCategory[];
}