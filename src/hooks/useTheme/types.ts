import React from 'react';


export type ChangeEvent = React.ChangeEvent<HTMLInputElement>

export type Theme = 'dark' | 'light'

export type useThemeReturn = [ string, (e: ChangeEvent) => void ];
