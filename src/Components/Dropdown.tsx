import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

type DropdownProps = {
    label: string,
    options: string[],
    setDropdown: Function;
    unit: string;
}

const classes = {
    "label": "block text-sm font-medium text-gray-50",
    "select": "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md",
    "select-error": "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500",
    "option": "",
    "option-selected": "",
    "error-text": "mt-2 text-sm text-red-600" 
}

export const Dropdown = ({ label, options, setDropdown, unit }: DropdownProps) => {

    const container = useRef<HTMLDivElement>(null);
    // Selected option 
    const [selected, setSelected] = useState("")
    const [isActive, setActive] = useState(false);
      
    function selectOption(option: string) {
        setSelected(option);
        setActive(false);
        setDropdown(label, option);
    }

    // Close dropdowns on outer click. 
    useLayoutEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
          if (null !== container.current && !container.current.contains(event.target as Node)) {
            if (!isActive) return;
            setActive(false);
          }
        };
    
        window.addEventListener('click', handleOutsideClick);
        return () => window.removeEventListener('click', handleOutsideClick);
    }, [isActive, container]);


    return (
        <div key={label} ref={container} className="m-2 w-72 md:w-48">
            <label className={classes.label}>{label} ({unit})</label>
            <div id={label} className="mt-1 relative w-full">
                <button onClick={() => setActive(!isActive)} type="button" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label" className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <span className="block truncate">
                        {selected || "Select..."}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">

                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"/>
                        </svg>
                    </span>
                </button>

                { isActive && (
                    <div className="z-10 absolute mt-1 w-full rounded-md bg-white shadow-lg">
                    <ul role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-item-3" className="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                        { options.map((option) => (
                            <li key={option} onClick={() => selectOption(option)} role="option" className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9">
                    
                                <span className="font-normal block truncate">
                                    {option}
                                </span>
                                { (option == selected) && (
                                    <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">

                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                                    </svg>
                                </span>
                                )

                                }

                            </li>
                        ))}
                    </ul>
                </div>
                )}
            </div>
        </div>
    )
}