import { createContext } from 'react';

interface ContextProps {
    sideMenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;
    openSideMenu: () => void;
    closedSideMenu: () => void;
    setAddingEntry: ( isAdding: boolean ) => void;
    setDragging: ( isDragging: boolean ) => void;
}

export const UIContext = createContext({} as ContextProps );