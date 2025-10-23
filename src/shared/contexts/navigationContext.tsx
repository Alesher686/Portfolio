import {createContext, useContext, ReactNode} from 'react';

interface INavigationContext {
    setNavigateWithAnimation: () => void;
    checkAndClearNavigateWithAnimation: () => boolean;
}

interface INavigationProviderProps {
    children: ReactNode;
}

const defaultValue: INavigationContext = {
    setNavigateWithAnimation: () => {},
    checkAndClearNavigateWithAnimation: () => {return false},
};

const NavigationContext = createContext<INavigationContext>(defaultValue);

export const NavigationProvider = ({ children }:INavigationProviderProps) => {
    const setNavigateWithAnimation = () => {
        sessionStorage.setItem('navigateWithAnimation', 'true');
    };

    const checkAndClearNavigateWithAnimation = () => {
        const isNavigatedWithAnimation = sessionStorage.getItem('navigateWithAnimation') === 'true';
        if (isNavigatedWithAnimation) {
            sessionStorage.removeItem('navigateWithAnimation');
        }
        return isNavigatedWithAnimation;
    }

    return (
        <NavigationContext.Provider value={{ setNavigateWithAnimation, checkAndClearNavigateWithAnimation }}>
    {children}
    </NavigationContext.Provider>
);
};

export const useNavigation = () => useContext(NavigationContext);