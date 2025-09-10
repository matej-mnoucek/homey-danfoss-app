export type Generic = {
    code: string;
    value: string | number | boolean;
}

// Turns TRV (valve) on (active) or off (heating disabled)
export type Switch = {
    code: "switch";
    value: boolean;
}

// Defines the operating mode of the thermostat
// "manual" → user sets a fixed temperature
// "holiday" → energy-saving mode while away
export type Mode = {
    code: "mode";
    value: "holiday" | "manual";
}

// The target setpoint temperature
// Example: 50 = 5.0 °C, 200 = 20.0 °C
// Value constraints: "min": 50, "max": 350, "step": 5
export type TempSet = {
    code: "temp_set";
    value: number;
}

// Minimum setpoint the user can configure
// Example: 50 = 5.0 °C min
// Value constraints: "min": 50, "max": 200, "step": 5
export type LowerTemp = {
    code: "lower_temp";
    value: number;
}

// Maximum setpoint the user can configure
// Example: 200 = 20.0 °C max
// Value constraints: "min": 200, "max": 350, "step": 5
export type UpperTemp = {
    code: "upper_temp";
    value: number;
}

// true → buttons locked (children can’t change settings)
// false → buttons unlocked (normal operation)
export type ChildLock = {
    code: "child_lock";
    value: boolean;
}

// Normally false unless explicitly set to reset
// true → triggers reset to factory defaults
export type FactoryReset = {
    code: "factory_reset";
    value: boolean;
}

// Also called datapoints (DPs) (i.e. commands)
export type Command = Generic | Switch | Mode | TempSet | LowerTemp | UpperTemp | ChildLock | FactoryReset;


// The measured ambient room temperature (from the TRV’s internal sensor)
// Value constraints: "min": -100, "max": 500, "step": 1
export type TempCurrent = {
    code: "temp_current";
    value: number;
}

// Reports whether the TRV has detected a sudden temperature drop, which it interprets as a window being opened
// "close" → no window open (normal operation)
// "open" → window detected, heating usually stops temporarily to save energy
export type WindowState = {
    code: "window_state";
    value: "close" | "open";
}

// The TRV’s battery level in percent (0-100%)
// Value constraints: "min": 0, "max": 100, "step": 1
export type BatteryPercentage = {
    code: "battery_percentage";
    value: number;
}

// Also called read-only datapoints (i.e. measurements and states)
export type Status = Generic | Switch | Mode | TempSet | LowerTemp | UpperTemp | ChildLock | FactoryReset
    | TempCurrent | WindowState | BatteryPercentage;
