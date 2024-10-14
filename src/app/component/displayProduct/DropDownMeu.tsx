'use client';
import { useEffect, useState } from 'react';
import { SubCategory } from '../../../types/displayProduct';
import TreeSelectComponent from '../TreeComponent';
import fetchApi from '../../../utils/fetchUtil';
import { useShoppingPageContext } from '../../../context/ShoppingPageContext';
import { useDisplayProductContext } from '../../../context/DisplayProductContext';
import { toast } from 'react-toastify';
const DropdownMenu = (props: any) => {

    
    const shoppingContext = useShoppingPageContext();
    const productContext = useDisplayProductContext();

    
    const { setSelectedCategoryId, setIsIllegal} =
        props.props === 'shopping' ? shoppingContext : productContext;

    const [categories, setCategories] = useState<SubCategory[]>([]);
    const [selectedDetail, setSelectedDetail] = useState<string | null>(null);
    const [selectedCategoryPath, setSelectedCategoryPath] = useState<string>(''); 
    
    useEffect(() => {
        if (typeof window !== 'undefined') {


            const fetchCategories = async () => {
                try {
                    const data = await fetchApi('/api/categoryRoute');
                    setCategories(data.data);
                } catch (error) {
                    console.error('Failed to fetch categories', error);
                }
            };
            fetchCategories();
        }
    }, []);
    
    const findCategoryById = (categories: any[], selectedValue: string, path = ''): any | null => {
        for (const category of categories) {
            const currentPath = path ? `${path}/${category._id}` : category._id;
            
            if (category._id === selectedValue) {
                return { category, path: currentPath };
            }
            
            if (category.subcategories && category.subcategories.length > 0) {
                const foundCategory = findCategoryById(category.subcategories, selectedValue, currentPath);
                if (foundCategory) {
                    return foundCategory;
                }
            }
        }
        return null;
    };
    
    const handleCategorySelect = async (selectedValue: string) => {
        
        const result = findCategoryById(categories, selectedValue);
        
        if (result && result.category.subcategories.length === 0) {
            setSelectedDetail(result.category.name);
            setSelectedCategoryPath(result.path);
            setSelectedCategoryId(result.path); 
            setIsIllegal(true)
        } else {
            toast.warn('Category not found or has subcategories.');
            setIsIllegal(false)
        }
    };
    return (
        <div>
            {categories.length > 0 && (
                <TreeSelectComponent
                    categories={categories}
                    onCategoryChange={handleCategorySelect} 
                />
            )}
        </div>
    );
};
export default DropdownMenu;