import {createMakeStyles} from "tss-react";
import {createThemeProvider} from "onyxia-ui";

export const { ThemeProvider, useTheme } = createThemeProvider({})

export const { makeStyles, useStyles } = createMakeStyles({ useTheme })
