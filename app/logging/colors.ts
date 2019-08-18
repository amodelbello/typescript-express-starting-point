const ANSI_RESET = '\u001B[0m'
const ANSI_DEFAULT = '\u001B[39m'
const ANSI_BLACK = '\u001B[30m'
const ANSI_RED = '\u001B[31m'
const ANSI_GREEN = '\u001B[32m'
const ANSI_YELLOW = '\u001B[33m'
const ANSI_BLUE = '\u001B[34m'
const ANSI_LIGHT_BLUE = '\u001B[94m'
const ANSI_PURPLE = '\u001B[35m'
const ANSI_CYAN = '\u001B[36m'
const ANSI_WHITE = '\u001B[97m'
const ANSI_LIGHT_GRAY = '\u001B[37m'
const ANSI_GRAY = '\u001B[90m'

export const black = (str: string): string => `${ANSI_BLACK}${str}${ANSI_RESET}`
export const regular = (str: string): string => `${ANSI_DEFAULT}${str}${ANSI_RESET}`
export const red = (str: string): string => `${ANSI_RED}${str}${ANSI_RESET}`
export const green = (str: string): string => `${ANSI_GREEN}${str}${ANSI_RESET}`
export const yellow = (str: string): string => `${ANSI_YELLOW}${str}${ANSI_RESET}`
export const lightBlue = (str: string): string => `${ANSI_LIGHT_BLUE}${str}${ANSI_RESET}`
export const blue = (str: string): string => `${ANSI_BLUE}${str}${ANSI_RESET}`
export const purple = (str: string): string => `${ANSI_PURPLE}${str}${ANSI_RESET}`
export const cyan = (str: string): string => `${ANSI_CYAN}${str}${ANSI_RESET}`
export const white = (str: string): string => `${ANSI_WHITE}${str}${ANSI_RESET}`
export const lightGray = (str: string): string => `${ANSI_LIGHT_GRAY}${str}${ANSI_RESET}`
export const gray = (str: string): string => `${ANSI_GRAY}${str}${ANSI_RESET}`
