import { FC, ReactNode, useReducer, useState } from 'react';
import { UIContext, uiReducer } from './';


export interface UIState {
    sideMenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;
}

interface props {
    children: ReactNode;
}

const UI_INITIAL_STATE: UIState = {
    sideMenuOpen: false,
    isAddingEntry: false,
    isDragging: false,
}


export const UIProvider: FC<props> = ({ children }) => {

    const [ state, dispatch ] = useReducer(uiReducer, UI_INITIAL_STATE );

    const openSideMenu = () => {
        dispatch({ type: 'UI - Open Sidebar' });
    }

    const closedSideMenu = () => {
        dispatch({ type: 'UI - Close Sidebar' });
    }

    const setAddingEntry = ( isAdding: boolean ) => {
        dispatch({ type: 'UI - Set isAddingEntry', payload: isAdding });
    }

    const setDragging = ( isDragging: boolean ) => {
        dispatch({ type: 'UI - Set Dragging', payload: isDragging });
    }

  return (
    <UIContext.Provider value={{
        ...state,
        openSideMenu,
        closedSideMenu,
        setAddingEntry,
        setDragging
    }}>
        { children }
    </UIContext.Provider>
  )
}
