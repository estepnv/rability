import mergeAll from "ramda/src/mergeAll";
import flatten from "ramda/src/flatten";

export const define = (...permissions) => mergeAll(permissions);

export const allow = () => true;
export const prohibit = () => false;

export const setPermission = permission => (action, resource) =>
    mergeAll(
        flatten([ action ])
            .map(handler =>
                mergeAll(
                    flatten([ resource ]).map(res => ({ [handler(res)]: permission }))
                )
            )
    );

export const can = setPermission(allow);
export const cannot = setPermission(prohibit);
