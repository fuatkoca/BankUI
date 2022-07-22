export const hasAnyRole = (roles, hasAnyRoles) => {
    if (roles && roles.length !== 0) {
        if (hasAnyRoles.length === 0) {
            return true;
        }
        return hasAnyRoles.some(r => roles.includes(r));
    }
    return false;
}