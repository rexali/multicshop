import  TenantModel  from "./model.tenant"

export async function getTenantBySubdomain(subdomain: string) {
    if (process.env.NEXT_RUNTIME === 'edge') {
      // En el entorno Edge, hacemos una llamada a una API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tenants/${subdomain}`)
      if (!response.ok) {
        throw new Error('Failed to fetch tenant')
      }
      return response.json()
    } else {
      // En entornos no-Edge, usamos Prisma normalmente
      return TenantModel.findOne({
        where: { subdomain },
      })
    }
  }
  
  export async function getAllTenants() {
    return TenantModel.find();
  }