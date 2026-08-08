import { useAuth } from "./useAuth"

export const usePermission = () => {
    const { user } = useAuth();
    const permissions = [];
    user?.roles?.forEach(role => {
        role.permissions?.forEach(permission => {
            permissions.push(permission.title)
        })
    })
    const uniquePermissions = [...new Set(permissions)]

    const can = (pTitle) => {
        return uniquePermissions.includes(pTitle)
    }
    const hasAny = (permissionsTitle) => {
        return permissionsTitle.some(pTitle =>
            uniquePermissions.includes(pTitle)
        )
    }
    return { permissions: uniquePermissions, can, hasAny }
}