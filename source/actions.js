export const read = resource => `read${ resource }`;
export const view = resource => `view${ resource }`;
export const update = resource => `update${ resource }`;
export const edit = resource => `edit${ resource }`;
export const create = resource => `create${ resource }`;
export const remove = resource => `remove${ resource }`;
export const list = resource => `list${ resource }`;
const actions = [ list, read, edit, remove, update, create, view ];
export const manage = actions;
