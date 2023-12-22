import React, {Children, ReactNode, useState} from 'react';

export const LoadingContext = React.createContext({
    isLoading: false,
    updateGlobalLoadingState: (object: any) => {}
});

export const LoadingProvider = ({children}: { children: ReactNode}) => {
    const [isLoading, setIsLoading] = useState(false);

    const updateGlobalLoadingState = (object:any) => {
        setIsLoading(object);
    }

    return (
        <LoadingContext.Provider value={{ isLoading, updateGlobalLoadingState}}>
            {children}
        </LoadingContext.Provider>
    )
}