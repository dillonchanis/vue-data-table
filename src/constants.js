const EDIT_BUTTON_CLASS = 'button button--edit'
const SAVE_BUTTON_CLASS = 'button button--save'

export const EDIT_BUTTON = context => context.$createElement('button', { staticClass: EDIT_BUTTON_CLASS }, ['Edit'])
export const SAVE_BUTTON = context => context.$createElement('button', { staticClass: SAVE_BUTTON_CLASS }, ['Save'])
