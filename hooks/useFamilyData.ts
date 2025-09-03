import { useState, useEffect, useCallback } from 'react';
import { FamilyMember } from '../types';

const STORAGE_KEY = 'agecalc.family';

const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
    let timeout: number;

    return (...args: Parameters<F>): Promise<ReturnType<F>> =>
        new Promise(resolve => {
            clearTimeout(timeout);
            timeout = window.setTimeout(() => resolve(func(...args)), waitFor);
        });
};

const debouncedSetLocalStorage = debounce((key: string, value: string) => {
    try {
        localStorage.setItem(key, value);
    } catch (error) {
        console.error("Failed to save family data to localStorage", error);
    }
}, 300);


export const useFamilyData = () => {
    const [family, setFamily] = useState<FamilyMember[]>([]);

    useEffect(() => {
        try {
            const storedData = localStorage.getItem(STORAGE_KEY);
            if (storedData) {
                setFamily(JSON.parse(storedData));
            }
        } catch (error) {
            console.error("Failed to load family data from localStorage", error);
        }
    }, []);

    const updateFamilyData = (newFamily: FamilyMember[]) => {
        setFamily(newFamily);
        debouncedSetLocalStorage(STORAGE_KEY, JSON.stringify(newFamily));
        window.dispatchEvent(new CustomEvent('familyChanged', { detail: newFamily }));
    };

    const addMember = useCallback((memberData: Omit<FamilyMember, 'id'>) => {
        if (family.length >= 200) {
            if (!window.confirm("Warning: You have 200 or more family members. Performance may be affected. Do you want to continue?")) {
                return;
            }
        }
        const newMember = { ...memberData, id: crypto.randomUUID() };
        updateFamilyData([...family, newMember]);
    }, [family]);

    const updateMember = useCallback((updatedMember: FamilyMember) => {
        const updatedFamily = family.map(m => m.id === updatedMember.id ? updatedMember : m);
        updateFamilyData(updatedFamily);
    }, [family]);

    const deleteMember = useCallback((memberId: string) => {
        const updatedFamily = family.filter(m => m.id !== memberId);
        updateFamilyData(updatedFamily);
    }, [family]);

    const exportFamily = useCallback(() => {
        if (family.length === 0) {
            alert("No family data to export.");
            return;
        }
        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(family, null, 2)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "agecalc_family_backup.json";
        link.click();
    }, [family]);

    const importFamily = useCallback((file: File) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const text = event.target?.result;
                if (typeof text !== 'string') throw new Error("File is not readable");
                const importedFamily = JSON.parse(text);

                // Basic validation
                if (Array.isArray(importedFamily) && importedFamily.every(m => m.id && m.name && m.relation && m.dobISO)) {
                    updateFamilyData(importedFamily);
                    alert("Family data imported successfully!");
                } else {
                    throw new Error("Invalid file format.");
                }
            } catch (error) {
                console.error("Failed to import family data", error);
                alert("Error importing file. Please make sure it's a valid JSON export from this app.");
            }
        };
        reader.readAsText(file);
    }, []);

    return { family, addMember, updateMember, deleteMember, exportFamily, importFamily };
};