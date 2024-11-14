import React, { useState } from "react";

interface ToggleSwitchProps {
    label: string;
    offMessage?: string;
    onMessage?: string;
    onToggle: (state: boolean) => void;
    defaultState?: boolean;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, offMessage, onMessage, onToggle, defaultState: initialState = false }) => {
    const [isToggled, setIsToggled] = useState(initialState);

    const handleToggle = () => {
        setIsToggled(!isToggled);
        onToggle(!isToggled);
    };

    return (
        <div>
            <small className={'mb-1 block'}>{label}</small>
            <p>{isToggled ? onMessage : offMessage}</p>
            <div
                onClick={handleToggle}
                className={`relative w-16 h-6 rounded-[6px] cursor-pointer transition-colors ${
                    isToggled ? "bg-gold" : "bg-oxford_blue"
                }`}
            >
                <div
                    className={`absolute top-1 left-1 w-6 h-4 bg-gold-900 rounded-[4px] shadow-md transform transition-transform ${
                        isToggled ? "translate-x-8" : "translate-x-0"
                    }`}
                ></div>
            </div>
        </div>
    );
};
