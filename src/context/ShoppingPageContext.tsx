'use client';
import React, { createContext, useContext, useState } from 'react';

export type ShoppingPageContextType = {
    content: string;
    selectedCategoryId: string | null;
    isIllegal:boolean;
    setContent: (content: string) => void;
    setSelectedCategoryId: (id: string | null) => void;
    setIsIllegal:(flag:boolean)=>void

};

const ShoppingPageContext = createContext<ShoppingPageContextType | undefined>(undefined);

export const ShoppingPageProvider = ({ children }: { children: React.ReactNode }) => {
    const [content, setContent] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const [isIllegal,setIsIllegal] = useState<boolean | null>(null);

    return (
        <ShoppingPageContext.Provider
            value={{
                content,
                selectedCategoryId,
                isIllegal,
                setContent,
                setSelectedCategoryId,
                setIsIllegal,
            }}
        >
            {children}
        </ShoppingPageContext.Provider>
    );
};

export const useShoppingPageContext = () => {
    const context = useContext(ShoppingPageContext);
    if (context === undefined) {
        throw new Error('useShoppingPageContext must be used within a ShoppingPageProvider');
    }
    return context;
};